//Importing my components
import { Profile } from './components/Profile';
import { Navbar } from './components/Navbar';
import axios from 'axios';

import "./App.css"
import { GamePage } from './components/GamePage';
import { useState, useEffect } from 'react';
function App() {
  ////////////////
  // Visibility //
  ////////////////
  const [profileHidden, setProfileHidden] = useState(false)
  const [gamePageAllHidden, setGamePageAllHidden] = useState(true)
  const [gamePageCurrentHidden, setGamePageCurrentHidden] = useState(true)
  const [gamePageCompletedHidden, setGamePageCompletedHidden] = useState(true)
  const [gamePageDroppedHidden, setGamePageDroppedHidden] = useState(true)
  const [gamePagePlannedHidden, setGamePagePlannedHidden] = useState(true)
  ////////////////////////////////////////////////////////////////

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
        // setPlayerMeta(player.meta);
      })
      // .then(()=>{
      //   axios.get(`/steam/gamecount/`, {params: {playerId:document.cookie}})
      //   .then((res)=>setGamesCount(res.data.gameCount))
      // })

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



  }, []);


  const switchViewAll = () =>{
    setProfileHidden(!profileHidden)
    setGamePageAllHidden(!gamePageAllHidden)
  }
  const switchViewCurrent = () =>{
    setProfileHidden(!profileHidden)
    setGamePageCurrentHidden(!gamePageCurrentHidden)
  }
  const switchViewCompleted = () =>{
    setProfileHidden(!profileHidden)
    setGamePageCompletedHidden(!gamePageCompletedHidden)
  }
  const switchViewDropped = () =>{
    setProfileHidden(!profileHidden)
    setGamePageDroppedHidden(!gamePageDroppedHidden)
  }
  const switchViewPlanned = () =>{
    setProfileHidden(!profileHidden)
    setGamePagePlannedHidden(!gamePagePlannedHidden)
  }

  return (
    <div className="App">
      <Navbar />
      {!profileHidden && 
      <Profile 
      switchViewAll={switchViewAll} 
      gamesListAll={gamesListAll}
      gamesListCurrent={gamesListCurrent}
      gamesListCompleted={gamesListCompleted}
      gamesListDropped={gamesListDropped}
      gamesListPlanned={gamesListPlanned}
      />
      }

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
