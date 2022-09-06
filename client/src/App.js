//Importing my components
import { Profile } from './components/Profile';
import { Navbar } from './components/Navbar';
import axios from 'axios';

import "./App.css"
import { GamePage } from './components/GamePage';
import { useState, useEffect } from 'react';
function App() {
  const [profileHidden, setProfileHidden] = useState(false)
  const [gamePageAllHidden, setGamePageAllHidden] = useState(true)

  const [gamesListAll, setGamesListAll] = useState([])
  const [gamesListCurrent, setGamesListCurrent] = useState([])
  const [gamesListCompleted, setGamesListCompleted] = useState([])
  const [gamesListDropped, setGamesListDropped] = useState([])
  const [gamesListPlanned, setGamesListPlanned] = useState([])
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
      .then(()=>{
        axios.get('/steam/games/', {params: {playerId:document.cookie}})
        .then((res)=>{setGamesListAll(res.data.games.games)})
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
    



  }, []);


  const switchView = () =>{
    setProfileHidden(!profileHidden)
    setGamePageAllHidden(!gamePageAllHidden)
  }
  return (
    <div className="App">
      <Navbar />
      {!profileHidden && 
      <Profile 
      switchView={switchView} 
      gamesListCurrent={gamesListCurrent}
      gamesListCompleted={gamesListCompleted}
      gamesListDropped={gamesListDropped}
      gamesListPlanned={gamesListPlanned}
      />
      }
      {!gamePageAllHidden && <GamePage id="game-page-all" gamesListAll={gamesListAll} switchView={switchView}/>}
    </div>


  );
}

export default App;
