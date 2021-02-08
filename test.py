import bs4
import sqlite3
import requests
import re

conn = sqlite3.connect('courses.db')
db = conn.cursor()




url = 'https://student.utm.utoronto.ca/calendar/depart_list.pl'
page = requests.get(url)

soup = bs4.BeautifulSoup(page.content, 'html.parser')
pages = soup.find_all('a', href = re.compile('newdep'))

for page in pages:
    print(page.get_text())


conn.commit()
conn.close()

print('Program ran okay')


