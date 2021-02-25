function generateCourseDataDictionaryForSelectedCourse(course, allCourseDataDictionary){
    var courseDataDictionary = {};
    if (course === undefined || course === 'All Courses'){
        courseDataDictionary = allCourseDataDictionary;
    }
    else{
        courseDataDictionary[course] = allCourseDataDictionary[course];
        var prerequisites = courseDataDictionary[course].prerequisiteCourseCodes.slice();
            while (prerequisites.length > 0){
                let courseCode = prerequisites.pop();
                courseDataDictionary[courseCode] = allCourseDataDictionary[courseCode];
                let newPrerequisiteList = allCourseDataDictionary[courseCode].prerequisiteCourseCodes;
                let newPrerequisiteListLength = newPrerequisiteList.length;
                for (let index = 0; index < newPrerequisiteListLength; index++){
                    prerequisites.push(newPrerequisiteList[index])
                }
            } 
    }  
    return courseDataDictionary;
}
function generateCourseDictionaryByYear (courseDataDictionary){
    const courseListDictionaryByYear = {
        1: [],
        2: [],
        3: [],
        4: []
    }
    for (let courseCode in courseDataDictionary){
        // CourseCodes are of the form MAT137H5, where the digit at the third index represents the course year
        const year = courseCode[3];
        courseListDictionaryByYear[year].push(courseCode);
    }
    return courseListDictionaryByYear;
}

export default function generateGraphElements (course, allCourseDataDictionary){
    const courseDataDictionary = generateCourseDataDictionaryForSelectedCourse(course, allCourseDataDictionary);
    const courseListDictionaryByYear = generateCourseDictionaryByYear(courseDataDictionary);
    const elements = []
    var dx = 0;
    var dy = 0;

    for (let year in courseListDictionaryByYear){
        let courseList = courseListDictionaryByYear[year];
        let courseListLength = courseListDictionaryByYear[year].length
        for(let index = 0; index < courseListLength; index++){
            if (dx > 7){
                dx = 0;
                dy++;
            }
            elements.push({
                id: courseList[index],
                type: 'input',
                connectable: false,
                data: {label: courseList[index]},
                position: {x: 25+dx*175, y: 25+dy*100}
            })
            dx++;
        }
        dy++
    }
    for (let courseCode in courseDataDictionary){
        let prerequisiteList = courseDataDictionary[courseCode].prerequisiteCourseCodes;
        let prerequisiteListLength = prerequisiteList.length;
        for (let index = 0; index < prerequisiteListLength; index++){
            elements.push({
                id: 'e' + prerequisiteList[index] + '-' + courseCode,
                source: prerequisiteList[index],
                target: courseCode,
                animated: true,
                arrowHeadType: 'arrowclosed',
                sourcePosition: 'top',
                targetPosition: 'bottom',
            })
        }
    }
    return elements;
}