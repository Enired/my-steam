import "../styles/Navbar.scss"
import mslLogoOnly from "../assets/mysteam-logo-only.png"
import mslLogo from "../assets/mysteamlistlogowhite.png"
import mslLogoNav from "../assets/mysteam-logo-nav.png"
import MenuIcon from '@mui/icons-material/Menu';
export const Navbar = (props) => {

  return(
    <div id="navbar">
      <MenuIcon id="nav-menu"/>
      <img src={mslLogoNav} alt="logo" id="nav-logo"className="logo" />
    </div>
  )
}