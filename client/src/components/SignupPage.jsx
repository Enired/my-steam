import { useState } from "react";
import "../styles/SignupPage.scss"
import axios from 'axios';

export const SignupPage = (props) => {
  const [userInfo, setUserInfo] = useState({username: '', password: '', steamIdNumber: 0})
  return (
    <div className="signup-page">
      <h2>Sign-up</h2>
      <div className="signup-fields">
        <label htmlFor="username-creation">Username</label>
        <input type="text" className="signup-field" id="username-creation" placeholder="Username" value={userInfo.username} onChange={(event)=>setUserInfo(prev=>({...prev, username:event.target.value}))}/>
        <label htmlFor="password-creation">Password</label>
        <input type="password" className="signup-field" id="password-creation" placeholder="Password" value={userInfo.password} onChange={(event)=>setUserInfo(prev=>({...prev, password:event.target.value}))} />
        {/*Might add back password confiramtion later. Make sure that basic new user creation is functioning first*/}
        {/* <label htmlFor="password-confirmation">Confirm Password</label>
        <input type="password" className="signup-field" id="password-confirmation" placeholder="Confirm Password" /> */}
        <label htmlFor="email-creation">Steam ID</label>
        <input type="text" className="signup-field" id="steam-id-import" placeholder="76561198008227465" value={userInfo.steamIdNumber || ''} onChange={(event)=>setUserInfo(prev=>({...prev, steamIdNumber:event.target.value}))}/>

      </div>
      <div className="signup-buttons">
        <button className="signup-button" onClick={()=>{console.log(userInfo); axios.post('/users/new', {username: userInfo.username, password: userInfo.password, steamIdNumber: userInfo.steamIdNumber} )}}>Create Account</button>
        <button className="signup-button">Reset</button>
      </div>
    </div>
  )
}