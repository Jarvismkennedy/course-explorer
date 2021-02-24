-- SQLite3
SELECT courses.id, 
prerequisiteCourse.name, 
prerequisiteCourse.id AS prerequisiteId
FROM courses
JOIN prerequisites
ON courses.id = prerequisites.course_id
JOIN courses prerequisiteCourse 
ON prerequisites.prerequisite_id = prerequisiteCourse.id
WHERE courses.course_code = 'JCP221H5';

SELECT courses.id, corequisiteCourse.name, 
                    corequisiteCourse.id AS corequisiteId, 
                    corequisiteCourse.course_code, 
                    corequisiteCourse.description,
                    corequisiteCourse.all_course_info
                    FROM courses
                    JOIN corequisites
                    ON courses.id = corequisites.course_id
                    JOIN courses corequisiteCourse 
                    ON corequisites.corequisite_id = corequisiteCourse.id
                    WHERE courses.department = 'Mathematics';

SELECT course_id, prerequisite_id FROM prerequisites 
WHERE course_id = 203;

Delete FROM prerequisites;
DELETE FROM corequisites;