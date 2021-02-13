import './App.css';
import DepartmentCourseTree from './components/DepartmentCourseTree'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'


function App() {
  return (
    <>
    <Router>
      <DepartmentCourseTree/>
      <Switch>
        <Route exact path ='/'/>
      </Switch>
    </Router>
    </>
  );
}

export default App;
