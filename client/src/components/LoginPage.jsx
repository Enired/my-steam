import "../styles/LoginPage.scss"

export const LoginPage = (props) => {
  return (
    <div className="login">
      <div className="login-text">
        <label htmlFor="login-name">Username</label>
        <input type="text" name="login-name" id="login-name" />
        <label htmlFor="login-password">Password</label>
        <input type="password" name="login-password" id="login-password"/>    
      </div>
      <div className="login-buttons">
        <button className="action-button" id="login-button" onClick={()=>{props.switchViewLogin(); props.setLoggedIn(true)}}>Login</button>
        <button className="action-button" id="sign-up-button">Sign-up</button>
        <button className="action-button" id="forgot-password-button">Forgot Password</button>
      </div>
    </div>
  
  )
}