import React, {useState} from 'react';
import ReactFlow, {ReactFlowProvider, Controls} from 'react-flow-renderer'
import {Modal, Button} from 'react-bootstrap';
import GenerateGraphElements from './GenerateGraphElements'
import './CourseGraph.css';

function CourseModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.modalTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
           {props.modalDescription.split('\n').map( (line) => {
             return <p> {line}</p>
           })}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
 export default function CourseGraph(props){
    const [modalShow, setModalShow] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalDescription, setModalDescription] = useState('')


    const onElementClick = (element) => {
        if (element.srcElement !== undefined){
          let courseCode = element.srcElement.innerText;
          let courseName = props.courseDataDictionary[courseCode].courseName;
          let courseDescription = props.courseDataDictionary[courseCode].courseDescription;
          setModalDescription(courseDescription)
          setModalTitle (courseName)
          setModalShow(true);
        }     
    }


    const elements = GenerateGraphElements(props.course, props.courseDataDictionary);


    const FlowWithProvider = () => (
        
        <ReactFlowProvider>
        <ReactFlow elements={elements} onElementClick={onElementClick}>
                <Controls/>
        </ReactFlow>
        </ReactFlowProvider>
        );
    
    
    const currentCourseLabel = () => {
    if (props.course === undefined || props.course === 'All Courses'){
        return ('All Courses');
    } else{
        return ( '(' + props.course + ') ' + props.courseDataDictionary[props.course].courseName);
            
      }
    }

    return (
        <>
            <CourseModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                modalTitle = {modalTitle}
                modalDescription = {modalDescription}
            />
            <div className = 'courseGraph'>
                <div className = 'currentCourseLabel'>
                    {currentCourseLabel()}
                </div>
                {FlowWithProvider()}
            </div>
        </>
      );

}

