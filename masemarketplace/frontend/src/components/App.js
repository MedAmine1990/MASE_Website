import React from 'react';
import {render} from "react-dom";
import { Link, BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Init from "./Init.js";
import SignupPage from "./signupPage.js";
import InfoSight from "./InfoSight";


export const App = (props) => {
    //return <Init name="initPage"></Init>
    return (
    <Router>
        <Routes>
            <Route exact path="/" element={<Init/>}></Route>
            <Route exact path="/Signup" element={<SignupPage/>}></Route>
            <Route exact path="/Infosight" element={<InfoSight/>}></Route>  
        </Routes>
    </Router>
    ) 
 }
  
 
 const appDiv=document.getElementById("app");
 render (<App name="HomePage" style={{backgoundColor:'#ffffff', marginLeft: '10px', width:"100%"}}></App>, appDiv);