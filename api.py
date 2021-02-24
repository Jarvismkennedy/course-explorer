from flask import Flask, jsonify, request
import sqlite3
import json
import os
app = Flask(__name__, static_folder='../course-explorer-front/build', static_url_path='/')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api', methods = ['POST'])
def api():
    if request.method == 'POST':
        courseDatabaseConnection = sqlite3.connect('courses.db')
        courseDatabaseConnection.row_factory = sqlite3.Row
        courseDatabaseCursor = courseDatabaseConnection.cursor()
        departmentRequested = request.json

        courseDataList = []
        prerequisiteDataList = []
        corequisiteDataList = []

        if departmentRequested:
            query = '''
                    SELECT id, course_code, name, all_course_info
                    FROM courses
                    WHERE department = ?
                    '''

            courseData = courseDatabaseCursor.execute(query, (departmentRequested['departmentName'],)).fetchall()
            for row in courseData:
                courseDataList.append(dict(row))
        
        
            query = '''
                    SELECT courses.course_code, prerequisiteCourse.name, 
                    prerequisiteCourse.course_code AS prerequisiteCourseCode, 
                    prerequisiteCourse.all_course_info
                    FROM courses
                    JOIN prerequisites
                    ON courses.id = prerequisites.course_id
                    JOIN courses prerequisiteCourse 
                    ON prerequisites.prerequisite_id = prerequisiteCourse.id
                    WHERE courses.department = ?;
                    '''
            prerequisiteData = courseDatabaseCursor.execute(query, (departmentRequested['departmentName'],)).fetchall()
            for row in prerequisiteData:
                prerequisiteDataList.append(dict(row))

            query = '''
                    SELECT courses.course_code, 
                    corequisiteCourse.name, 
                    corequisiteCourse.course_code AS corequisiteCourseCode, 
                    corequisiteCourse.all_course_info
                    FROM courses
                    JOIN corequisites
                    ON courses.id = corequisites.course_id
                    JOIN courses corequisiteCourse 
                    ON corequisites.corequisite_id = corequisiteCourse.id
                    WHERE courses.department = ?;
                    '''

            corequisiteData = courseDatabaseCursor.execute(query, (departmentRequested['departmentName'],)).fetchall()
            for row in corequisiteData:
                corequisiteDataList.append(dict(row))

        courseDatabaseConnection.close()

        return {'courseData':courseDataList, 'prerequisiteData': prerequisiteDataList, 'corequisiteData': corequisiteDataList}

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))