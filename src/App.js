import logo from './logo.svg';
import './App.css';
import Navbar from './components/navigation/Navbar';
import Playing from "./pages/Playing";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
      <div className="App">
        <Navbar/>
      </div>
      
  );
}

export default App;
