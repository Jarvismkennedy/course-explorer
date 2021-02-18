import sqlite3
import re

courses_db_connection = sqlite3.connect('courses.db')
courses_db_connection.row_factory = sqlite3.Row
courses_db = courses_db_connection.cursor()

all_courses = courses_db.execute('SELECT * FROM courses').fetchall()


for row in all_courses:
    course = dict(row)

    
    course_id = course['id']
    department = course['department']
    allCourseInfo = course['all_course_info']
    allCourseInfoSplit = re.split('\n', allCourseInfo)

    for line in allCourseInfoSplit:
        if line.startswith('Prerequisite'):
            # Use set here because some course codes are repeated in the prerequisite line
            prerequisiteList = set(re.findall('[A-Z][A-Z][A-Z][0-9][0-9][0-9][A-Z][0-9]', line))
            
            # Some information is out of date on the website, so we first need to check if the prerequisite exists in the database. 
            # There are also multiple departments which have the same course listed, so we need to check if the prerequisite is from
            # the same department as the course. If it is, then we add that prerequisite, if not then we add the first in the list.

            for prerequisite in prerequisiteList:
                possiblePrerequisites = []
                for courseRow in all_courses:
                    dictionary = dict(courseRow)
                    if dictionary['course_code'] == prerequisite:
                        possiblePrerequisites.append(dictionary)

                for possiblePrerequisite in possiblePrerequisites:
                    if possiblePrerequisite['department'] == department:
                        prerequisite_id = possiblePrerequisite['id']
                        courses_db.execute('INSERT INTO prerequisites (course_id, prerequisite_id) VALUES (?, ?)', (course_id, prerequisite_id))
                        possiblePrerequisites = []
                        break
                if len(possiblePrerequisites) > 0:
                    prerequisite_id = possiblePrerequisites[0]['id']
                    courses_db.execute('INSERT INTO prerequisites (course_id, prerequisite_id) VALUES (?, ?)', (course_id, prerequisite_id))

                
        if line.startswith('Corequisite:'):
            corequisite_list = set(re.findall('[A-Z][A-Z][A-Z][0-9][0-9][0-9][A-Z][0-9]', line))
            for corequisite in corequisite_list:
                possibleCorequisites = []
                for courseRow in all_courses:
                    dictionary = dict(courseRow)
                    if dictionary['course_code'] == corequisite:
                        possibleCorequisites.append(dictionary)

                for possibleCorequisite in possibleCorequisites:
                    if possibleCorequisite['department'] == department:
                        corequisite_id = possibleCorequisite['id']
                        courses_db.execute('INSERT INTO corequisites (course_id, corequisite_id) VALUES (?, ?)', (course_id, corequisite_id))
                        possibleCorequisites = []
                        break
                if len(possibleCorequisites) > 0:
                    corequisite_id = possibleCorequisites[0]['id']
                    courses_db.execute('INSERT INTO corequisites (course_id, corequisite_id) VALUES (?, ?)', (course_id, corequisite_id))

               


courses_db_connection.commit()
courses_db_connection.close()