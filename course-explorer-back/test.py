import sqlite3
import json
import re

courseDatabaseConnection = sqlite3.connect('courses.db')
courseDatabaseCursor = courseDatabaseConnection.cursor()

c = courseDatabaseCursor.execute('SELECT all_course_info FROM courses WHERE id = 547;').fetchall()
print(c[0][0])
x = re.split('\n', c[0][0])
print(x)

courseDatabaseConnection.close()