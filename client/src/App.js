import { Profile } from './components/Profile';
//Importing my components
import { Navbar } from './components/Navbar';
import axios from 'axios';

import "./App.css";
import { GamePage } from './components/GamePage';
import { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
function App() {
  ////////////////
  // Visibility //
  ////////////////
  const defaultVisualState = {
    profileHidden: true,
    loginHidden: false,
    signupHidden: true,
    gamePageAllHidden: true,
    gamePageCurrentHidden: true,
    gamePageCompletedHidden: true,
    gamePageDroppedHidden: true,
    gamePagePlannedHidden: true
  };
  
  const [visualState, setVisualState] = useState(defaultVisualState);
  ////////////////////////////////////////////////////////////////

  /////////////////////
  // Logged In State //
  /////////////////////

  const [loggedIn, setLoggedIn] = useState(false);

  ////////////////
  // Game Lists //
  ////////////////
  const [gamesListAll, setGamesListAll] = useState([]);
  const [gamesListCurrent, setGamesListCurrent] = useState([]);
  const [gamesListCompleted, setGamesListCompleted] = useState([]);
  const [gamesListDropped, setGamesListDropped] = useState([]);
  const [gamesListPlanned, setGamesListPlanned] = useState([]);
  ////////////////////////////////////////////////////////////////
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (loggedIn) {
      //Get list of currently playing games
      axios.get(`/games/current/${username}`)
        .then(res => { setGamesListCurrent(res.data); });

      //Get list of completed games
      axios.get(`/games/completed/${username}`)
        .then(res => { setGamesListCompleted(res.data); });

      // //Get list of dropped games
      axios.get(`/games/dropped/${username}`)
        .then(res => { setGamesListDropped(res.data); });

      //Get list of planned games
      axios.get(`/games/planned/${username}`)
        .then(res => { setGamesListPlanned(res.data); });
      // //Get list of all games
      axios.get(`/games/all/${username}`)
        .then((res) => { setGamesListAll(res.data); });
    }

  }, [loggedIn, username, visualState]);



  const setDefaultVisualState = () => {
    setVisualState(defaultVisualState);
  }

  const switchViewAll = () => {

    setVisualState(prev=>({...prev, profileHidden: !visualState.profileHidden}))
    setVisualState(prev=>({...prev, gamePageAllHidden: !visualState.gamePageAllHidden}))


    window.scrollTo(0, 0);
  };
  const switchViewCurrent = () => {
    setVisualState(prev=>({...prev, profileHidden: !visualState.profileHidden}))
    setVisualState(prev=>({...prev, gamePageCurrentHidden: !visualState.gamePageCurrentHidden}))


    window.scrollTo(0, 0);
  };
  const switchViewCompleted = () => {
    setVisualState(prev=>({...prev, profileHidden: !visualState.profileHidden}))
    setVisualState(prev=>({...prev, gamePageCompletedHidden: !visualState.gamePageCompletedHidden}))

    window.scrollTo(0, 0);
  };
  const switchViewDropped = () => {
    setVisualState(prev=>({...prev, profileHidden: !visualState.profileHidden}))
    setVisualState(prev=>({...prev, gamePageDroppedHidden: !visualState.gamePageDroppedHidden}))
    window.scrollTo(0, 0);
  };
  const switchViewPlanned = () => {
    setVisualState(prev=>({...prev, profileHidden: !visualState.profileHidden}))
    setVisualState(prev=>({...prev, gamePagePlannedHidden: !visualState.gamePagePlannedHidden}))
    window.scrollTo(0, 0);
  };
  const switchViewLoginProfile = () => {
    setVisualState(prev=>({...prev, profileHidden: !visualState.profileHidden}))
    setVisualState(prev=>({...prev, loginHidden: !visualState.loginHidden}))
    window.scrollTo(0, 0);
  };
  const switchViewLogout = () => {
    setDefaultVisualState()
    setUsername('');
    setPassword('');
    window.scrollTo(0, 0);
  };
  const switchViewSignup = () => {
    setVisualState(prev=>({...prev, loginHidden: true}))
    setVisualState(prev=>({...prev, signupHidden: false}))
    window.scrollTo(0, 0);
  };

  return (
    <div className="App">
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} switchViewLogout={switchViewLogout} />
      {/* //Login Page View */}
      {!visualState.loginHidden &&
        <LoginPage
          switchViewLogin={switchViewLoginProfile}
          setLoggedIn={setLoggedIn}
          switchViewSignup={switchViewSignup}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />}



      {/* //Profile Page View */}
      {!visualState.profileHidden &&
        <Profile
          switchViewAll={switchViewAll}
          switchViewCurrent={switchViewCurrent}
          switchViewCompleted={switchViewCompleted}
          switchViewDropped={switchViewDropped}
          switchViewPlanned={switchViewPlanned}

          username={username}

          gamesListAll={gamesListAll}
          gamesListCurrent={gamesListCurrent}
          gamesListCompleted={gamesListCompleted}
          gamesListDropped={gamesListDropped}
          gamesListPlanned={gamesListPlanned}

          setGamesListAll={setGamesListAll}
          setGamesListCurrent={setGamesListCurrent}
          setGamesListCompleted={setGamesListCompleted}
          setGamesListDropped={setGamesListDropped}
          setGamesListPlanned={setGamesListPlanned}


        />
      }

      {/* //Signup Page View */}
      {!visualState.signupHidden && <SignupPage switchViewLogout={switchViewLogout} />}


      {/* //Game page for All Games */}
      {!visualState.gamePageAllHidden && <GamePage id="game-page-all" gamesList={gamesListAll} switchView={switchViewAll} />}

      {/* //Game page for Current Games */}
      {!visualState.gamePageCurrentHidden && <GamePage id="game-page-current" gamesList={gamesListCurrent} switchView={switchViewCurrent} />}

      {/* //Game page for Completed Games */}
      {!visualState.gamePageCompletedHidden && <GamePage id="game-page-completed" gamesList={gamesListCompleted} switchView={switchViewCompleted} />}

      {/* //Game page for Dropped Games */}
      {!visualState.gamePageDroppedHidden && <GamePage id="game-page-dropped" gamesList={gamesListDropped} switchView={switchViewDropped} />}

      {/* //Game page for Planned Games */}
      {!visualState.gamePagePlannedHidden && <GamePage id="game-page-planned" gamesList={gamesListPlanned} switchView={switchViewPlanned} />}
    </div>


  );
}

export default App;
