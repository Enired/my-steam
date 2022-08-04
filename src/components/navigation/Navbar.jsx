import React from "react";

import * as ReactDOM from "react-dom";
import { BrowserRouter, useNavigate } from "react-router-dom";
import "../../styles/navbar.scss"



const Navbar = (props) => {
  
  let navigate = useNavigate(); 
  const routeChange = (routeName) =>{ 
    let path = `${routeName}`; 
    navigate(path);}

  return(
      <nav className='navbar'>
       <ul>
        <li onClick={()=>{routeChange("/")}}>
          Home
        </li>
        <li onClick={()=>{routeChange('/playing')}}>
          Playing
        </li>
        <li onClick={()=>{routeChange('/on-hold')}}>
          On hold
        </li>
        <li onClick={()=>{routeChange('/completed')}}>
          Completed
        </li>
        <li onClick={()=>{routeChange('/dropped')}}>
          Dropped
        </li>
       </ul>
      </nav>
  
  )
}

export default Navbar
