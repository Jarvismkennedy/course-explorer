from flask import Flask, jsonify, request
import sqlite3
import json
app = Flask(__name__)


@app.route('/api', methods = ['POST'])
def api():
    if request.method == 'POST':
        courseDatabaseConnection = sqlite3.connect('courses.db')
        courseDatabaseConnection.row_factory = sqlite3.Row
        courseDatabaseCursor = courseDatabaseConnection.cursor()
        departmentRequested = request.json

        courseDataList = []

        if departmentRequested:
            courseData = courseDatabaseCursor.execute('SELECT * FROM courses WHERE department = ?', (departmentRequested['departmentName'],)).fetchall()
        
            for row in courseData:
                courseDataList.append(dict(row))
        
        


        return {'courseData':courseDataList}

