import logo from './logo.svg';
import './App.css';
import NavBar from "./components/NavBar";
import { AddScenario } from './components/AddScenario';
import { AddVehicle } from './components/AddVehicle';
import { Home } from './components/Home';
import { AllScenario } from './components/AllScenario';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className='app container row'>
        <div className="col col1">
          <NavBar></NavBar>
        </div>
        <div className="col col2">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/addscenario">
              <AddScenario/>
            </Route>
            <Route path="/allscenario">
              <AllScenario/>
            </Route>
            <Route path="/addvehicle">
              <AddVehicle/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
