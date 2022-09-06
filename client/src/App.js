//Importing my components
import { Profile } from './components/Profile';
import { Navbar } from './components/Navbar';
import axios from 'axios';

import "./App.css"
import { GamePage } from './components/GamePage';
import { useState, useEffect } from 'react';
function App() {
  const [profileHidden, setProfileHidden] = useState(true)
  const [gamePageAllHidden, setGamePageAllHidden] = useState(false)

  const [gamesListAll, setGamesListAll] = useState([])
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




  }, []);


  const switchView = () =>{
    setProfileHidden(!profileHidden)
    setGamePageAllHidden(!gamePageAllHidden)
  }
  return (
    <div className="App">
      <Navbar />
      {!profileHidden && <Profile switchView={switchView}/>}
      {!gamePageAllHidden && <GamePage id="game-page-all" gamesListAll={gamesListAll} switchView={switchView}/>}
    </div>


  );
}

export default App;
