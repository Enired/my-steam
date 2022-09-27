//Importing my components
import { Profile } from './components/Profile';
import { Navbar } from './components/Navbar';
import axios from 'axios';

import "./App.css"
import { GamePage } from './components/GamePage';
import { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
function App() {
  ////////////////
  // Visibility //
  ////////////////
  const [profileHidden, setProfileHidden] = useState(true)
  const [loginHidden, setLoginHidden] = useState(false)
  const [signupHidden, setSignupHidden] = useState(true)
  const [gamePageAllHidden, setGamePageAllHidden] = useState(true)
  const [gamePageCurrentHidden, setGamePageCurrentHidden] = useState(true)
  const [gamePageCompletedHidden, setGamePageCompletedHidden] = useState(true)
  const [gamePageDroppedHidden, setGamePageDroppedHidden] = useState(true)
  const [gamePagePlannedHidden, setGamePagePlannedHidden] = useState(true)
  ////////////////////////////////////////////////////////////////

  /////////////////////
  // Logged In State //
  /////////////////////

  const [loggedIn, setLoggedIn] = useState(false)

  ////////////////
  // Game Lists //
  ////////////////
  const [gamesListAll, setGamesListAll] = useState([])
  const [gamesListCurrent, setGamesListCurrent] = useState([])
  const [gamesListCompleted, setGamesListCompleted] = useState([])
  const [gamesListDropped, setGamesListDropped] = useState([])
  const [gamesListPlanned, setGamesListPlanned] = useState([])
  ////////////////////////////////////////////////////////////////
  const [player, setPlayer] = useState({});

  useEffect(() => {
    const playerDBUrl = 'https://playerdb.co/api/player/steam/enired'; //Change this later.
    axios.get(playerDBUrl)
      .then((res) => {
        const player = res.data.data.player;
        setPlayer(player);
        document.cookie=player.id
      })


    //Get list of currently playing games
    axios.get('/games/current')
    .then(res=>{setGamesListCurrent(res.data)})
    
    //Get list of completed games
    axios.get('/games/completed')
    .then(res=>{setGamesListCompleted(res.data)})
    
    //Get list of dropped games
    axios.get('/games/dropped')
    .then(res=>{setGamesListDropped(res.data)})
    
    //Get list of planned games
    axios.get('/games/planned')
    .then(res=>{setGamesListPlanned(res.data)})
    //Get list of all games
    axios.get('/games/all')
    .then((res)=>{setGamesListAll(res.data)})



  }, [profileHidden, loggedIn]);

  const switchViewAll = () =>{
    setProfileHidden(!profileHidden)
    setGamePageAllHidden(!gamePageAllHidden)
    window.scrollTo(0,0);
  }
  const switchViewCurrent = () =>{
    setProfileHidden(!profileHidden)
    setGamePageCurrentHidden(!gamePageCurrentHidden)
    window.scrollTo(0,0);
  }
  const switchViewCompleted = () =>{
    setProfileHidden(!profileHidden)
    setGamePageCompletedHidden(!gamePageCompletedHidden)
    window.scrollTo(0,0);
  }
  const switchViewDropped = () =>{
    setProfileHidden(!profileHidden)
    setGamePageDroppedHidden(!gamePageDroppedHidden)
    window.scrollTo(0,0);
  }
  const switchViewPlanned = () =>{
    setProfileHidden(!profileHidden)
    setGamePagePlannedHidden(!gamePagePlannedHidden)
    window.scrollTo(0,0);
  }
  const switchViewLoginProfile = () => {
    setProfileHidden(!profileHidden)
    setLoginHidden(!loginHidden)
    window.scrollTo(0,0);
  }
  const switchViewLogout = () => {
    setProfileHidden(true)
    setLoginHidden(false)
    setGamePageAllHidden(true)
    setGamePageCurrentHidden(true)
    setGamePageCompletedHidden(true)
    setGamePageDroppedHidden(true)
    setGamePagePlannedHidden(true)
    setSignupHidden(true)
    window.scrollTo(0,0);
  }
  const switchViewSignup = () => {
    setProfileHidden(true)
    setLoginHidden(true)
    setGamePageAllHidden(true)
    setGamePageCurrentHidden(true)
    setGamePageCompletedHidden(true)
    setGamePageDroppedHidden(true)
    setGamePagePlannedHidden(true)
    setSignupHidden(false)
    window.scrollTo(0,0);
  }

  return (
    <div className="App">
      <Navbar loggedIn={loggedIn}  setLoggedIn={setLoggedIn} switchViewLogout={switchViewLogout} />
      {/* //Login Page View */}
      {!loginHidden && 
      <LoginPage 
      switchViewLogin={switchViewLoginProfile} 
      setLoggedIn={setLoggedIn}
      switchViewSignup={switchViewSignup}
      />}



      {/* //Profile Page View */}
      {!profileHidden && 
      <Profile 
      switchViewAll={switchViewAll} 
      switchViewCurrent={switchViewCurrent}
      switchViewCompleted={switchViewCompleted}
      switchViewDropped={switchViewDropped}
      switchViewPlanned={switchViewPlanned}
      
      gamesListAll={gamesListAll}
      gamesListCurrent={gamesListCurrent}
      gamesListCompleted={gamesListCompleted}
      gamesListDropped={gamesListDropped}
      gamesListPlanned={gamesListPlanned}
      />
    }

      {/* //Signup Page View */}
      {!signupHidden && <SignupPage switchViewLogout={switchViewLogout}/>}


      {/* //Game page for All Games */}
      {!gamePageAllHidden && <GamePage id="game-page-all" gamesList={gamesListAll} switchView={switchViewAll}/>}

      {/* //Game page for Current Games */}
      {!gamePageCurrentHidden && <GamePage id="game-page-current" gamesList={gamesListCurrent} switchView={switchViewCurrent}/>}

      {/* //Game page for Completed Games */}
      {!gamePageCompletedHidden && <GamePage id="game-page-completed" gamesList={gamesListCompleted} switchView={switchViewCompleted}/>}

      {/* //Game page for Dropped Games */}
      {!gamePageDroppedHidden && <GamePage id="game-page-dropped" gamesList={gamesListDropped} switchView={switchViewDropped}/>}

      {/* //Game page for Planned Games */}
      {!gamePagePlannedHidden && <GamePage id="game-page-planned" gamesList={gamesListPlanned} switchView={switchViewPlanned}/>}
    </div>


  );
}

export default App;
