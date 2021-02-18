import DepartmentCourseTree from './components/DepartmentCourseTree';
import SideNavBar from './components/SideNavBar';
import GenerateDictionaries from './components/GenerateDictionaries';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import React, {useState, useEffect} from 'react';


function App() {
  const [sideBar, setSideBar] = useState(false);
  const [departmentName,setDepartmentName] = useState('');
  const [courseData, setCourseData] = useState({});
  const [courseDataDictionary, setCourseDataDictionary] = useState({});

  const showSideBar = () => setSideBar(!sideBar);
  const setSideBarFalse = () => setSideBar(false);

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
  

  return (
    
    <Router>
      <SideNavBar 
      departmentName = {departmentName} 
      setDepartmentName = {setDepartmentName} 
      setCourseData = {setCourseData}
      sideBar = {sideBar}
      showSideBar = {showSideBar}
      />

      
      <h2 style = {{textAlign:"center"}}>{departmentName.departmentName}</h2>
      <DepartmentCourseTree 
      courseDataDictionary = {courseDataDictionary} 
      setSideBarFalse = {setSideBarFalse}
      departmentName = {departmentName}
      />
      

      <Switch>
        <Route exact path ='/'/>
      </Switch>
    </Router>
    
  );
}

export default App;
