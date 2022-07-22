import React from "react";

import "../../styles/navbar.scss"


const Navbar = (props) => {


  return(
    <nav className="navbar">
      <ul>
        <li onClick={()=>console.log('playing')}>Playing</li>
        <li onClick={()=>console.log('on hold')}>On Hold</li>
        <li onClick={()=>console.log('completed')}>Completed</li>
        <li onClick={()=>console.log('dropped')}>Dropped</li>
      </ul>
    </nav>
  )
}

export default Navbar
