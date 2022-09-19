import "../styles/LoginPage.scss"

export const LoginPage = (props) => {
  return (
    <div className="login">
      <label htmlFor="login-name">Username</label>
      <input type="text" name="login-name" id="login-name" />
      <label htmlFor="login-password">Password</label>
      <input type="password" name="login-password" id="login-password"/>    
    </div>
  
  )
}