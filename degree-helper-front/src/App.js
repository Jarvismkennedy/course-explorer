import './App.css';
import SideNavBar from './components/SideNavBar'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <>
    <Router>
      <SideNavBar/>
      <Switch>
        <Route path ='/' />
      </Switch>
    </Router>
    </>
  );
}

export default App;
