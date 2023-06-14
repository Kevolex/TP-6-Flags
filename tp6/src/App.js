import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    axios.get("https://countriesnow.space/api/v0.1/countries/flag/images")
      .then((res) => {
        setCountries(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleGuess = (country) => {
    if (country === selectedCountry) {
      setPoints(points + 10);
    } else {
      setPoints(points - 1);
    }
    setSelectedCountry(null);
  };

  return (
    <div>
      <h1>Flag Management</h1>
      <p>You have {points} points</p>
      <button onClick={() => setSelectedCountry(Math.random() * countries.length)}>
        Get a random country
      </button>
      {selectedCountry && (
        <div>
          <img src={countries[selectedCountry].flag} alt={countries[selectedCountry].name} />
          <input
            type="text"
            placeholder="Guess the country"
            onChange={(e) => handleGuess(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default App;