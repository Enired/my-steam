import "../styles/Navbar.scss"
import mslLogoOnly from "../assets/mysteam-logo-only.png"
import mslLogo from "../assets/mysteamlistlogowhite.png"
import mslLogoNav from "../assets/mysteam-logo-nav.png"
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer } from "@mui/material";
import { useState } from "react";
import { bgcolor } from "@mui/system";
export const Navbar = (props) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
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
        <ul id="something">
          <li>My Profile</li>
          <li>Add to List</li>
          <li>Logout</li>
        </ul>
      </Drawer>
      <img src={mslLogoNav} alt="logo" id="nav-logo"className="logo" />
    </div>
  )
}