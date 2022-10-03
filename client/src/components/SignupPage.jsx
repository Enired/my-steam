import { useState } from "react";
import "../styles/SignupPage.scss";
import axios from 'axios';
import { Modal } from "@mui/material";

export const SignupPage = (props) => {
  const [userInfo, setUserInfo] = useState({ username: '', password: '', steamIdNumber: 0 });
  const [openDuplicateUsernameError, setOpenDuplicateUsernameError] = useState(false);
  const [openEmptyFieldsError, setOpenEmptyFieldsError] = useState(false);
  const [openAccountCreatedMessage, setOpenAccountCreatedMessage] = useState(false);
  const [openImportingSteamListMessage, setOpenImportingSteamListMessage] = useState(false);

  const signup = (userInfo) => {
    if (!userInfo.username || !userInfo.password || !userInfo.steamIdNumber) {
      setOpenEmptyFieldsError(true);
      return;
    }

    setOpenImportingSteamListMessage(true)

    // Adds the user to the database
    axios.post('/users/new', { username: userInfo.username, password: userInfo.password, steamIdNumber: userInfo.steamIdNumber })
    .then(()=>{setOpenImportingSteamListMessage(false)})
    .then(() => {
        setOpenAccountCreatedMessage(true);
      })


      .catch((err) => {
        if (err.response.data === 23505) {
          setOpenImportingSteamListMessage(false)
          return setOpenDuplicateUsernameError(true);
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
        <input type="text" className="signup-field" id="username-creation" autoComplete="off" placeholder="Username" value={userInfo.username} onChange={(event) => setUserInfo(prev => ({ ...prev, username: event.target.value }))} />
        <label htmlFor="password-creation">Password</label>
        <input type="password" className="signup-field" id="password-creation" autoComplete="off" placeholder="Password" value={userInfo.password} onChange={(event) => setUserInfo(prev => ({ ...prev, password: event.target.value }))} />
        {/*Might add back password confiramtion later. Make sure that basic new user creation is functioning first*/}
        {/* <label htmlFor="password-confirmation">Confirm Password</label>
        <input type="password" className="signup-field" id="password-confirmation" placeholder="Confirm Password" /> */}
        <label htmlFor="email-creation">Steam ID</label>
        <input type="text" className="signup-field" id="steam-id-import" autoComplete="off" placeholder="76561198008227465" value={userInfo.steamIdNumber || ''} onChange={(event) => setUserInfo(prev => ({ ...prev, steamIdNumber: event.target.value }))} />

      </div>
      <div className="signup-buttons">
        <button className="signup-button" onClick={() => { signup(userInfo); }}>Create Account</button>
        <button className="signup-button" onClick={(event) => setUserInfo({ username: '', password: '', steamIdNumber: 0 })}>Reset</button>
      </div>

      <Modal className="message-modal" open={openDuplicateUsernameError} onClose={() => setOpenDuplicateUsernameError(false)}><div className="message-modal-message">Username already taken.</div></Modal>
      <Modal className="message-modal" open={openEmptyFieldsError} onClose={() => setOpenEmptyFieldsError(false)}><div className="message-modal-message">All fields must be entered.</div></Modal>
      <Modal className="message-modal" open={openAccountCreatedMessage} onClose={() => { setOpenAccountCreatedMessage(false); props.switchViewLogout(); }}><div className="message-modal-message">Account created. Please login.</div></Modal>
      <Modal className="message-modal" open={openImportingSteamListMessage} onClose={() => { setOpenImportingSteamListMessage(false);}}><div className="message-modal-message">Importing your steam games. Please wait.</div></Modal>
    </div>
  );
};