import React from 'react';
import {render} from "react-dom";
import { Link, BrowserRouter as Router } from "react-router-dom";
import SidebarExampleSidebar from "./Layout";







export const App = (props) => {
    return <SidebarExampleSidebar name="FeatureCard" style={{height:"100%"}}></SidebarExampleSidebar> 
 }
  
 
 const appDiv=document.getElementById("app");
 render (<App name="HomePage" />, appDiv);