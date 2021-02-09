import sqlite3
import re

courses_db_connection = sqlite3.connect('courses.db')
courses_db = courses_db_connection.cursor()

all_courses = courses_db.execute('SELECT * FROM courses')
course_code_dictionary = {}


for course in all_courses:
    course_code_dictionary[course[2]] = course

for course_code in course_code_dictionary.keys():
    all_course_info = course_code_dictionary[course_code][5]
    course_id = course_code_dictionary[course_code][0]
    all_course_info_split = re.split('\n', all_course_info)
    
    for line in all_course_info_split:
        if line.startswith('Prerequisite:'):
            prerequisite_list = re.findall('[A-Z][A-Z][A-Z][0-9][0-9][0-9][A-Z][0-9]', line)
            
            # some information is out of date on the website, so we first need to check if the prerequisite 
            # listed is still a course listed in the department course list 
            for prerequisite in prerequisite_list:
                if prerequisite in course_code_dictionary.keys():
                    prerequisite_id = course_code_dictionary[prerequisite][0]
                    courses_db.execute('INSERT INTO prerequisites (course_id, prerequisite_id) VALUES (?, ?)', (course_id, prerequisite_id))

        if line.startswith('Corequisite:'):
            corequisite_list = re.findall('[A-Z][A-Z][A-Z][0-9][0-9][0-9][A-Z][0-9]', line)
            for corequisite in corequisite_list:
                if corequisite in course_code_dictionary.keys():
                    corequisite_id = course_code_dictionary[corequisite][0]
                    courses_db.execute('INSERT INTO corequisites (course_id, corequisite_id) VALUES (?, ?)', (course_id, corequisite_id))

courses_db_connection.commit()
courses_db_connection.close()