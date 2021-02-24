export default function generateGraphElements (course, allCourseDataDictionary){
        
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

    const fourthYearCourses = [];
    const thirdYearCourses = [];
    const secondYearCourses = [];
    const firstYearCourses = [];

    for (let courseCode in courseDataDictionary){
        
        if (courseCode[3] === '4'){
            fourthYearCourses.push(courseCode)
        }
        else if (courseCode[3] === '3'){
            thirdYearCourses.push(courseCode)
        }
        else if (courseCode[3] === '2'){
            secondYearCourses.push(courseCode)
        }
        else {
            firstYearCourses.push(courseCode)
        }
        
    }
   

    const fourthYearCoursesLength = fourthYearCourses.length;
    const thirdYearCoursesLength = thirdYearCourses.length;
    const secondYearCoursesLength = secondYearCourses.length;
    const firstYearCoursesLength = firstYearCourses.length;
    const elements = []
    var dx = 0;
    var dy = 0;

    for (let index = 0; index < fourthYearCoursesLength; index++){
        if (dx > 7){
            dx = 0;
            dy++;
        }

        elements.push({
            id: fourthYearCourses[index],
            type: 'input',
            connectable: false,
            data: {label: fourthYearCourses[index]},
            position: {x: 25 + dx*175, y: 25 + dy*100}
        })
        dx++;
    }
    dy++;

    for (let index = 0; index < thirdYearCoursesLength; index++){
        if (dx > 7){
            dx = 0;
            dy++;
        }

        elements.push({
            id: thirdYearCourses[index],
            type: 'input',
            connectable: false,
            data: {label: thirdYearCourses[index]},
            position: {x: 25 + dx*175, y: 25 + dy*100}
        })
        dx++;
    }
    dy++;

    for (let index = 0; index < secondYearCoursesLength; index++){
        if (dx > 7){
            dx = 0;
            dy++;
        }

        elements.push({
            id: secondYearCourses[index],
            type: 'input',
            connectable: false,
            data: {label: secondYearCourses[index]},
            position: {x: 25 + dx*175, y: 25 + dy*100}
        })
        dx++;
    }
    dy++;

    for (let index = 0; index < firstYearCoursesLength; index++){
        if (dx > 7){
            dx = 0;
            dy++;
        }
        
        elements.push({
            id: firstYearCourses[index],
            type: 'input',
            connectable: false,
            data: {label: firstYearCourses[index]},
            position: {x: 25 + dx*175, y: 25 + dy*100}
        })
        dx++;
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