import React, {useState} from 'react';
import ReactFlow, {ReactFlowProvider, Controls} from 'react-flow-renderer'
import './CourseTree.css';
import CourseListSideBar from './CourseListSideBar'

 export default function DepartmentCourseTree(props){
    const [courseName, setCourseName] = useState('allCourses')

    const courseList = ['All Courses',]
    for (let courseCode in props.courseDataDictionary){
        courseList.push(props.courseDataDictionary[courseCode].courseName)
    }

    const fourthYearCourses = [];
    const thirdYearCourses = [];
    const secondYearCourses = [];
    const firstYearCourses = [];
    for (let courseCode in props.courseDataDictionary){
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
            data: {label: firstYearCourses[index]},
            position: {x: 25 + dx*175, y: 25 + dy*100}
        })
        dx++;
    }
    for (let courseCode in props.courseDataDictionary){
        let prerequisiteList = props.courseDataDictionary[courseCode].prerequisiteCourseCodes;
        let prerequisiteListLength = prerequisiteList.length;
        for (let index = 0; index < prerequisiteListLength; index++){
            elements.push({
                id: 'e' + prerequisiteList[index] + '-' + courseCode,
                source: prerequisiteList[index],
                target: courseCode
            })
        }
        
    }
    function onElementClick(){

    }
    
const FlowWithProvider = () => (
    <ReactFlowProvider onElementClick={onElementClick}>
      <ReactFlow elements={elements}>
        <Controls/>
        </ReactFlow>
    </ReactFlowProvider>
  );
        
  console.log(courseList);
    return (
        <div>
            <CourseListSideBar courseList = {courseList} setCourseName = {setCourseName}/>
            <div style = {{height: window.innerHeight-100}}>
                {FlowWithProvider()}
            </div>
        </div>
        
      );
}