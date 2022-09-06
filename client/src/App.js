//Importing my components
import { Profile } from './components/Profile';
import { Navbar } from './components/Navbar';

import "./App.css"
import { GamePage } from './components/GamePage';
import { useState } from 'react';
function App() {
  const [profileHidden, setProfileHidden] = useState(true)
  const [gamePageHidden, setGamePageHidden] = useState(false)


  const switchView = () =>{
    setProfileHidden(!profileHidden)
    setGamePageHidden(!gamePageHidden)
  }
  return (
    <div className="App">
      <Navbar />
      {!profileHidden && <Profile switchView={switchView}/>}
      {!gamePageHidden && <GamePage switchView={switchView}/>}
    </div>


  );
}

export default App;
