import bs4
import sqlite3
import requests
import re

conn = sqlite3.connect('degree-helper/courses.db')
db = conn.cursor()



index = 'https://student.utm.utoronto.ca/calendar'
url = 'https://student.utm.utoronto.ca/calendar/depart_list.pl'
page = requests.get(url)

soup = bs4.BeautifulSoup(page.content, 'html.parser')
pages = soup.find_all('a', href = re.compile('newdep'))

for page in pages:
    if page.get_text() == 'Mathematics':
        math_page = requests.get(index + '/' + page.get('href'))
        math_soup = bs4.BeautifulSoup(math_page.content, 'html.parser')

print(math_soup.prettify())


conn.commit()
conn.close()

print('Program ran okay')


