import "../styles/SignupPage.scss"

export const SignupPage = (props) => {
  return (
    <div className="signup-page">
      <div className="signup-fields">
        <input type="text" className="signup-field" id="username-creation" />
        <input type="text" className="signup-field" id="password-creation" />
      </div>
      <div className="signup-buttons">
        <button className="signup-button">Create Account</button>
        <button className="signup-button">Reset</button>
      </div>
    </div>
  )
}