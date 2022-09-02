import "../styles/Navbar.scss"
import mslLogoOnly from "../assets/mysteam-logo-only.png"
import mslLogo from "../assets/mysteamlistlogowhite.png"
import mslLogoNav from "../assets/mysteam-logo-nav.png"
export const Navbar = (props) => {

  return(
    <div id="navbar">
      <img src={mslLogoNav} alt="logo" id="nav-logo"className="logo" />
    </div>
  )
}