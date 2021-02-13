import React, {useEffect, useState} from 'react';
import * as FaIcons from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {SideBarData} from './SideNavBarData'
import './SideNavBar.css'
import './CourseTree.css'

 export default function DepartmentCourseTree(){
    const [sideBar, setSideBar] = useState(false);
    const [departmentName,setDepartmentName] = useState('');
    const [courseData, setCourseData] = useState({'courseData':[{'course_code':''}]});
    const showSideBar = () => setSideBar(!sideBar);

    useEffect(() => {
                    fetch('/api', {
                        method: 'POST',
                        headers: {'content-type': 'application/json'},
                        body: JSON.stringify(departmentName),
                    }).then(async (response) => {
                        let data = await response.json();
                        setCourseData(data);
                        console.log(data);
        })
    }, [departmentName])
    

    return (

        <>
        <div className='navbar'>
            <Link to='#' className='menu-bars'>
                <FaIcons.FaBars onClick = {showSideBar}/>
            </Link>
            <div className = 'title'>
                Degree helper
            </div>
            <Link to='#' className='menu-bars hidden'>
                <FaIcons.FaBars onClick = {showSideBar}/>
            </Link>
        </div>
    
        
        <nav className={sideBar ? 'nav-menu active': 'nav-menu'}>
            
                <ul className = 'nav-menu-items'>
                    <li className = 'nav-menu-toggle'>
                        <Link to='#' className='menu-bars toggle'>
                            <FaIcons.FaBars onClick = {showSideBar}/>
                        </Link>
                    </li>
                    
                    {SideBarData.map((item,index) => {
                        return (
                        <li key={index} 
                            className = {item.cName} 
                            onClick = {function() {
                                                    setDepartmentName({'departmentName': item.title});
                                                    showSideBar(); 
                                                }
                                        }
                        >
                            <Link to='#'>
                                {item.icon}
                                <span>
                                {item.title}
                                </span>
                            </Link>
                        </li> )
                    }
                    )}
                </ul>
            
        </nav>

        <table>
           <thead><tr><th>Course</th><th>Course Code</th> <th>Description</th></tr></thead>
           <tbody>
           {courseData.courseData.map(
               (item) => {return(
                    
                        <tr key = {item.id}> 
                            <td>{item.name}</td> 
                            <td>{item.course_code}</td>
                            <td>{item.description}</td>
                        </tr>                
               );}
           )}
           </tbody>
        </table>
        </>
    )
}