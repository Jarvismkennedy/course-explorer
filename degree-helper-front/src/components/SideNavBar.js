import React, {useEffect, useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {SideBarData} from './SideNavBarData';
import './SideNavBar.css';

export default function SideNavBar(props){
    
    return (
        <>
        <div className='navbar'>
                <Link to='#' className='menu-bars'>
                    <FaIcons.FaBars onClick = {props.showSideBar}/>
                </Link>
                <div className = 'title'>
                    Course Explorer
                </div>
                <Link to='#' className='menu-bars hidden'>
                    <FaIcons.FaBars onClick = {props.showSideBar}/>
                </Link>
        </div>
        
            
        <nav className={props.sideBar ? 'nav-menu active': 'nav-menu'}>
            
                <ul className = 'nav-menu-items'>
                    <li className = 'nav-menu-toggle'>
                        <Link to='#' className='menu-bars toggle'>
                            <FaIcons.FaBars onClick = {props.showSideBar}/>
                        </Link>
                    </li>
                    
                    {SideBarData.map((item,index) => {
                        return (
                        <li key={index} 
                            className = {item.cName} 
                            onClick = {function() {
                                                    props.setDepartmentName({'departmentName': item.title});
                                                    props.showSideBar(); 
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
        </>
    )
}