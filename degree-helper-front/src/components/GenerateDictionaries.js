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
          courseDescription: course.description,
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
          courseDescription : prerequisite.description,
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
          courseDescription : corequisite.description,
          prerequisiteCourseCodes: [],
          corequisiteCourseCodes: []

        }
      }
      courseDataDictionary[corequisite.course_code].corequisiteCourseCodes.push(corequisite.corequisiteCourseCode);
    }
  }

  props.setCourseDataDictionary(courseDataDictionary);
}