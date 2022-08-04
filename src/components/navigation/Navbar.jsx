import React from "react";

import "../../styles/navbar.scss"
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";



const Navbar = (props) => {


  return(
      <nav className='navbar'>
       <ul>
        <li>
          Home
        </li>
        <li>
          Playing
        </li>
        <li>
          On hold
        </li>
        <li>
          Completed
        </li>
        <li>
          Dropped
        </li>
       </ul>
      </nav>
  
  )
}

export default Navbar
