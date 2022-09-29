import { useState } from "react";
import "../styles/SignupPage.scss";
import axios from 'axios';
import { Modal } from "@mui/material";

export const SignupPage = (props) => {
  const [userInfo, setUserInfo] = useState({ username: '', password: '', steamIdNumber: 0 });
  const [openDuplicateUsernameError, setOpenDuplicateUsernameError] = useState(false);
  const [openEmptyFieldsError, setOpenEmptyFieldsError] = useState(false);
  const [accountCreatedMessage, setAccountCreatedMessage] = useState(false);

  const signup = (userInfo) => {
    console.log(userInfo);
    if (!userInfo.username || !userInfo.password || !userInfo.steamIdNumber) {
      setOpenEmptyFieldsError(true);
      return;
    }

    //Adds the user to the database
    // axios.post('/users/new', { username: userInfo.username, password: userInfo.password, steamIdNumber: userInfo.steamIdNumber })
      // .then((res) => {console.log(res)})
      //Get the id of the newly created user
      // .then(() => {
      //   axios.get(`/users/${userInfo.username}`)
      // })
      //Create a new list
      // .then((userId) => {
      //   // axios.post('/game_lists/new',)
      //   console.log(userId);
      // })
      //Inform the user that the account has been created
    axios.post(`steam/import-steam-list/${userInfo.steamIdNumber}`)
      .then(() => {
        setAccountCreatedMessage(true);
      })


      .catch((err) => {
        if (err.response.data === 23505) {
          console.log('Username already taken.');
          setOpenDuplicateUsernameError(true);
        }
      })
      //Import all games a player owns into the database
      // axios.post(`/steam/import-steam-list/${userInfo.steamIdNumber}`)
      // .then(()=>{

      //   axios.post('/steam/testrun')
      // })
      //Create list item for each game
  };
  
  return (
    <div className="signup-page">
      <h2>Sign-up</h2>
      <div className="signup-fields">
        <label htmlFor="username-creation">Username</label>
        <input type="text" className="signup-field" id="username-creation" placeholder="Username" value={userInfo.username} onChange={(event) => setUserInfo(prev => ({ ...prev, username: event.target.value }))} />
        <label htmlFor="password-creation">Password</label>
        <input type="password" className="signup-field" id="password-creation" placeholder="Password" value={userInfo.password} onChange={(event) => setUserInfo(prev => ({ ...prev, password: event.target.value }))} />
        {/*Might add back password confiramtion later. Make sure that basic new user creation is functioning first*/}
        {/* <label htmlFor="password-confirmation">Confirm Password</label>
        <input type="password" className="signup-field" id="password-confirmation" placeholder="Confirm Password" /> */}
        <label htmlFor="email-creation">Steam ID</label>
        <input type="text" className="signup-field" id="steam-id-import" placeholder="76561198008227465" value={userInfo.steamIdNumber || ''} onChange={(event) => setUserInfo(prev => ({ ...prev, steamIdNumber: event.target.value }))} />

      </div>
      <div className="signup-buttons">
        <button className="signup-button" onClick={() => { signup(userInfo); }}>Create Account</button>
        <button className="signup-button" onClick={(event) => setUserInfo({ username: '', password: '', steamIdNumber: 0 })}>Reset</button>
      </div>

      <Modal className="another" open={openDuplicateUsernameError} onClose={() => setOpenDuplicateUsernameError(false)}><div className="error-message-modal">Username already taken.</div></Modal>
      <Modal className="another" open={openEmptyFieldsError} onClose={() => setOpenEmptyFieldsError(false)}><div className="error-message-modal">All fields must be entered.</div></Modal>
      <Modal className="another" open={accountCreatedMessage} onClose={() => { setAccountCreatedMessage(false); props.switchViewLogout(); }}><div className="error-message-modal">Account created. Please login.</div></Modal>
    </div>
  );
};