import React from 'react';
import {Link} from 'react-router-dom';
import './SideNavBar.css'

export default function CourseListSideBar(props){
    const courseList = props.courseList;
    return(
    <div >
        <ul className = 'nav-menu-items'>
            {courseList.map((item,index) => {
                return (
                <li key={index}  
                    onClick = {function() {
                                            props.setCourseName({'courseName': item});
                                        }
                                }
                >
                    <Link to='#'>
                        <span>
                        {item}
                        </span>
                    </Link>
                </li> )
            }
            )}
        </ul>
    </div>
    )
}