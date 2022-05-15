import React from 'react';
import {render} from "react-dom";
import { Link, BrowserRouter as Router } from "react-router-dom";
import Init from "./Init.js";


export const App = (props) => {
    return <Init name="initPage"></Init> 
 }
  
 
 const appDiv=document.getElementById("app");
 render (<App name="HomePage" style={{backgoundColor:'#ffffff', marginLeft: '10px', width:"100%"}}></App>, appDiv);