import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals'
//Import Pages
import Home from './pages/Home';
import Playing from "./pages/Playing";
import OnHold from './pages/OnHold';
import Completed from './pages/Completed';
import Dropped from './pages/Dropped';


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="playing" element={<Playing />} />
      <Route path="on-hold" element={<OnHold />} />
      <Route path="completed" element={<Completed />} />
      <Route path="dropped" element={<Dropped />} />
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
