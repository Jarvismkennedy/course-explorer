import CourseGraph from '../components/CourseGraph';
import Home from './Home'
import MyNavbar from '../components/Navbar';
import GenerateDictionaries from '../components/GenerateDictionaries';
import React, {useState, useEffect} from 'react';

import './GraphPage.css';

export default function GrapPage() {
  const [departmentName,setDepartmentName] = useState('');
  const [course, setCourse] = useState('All Courses');
  const [courseData, setCourseData] = useState({});
  const [courseDataDictionary, setCourseDataDictionary] = useState({});



  useEffect(() => {
    fetch('/api', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(departmentName),
    }).then(async (response) => {
        let data = await response.json();
        setCourseData(data);
        })
  }, [departmentName])


  useEffect( () => {
    GenerateDictionaries({
      courseData: courseData.courseData, 
      prerequisiteData: courseData.prerequisiteData,
      corequisiteData: courseData.corequisiteData,
      setCourseDataDictionary,
    });
  }, [courseData])

  function mainContent() {
    if(departmentName!== ''){
      return (
        <CourseGraph
          courseDataDictionary = {courseDataDictionary} 
          departmentName = {departmentName.departmentName}
          course = {course.course}
        />
      );
    }
    return(
      <Home/>
    );
  }


  return (
    
    <>
      <MyNavbar 
      setDepartmentName = {setDepartmentName} 
      setCourse = {setCourse}
      courseDataDictionary = {courseDataDictionary}
      />

      <div className = 'currentDepartmentLabel'>
        {departmentName.departmentName}
      </div>

      {mainContent()}
    </>
  );
}
