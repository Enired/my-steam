import "../styles/SignupPage.scss"

export const SignupPage = (props) => {
  return (
    <div className="signup-page">
      <h2>Sign-up</h2>
      <div className="signup-fields">
        <label htmlFor="username-creation">Username</label>
        <input type="text" className="signup-field" id="username-creation" placeholder="Username"/>
        <label htmlFor="password-creation">Password</label>
        <input type="password" className="signup-field" id="password-creation" placeholder="Password" />
        <label htmlFor="password-confirmation">Confirm Password</label>
        <input type="password" className="signup-field" id="password-confirmation" placeholder="Confirm Password"/>
        <label htmlFor="email-creation">Steam ID</label>
        <input type="text" className="signup-field" id="steam-id-import" placeholder="76561198008227465"/>

      </div>
      <div className="signup-buttons">
        <button className="signup-button">Create Account</button>
        <button className="signup-button">Reset</button>
      </div>
    </div>
  )
}