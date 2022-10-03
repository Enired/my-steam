import { Modal } from "@mui/material";
import { useState } from "react";
import "../styles/LoginPage.scss";
import axios from 'axios';

export const LoginPage = (props) => {

  const [openEmptyFieldsError, setOpenEmptyFieldsError] = useState(false);

  const checkIfBlank = (textInput) => {
    if (!textInput) {
      return true;
    }

    return false;
  };

  const login = (username) => {
    axios.get(`users/${username}`)
      .then((res) => {
        if (res.data[0].password === props.password) {
          document.cookie = res.data[0].steam_id_number;
          props.switchViewLogin();
          props.setLoggedIn(true);
        }
        else {
          console.log('Wrong Credentials');
        }
        // console.log(res.data[0])
      });

  };


  return (
    <div className="login">
      <h2>Login</h2>
      <div className="login-text">
        <label htmlFor="login-name">Username</label>
        <input type="text" name="login-name" id="login-name" value={props.username} onChange={(event) => { props.setUsername(event.target.value); }} />
        <label htmlFor="login-password">Password</label>
        <input type="password" name="login-password" id="login-password" autoComplete="off" value={props.password} onChange={(event) => { props.setPassword(event.target.value); }} />
      </div>
      <div className="login-buttons">
        <button className="action-button" id="login-button" onClick={(event) => { (!checkIfBlank(props.username) & !checkIfBlank(props.password)) ? login(props.username) : setOpenEmptyFieldsError(true); }}>Login</button>
        <button className="action-button" id="sign-up-button" onClick={() => { props.switchViewSignup(); }}>Sign-up</button>
        <button className="action-button" id="forgot-password-button" onClick={()=>props.switchView(props.setSignupHidden)}>Forgot Password</button>
      </div>

      <Modal className="message-modal" open={openEmptyFieldsError} onClose={() => setOpenEmptyFieldsError(false)}><div className="message-modal-message">Please ensure all fields are filled.</div></Modal>
    </div>

  );
};