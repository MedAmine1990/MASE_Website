import React from 'react';
import {render} from "react-dom";
import { Link, BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Init from "./Init.js";
import SignupPage from "./signupPage.js";
import SigninPage from "./signinPage.js";
import CodeConfirmationPage from "./codeConfirmationPage.js"
import InfoSight from "./InfoSight";
import HomePage from "./homePage.js";
import SetupPage from "./setupPage.js"


export const App = (props) => {
    //return <Init name="initPage"></Init>
    return (
    <Router>
        <Routes>
            <Route exact path="/" element={<Init/>}></Route>
            <Route exact path="/Signup" element={<SignupPage/>}></Route>
            <Route exact path="/Signin" element={<SigninPage/>}></Route>
            <Route exact path="/CodeConfirmation" element={<CodeConfirmationPage/>}></Route>
            <Route exact path="/Infosight" element={<InfoSight/>}></Route>
            <Route exact path="/HomePage" element={<HomePage/>}></Route> 
            <Route exact path="/SetupPage" element={<HomePage/>}></Route> 
        </Routes>
    </Router>
    ) 
 }
  
 
 const appDiv=document.getElementById("app");
 render (<App name="HomePage" style={{backgoundColor:'#ffffff', marginLeft: '10px', width:"100%"}}></App>, appDiv);