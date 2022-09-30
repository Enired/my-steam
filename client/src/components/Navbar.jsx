import "../styles/Navbar.scss"
// import mslLogoOnly from "../assets/mysteam-logo-only.png"
// import mslLogo from "../assets/mysteamlistlogowhite.png"
import mslLogoNav from "../assets/mysteam-logo-nav.png"
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer } from "@mui/material";
import { useState } from "react";
import PeopleOutlineSharpIcon from '@mui/icons-material/PeopleOutlineSharp';
import PlaylistAddSharpIcon from '@mui/icons-material/PlaylistAddSharp';
import LoginSharpIcon from '@mui/icons-material/LoginSharp';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
export const Navbar = (props) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const loggedIn = props.loggedIn
  return(
    <div id="navbar">
      <MenuIcon id="nav-menu"
        onClick={(event)=>{setAnchorEl(event.currentTarget)}}
      />
      <Drawer
        id="nav-drawer-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={()=>{setAnchorEl(null)}}
      
      >
        <ul id="drawer-menu-items">
          {!loggedIn ? 
          <li className="drawer-menu-item" onClick={()=>{props.switchViewLogout(); setAnchorEl(null)}}>
            <LoginSharpIcon className="drawer-menu-item-icon"/>
            <p className="drawer-menu-item-icon">Login</p>
          </li>
          :
          <li>
            <li className="drawer-menu-item">
              <PeopleOutlineSharpIcon className="drawer-menu-item-icon"/>
              <p className="drawer-menu-item-icon">My Profile</p>
            </li>
            <li className="drawer-menu-item">
              <PlaylistAddSharpIcon className="drawer-menu-item-icon"/>
              <p className="drawer-menu-item-icon">Add to List</p>
            </li>
            <li className="drawer-menu-item" onClick={()=>{props.setLoggedIn(false); props.switchViewLogout(); setAnchorEl(null); document.cookie=null;}}>
              <LogoutSharpIcon className="drawer-menu-item-icon"/>
              <p className="drawer-menu-item-icon">Logout</p>
            </li>
          </li>
          }
          
        </ul>
      </Drawer>
      <img src={mslLogoNav} alt="logo" id="nav-logo"className="logo" />
    </div>
  )
}