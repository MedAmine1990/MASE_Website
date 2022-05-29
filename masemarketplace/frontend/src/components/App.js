import React from 'react';
import {render} from "react-dom";
import { Link, BrowserRouter as Router,Switch,Route } from "react-router-dom";
import Init from "./Init.js";
import SignupPage from "./signupPage.js";
import InfoSight from "./InfoSight";


export const App = (props) => {
    //return <Init name="initPage"></Init>
    return (
    <Router>
        <Switch>
            <Route exact path="/"><Init  /></Route>
            <Route exact path="/Signup"><SignupPage /></Route>
            <Route exact path="/Infosight"><InfoSight /></Route>  
        </Switch>
    </Router>
    ) 
 }
  
 
 const appDiv=document.getElementById("app");
 render (<App name="HomePage" style={{backgoundColor:'#ffffff', marginLeft: '10px', width:"100%"}}></App>, appDiv);