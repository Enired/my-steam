import React from "react";

import "../../styles/navbar.scss"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const Navbar = (props) => {


  return(
    <Router>
      <nav className='navbar'>
       <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/playing">Playing</Link>
          </li>
        <li>
          <Link to="/on-hold">On hold</Link>
        </li>
        <li>
          <Link to="/completed">Completed</Link>
        </li>
        <li>
          <Link to="/dropped">Dropped</Link>
        </li>
       </ul>
      </nav>
    </Router>
  )
}

export default Navbar
