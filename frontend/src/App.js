import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTimes,
  faPlus,
  faArrowAltCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import './App.css';
import Characters from './components/Characters'
import Character from "./components/Character";
import Comics from "./components/Comics";
import Welcome from './components/Welcome'

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Welcome}/>
        <Route path="/comics_:pageNumber">
            <Comics />
          </Route>
         <Route path="/characters_:pageNumber">
            <Characters />
          </Route>
          
      
         
          <Route path="/character_:pageNumber">
            <Character />
          </Route>
       
     </Router>
    </div>
  );
}

export default App;
