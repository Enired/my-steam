import { useState } from "react";
import "../styles/LoginPage.scss"

export const LoginPage = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const checkIfBlank = (textInput) => {
    if(!textInput){
      return true
    }

    return false
  }

  const login= () => {
    props.switchViewLogin();
    props.setLoggedIn(true);
  }


  return (
    <div className="login">
      <div className="login-text">
        <label htmlFor="login-name">Username</label>
        <input type="text" name="login-name" id="login-name" value={username} onChange={(event)=>{setUsername(event.target.value)}}/>
        <label htmlFor="login-password">Password</label>
        <input type="password" name="login-password" id="login-password" value={password} onChange={(event)=>{setPassword(event.target.value)}}/>    
      </div>
      <div className="login-buttons">
        <button className="action-button" id="login-button" onClick={()=>{(!checkIfBlank(username) & !checkIfBlank(password)) && login()}}>Login</button>
        <button className="action-button" id="sign-up-button" onClick={()=>{props.switchViewSignup()}}>Sign-up</button>
        <button className="action-button" id="forgot-password-button">Forgot Password</button>
      </div>
    </div>
  
  )
}