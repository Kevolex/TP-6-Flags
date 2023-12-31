import React, { useState, useEffect } from "react";
import axios from "axios";
import {Card, Button, InputGroup} from "react-bootstrap";


const App = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    axios.get("https://countriesnow.space/api/v0.1/countries/flag/images")
      .then((res) => {
        setCountries(res.data.data);
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
        <h2>Tenes {points} puntos</h2>
        <Card></Card>
        {selectedCountry && (<Card>
          <Card.Img src={countries[selectedCountry].flag} alt={countries[selectedCountry].name} width={'400px'} height={'267px'}/>
        </Card>
        )}
        
        <Button onClick={() => {
            const rand = Math.floor(Math.random() * countries.length)
            setSelectedCountry(rand)
          }}>
          Get a random country
        </Button>
    </div>
  );
};

export default App;