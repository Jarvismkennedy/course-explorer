import bs4
import sqlite3
import requests
import re

courses_db_connection = sqlite3.connect('courses.db')
courses_db = courses_db_connection.cursor()

page = requests.get('https://student.utm.utoronto.ca/calendar/course_detail.pl?Depart=1&Course=ANT201H5').content
soup = bs4.BeautifulSoup(page,'html.parser')

title = soup.find('p', class_='titlestyle').get_text()

coursecode = title[:8]
name = title[8:]

main = soup.find('span', class_='normaltext').get_text()
elm = re.split('\n', main)
print(elm[1])
for thing in elm:
    if thing.startswith('Recommended Preparation'):
        ls = re.findall('[A-Z][A-Z][A-Z][0-9][0-9][0-9][A-Z][0-9]', thing)
        for req in ls:
            print('Recommended: '+req)


courses_db_connection.commit()
courses_db_connection.close()



