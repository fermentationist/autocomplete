import React, {useEffect, useState} from 'react';
import Autocomplete from "./Autocomplete.js";
// import logo from './logo.svg';
// import './App.css';

function App() {
    let [suggestions, setSuggestions] = useState([]);
    // const suggestions = [
    //     "Rick Astley",
    //     "The Clash",
    //     "The Cure",
    //     "Barry White",
    //     "Barry Manilow",
    //     "Fleetwood Mac",
    //     "Harry Nilsson",
    //     "Heart",
    //     "Barbara Streisand",
    //     "White Lion",
    //     "White Stripes",
    // ];
    useEffect(() => {
        const getSuggestions = async () => {
            const names = await fetch("https://swapi.co/api/people/")
                .then(res => res.json())
                .then(data => {
                    return data.results.map(person => person.name)
                })
            setSuggestions(await names)
        }
        getSuggestions();
    }, [])

  return (
    <div className="App">
      <Autocomplete suggestions={suggestions} />
    </div>
  );
}

export default App;
