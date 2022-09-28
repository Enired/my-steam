import { Modal } from "@mui/material";
import { useState } from "react";
import "../styles/LoginPage.scss";
import axios from 'axios';

export const LoginPage = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);

  const checkIfBlank = (textInput) => {
    if (!textInput) {
      return true;
    }

    return false;
  };

  const login = (username) => {
    axios.get(`users/${username}`)
      .then((res) => {
        if (res.data[0].password === password) {
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
        <input type="text" name="login-name" id="login-name" value={username} onChange={(event) => { setUsername(event.target.value); }} />
        <label htmlFor="login-password">Password</label>
        <input type="password" name="login-password" id="login-password" value={password} onChange={(event) => { setPassword(event.target.value); }} />
      </div>
      <div className="login-buttons">
        <button className="action-button" id="login-button" onClick={(event) => { (!checkIfBlank(username) & !checkIfBlank(password)) ? login(username) : setOpen(true); }}>Login</button>
        <button className="action-button" id="sign-up-button" onClick={() => { props.switchViewSignup(); }}>Sign-up</button>
        <button className="action-button" id="forgot-password-button">Forgot Password</button>
      </div>

      <Modal className="another" open={open} onClose={() => setOpen(false)}><div className="error-message-modal">Please ensure all fields are filled.</div></Modal>
    </div>

  );
};