import bs4
import sqlite3
import requests
import re

academic_calendar_url = 'https://student.utm.utoronto.ca/calendar'

courses_db_connection = sqlite3.connect('courses.db')
courses_db = courses_db_connection.cursor()


academic_calendar_department_list = requests.get(academic_calendar_url + '/' + 'depart_list.pl').content
academic_calendar_department_list_source_code = bs4.BeautifulSoup(academic_calendar_department_list, 'html.parser')

departments = academic_calendar_department_list_source_code.find_all('a', href = re.compile('newdep'))

for department in departments:

    department_course_list_url = academic_calendar_url + '/' + department.get('href')
    department_course_list = requests.get(department_course_list_url).content
    department_course_list_source_code = bs4.BeautifulSoup(department_course_list, 'html.parser') 

    courses = department_course_list_source_code.find_all('a', href = re.compile('course_detail'))

    
    for course in courses:

        department_course_url = academic_calendar_url + '/' + course.get('href')
        department_course = requests.get(department_course_url).content
        department_course_source_code = bs4.BeautifulSoup(department_course, 'html.parser')
        
        course_name = department_course_source_code.find('p', class_= 'titlestyle').get_text()[8:]
        course_code = department_course_source_code.find('p', class_= 'titlestyle').get_text()[:8]

        # all_course_info is used later to extract course codes for prerequisites using regex
        all_course_info = department_course_source_code.find('span', class_='normaltext').get_text()
        all_course_info_split_newline = re.split('\n', all_course_info)
        course_description = all_course_info_split_newline[1]
        course_department = department.get_text()

        courses_db.execute('INSERT INTO courses (name, course_code, description, department, all_course_info) VALUES(?, ?, ?, ?, ?)', 
                            (course_name, course_code, course_description, course_department, all_course_info))

        
courses_db_connection.commit()
courses_db_connection.close()

