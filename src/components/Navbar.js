import React from 'react';
import {Navbar, Nav, NavDropdown, Container} from 'react-bootstrap'
import {departmentData} from './NavbarData';
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function MyNavBar(props){
    const courseDataDictionary = props.courseDataDictionary;
    const courseList = [{courseCode: 'All Courses', courseName: 'All Courses'}];
    for (let courseCode in courseDataDictionary){
        courseList.push({courseCode: courseCode, courseName: courseDataDictionary[courseCode].courseName})
    }
    
    return (
        <>
        
        <Navbar expand = 'lg' bg = 'dark' variant = 'dark' className = 'navbar-colors'>
                <Navbar.Brand className = 'title'>
                    UTM Course Explorer
                </Navbar.Brand> 
                <Navbar.Toggle aria-controls = 'department' />
                <Navbar.Toggle aria-controls = 'course'/>

                <Nav className = 'mr-auto'>
                <Navbar.Collapse id = 'department'>
                        <NavDropdown title = 'Department' id = 'basic-nav-dropdown'>
                            <Container className = 'nav-dropdown navbar-colors'>
                                {departmentData.map( (item) => 
                                    <NavDropdown.Item key = {item.title} onClick = { () => {   
                                        props.setDepartmentName({departmentName: item.title});
                                        props.setCourse({course: 'All Courses'})
                                    }}>
                                        <span className = 'icon'>{item.icon}</span>
                                        <span>{item.title}</span>
                                    </NavDropdown.Item>
                                )}
                            </Container>
                        </NavDropdown>
                    
                </Navbar.Collapse>

                <Navbar.Collapse id = 'course'>
                    <Nav className = 'mr-auto'>
                    <NavDropdown title = 'Course' id = 'basic-nav-dropdown'>
                            <Container className = 'nav-dropdown navbar-colors'>
                                {courseList.map( (item) => 
                                    <NavDropdown.Item key = {item.courseCode} onClick = { () => {   
                                        props.setCourse({course: item.courseCode})
                                    }}>
                                        {'(' + item.courseCode + ') ' + item.courseName}
                                    </NavDropdown.Item>
                                )}
                            </Container>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                </Nav>
        </Navbar>
        
        </>
        
    )
}