import React from 'react';
import Autocomplete from "./Autocomplete.js";
// import logo from './logo.svg';
// import './App.css';

function App() {
  const suggestions = [
    "Rick Astley",
    "The Clash",
    "The Cure",
    "Barry White",
    "Barry Manilow",
    "Fleetwood Mac",
    "Harry Nilsson",
    "Heart",
    "Barbara Streisand",
    "White Lion",
    "White Stripes",

  ];
  return (
    <div className="App">
      <Autocomplete suggestions={suggestions} />
    </div>
  );
}

export default App;
