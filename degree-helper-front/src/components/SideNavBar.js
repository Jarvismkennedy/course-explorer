import React, {useState} from 'react';
import * as FaIcons from 'react-icons/fa'
import * as SiIcons from 'react-icons/si'
import * as GiIcons from 'react-icons/gi'
import {Link} from 'react-router-dom'
import {SideBarData} from './SideNavBarData'
import './SideNavBar.css'


 export default function SideNavBar(){
    const [sideBar, setSideBar] = useState(false);
    const showSideBar = () => setSideBar(!sideBar);
    return (
        <>
        <div className='navbar'>
            <Link to='#' className='menu-bars'>
                <FaIcons.FaBars onClick = {showSideBar}/>
            </Link>
        </div>
        
        <nav className={sideBar ? 'nav-menu active overflow': 'nav-menu'}>
            
                <ul className = 'nav-menu-items'>
                    <li className = 'nav-menu-toggle'>
                        <Link to='#' className='menu-bars toggle'>
                            <FaIcons.FaBars onClick = {showSideBar}/>
                        </Link>
                    </li>
                    
                    {SideBarData.map((item,index) => {
                        return (
                        <li key={index} className = {item.cName}>
                            <Link to={item.path}>
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