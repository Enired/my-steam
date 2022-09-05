//Importing my components
import { Profile } from './components/Profile';
import { Navbar } from './components/Navbar';

import "./App.css"
import { GamePage } from './components/GamePage';
function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <Profile /> */}
      <GamePage />
    </div>


  );
}

export default App;
