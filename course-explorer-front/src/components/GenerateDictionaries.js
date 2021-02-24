export default function GenerateDictionaries(props){

  var index = 0;
  var courseDataDictionary = {};

  if (props.courseData !== undefined){
    
    const courseDataLength = props.courseData.length
    for (index; index < courseDataLength; index++){
      const course = props.courseData[index];
      if (!(course.course_code in courseDataDictionary)){
          courseDataDictionary[course.course_code] = {
          courseName: course.name, 
          courseCode: course.course_code, 
          courseDescription: course.all_course_info,
          prerequisiteCourseCodes: [],
          corequisiteCourseCodes: []
        }
      }
    }
  }

  if (props.prerequisiteData !== undefined){

    const prerequisiteDataLength = props.prerequisiteData.length;
    for (index = 0; index < prerequisiteDataLength; index++){

      const prerequisite = props.prerequisiteData[index];
      if (!(prerequisite.prerequisiteCourseCode in courseDataDictionary)){
          courseDataDictionary[prerequisite.prerequisiteCourseCode] = {
          courseName : prerequisite.name,
          courseCode : prerequisite.prerequisiteCourseCode,
          courseDescription : prerequisite.all_course_info,
          prerequisiteCourseCodes: [],
          corequisiteCourseCodes: []
        }
      }
      
      courseDataDictionary[prerequisite.course_code].prerequisiteCourseCodes.push(prerequisite.prerequisiteCourseCode);
    }
  }

  if (props.corequisiteData !== undefined){

    const corequisiteDataLength = props.corequisiteData.length;
    for (index = 0; index < corequisiteDataLength; index++){

      const corequisite = props.corequisiteData[index];
      if (!(corequisite.corequisiteCourseCode in courseDataDictionary)){
          courseDataDictionary[corequisite.corequisiteCourseCode] = {
          courseName : corequisite.name,
          courseCode : corequisite.course_code,
          courseDescription : corequisite.all_course_info,
          prerequisiteCourseCodes: [],
          corequisiteCourseCodes: []

        }
      }
      courseDataDictionary[corequisite.course_code].corequisiteCourseCodes.push(corequisite.corequisiteCourseCode);
    }
  }

  // remove the prerequisite if it appears in a path through other courses

  for (let courseCode in courseDataDictionary){
    let prerequisiteList = courseDataDictionary[courseCode].prerequisiteCourseCodes;
    let prerequisiteListLength = prerequisiteList.length;
    for (let index = 0; index < prerequisiteListLength; index++){
      let prerequisiteCourseCode = prerequisiteList[index];
      if (existsPathToPrerequisite(courseDataDictionary, prerequisiteCourseCode, courseCode, index)){
        prerequisiteList.splice(index, 1);
        index--;
        prerequisiteListLength--; 
      }
    }
  }
  props.setCourseDataDictionary(courseDataDictionary);
}


// function to search the graph for a path an alternate path to the prerequisite
function existsPathToPrerequisite (courseDataDictionary, prerequisiteCourseCode, courseCode, indexOfPrerequisite){
  let prerequisiteList = courseDataDictionary[courseCode].prerequisiteCourseCodes;
  let prerequisiteListLength = prerequisiteList.length;

  if (prerequisiteCourseCode === courseCode){
    return true;
  }
  for (let index = 0; index < prerequisiteListLength; index++){
    if(index !== indexOfPrerequisite){
      let newCourseCode = prerequisiteList[index];
      let newIndexOfPrerequisite = index;
      let existsPath = existsPathToPrerequisite(courseDataDictionary, prerequisiteCourseCode, newCourseCode, newIndexOfPrerequisite);
      if (existsPath){
        return true;
      }
    }
  }
  return false;
}