import React from 'react';
import {RiFullscreenLine} from 'react-icons/ri'
import './Home.css'

export default function Home (){
    return(
        <div>
            <ul className = 'instructions'>
                <li>
                    Select a department and optionally course from the drop down menus
                </li>
                <li>
                    Control the prerequisite graph using the controls in the bottom left corner, or by scrolling / panning
                    with your mouse. If the graph is not displayed correctly, recenter it using the fullscreen button  {<RiFullscreenLine className = 'fullscreenIcon'/>}
                </li>
                <li>
                    You can drag the course nodes around to get a better view of the edges
                </li>
                <li>
                    Click on a course to display the course name and description
                </li>
            </ul>
        </div>
        
        
    );
}