"use client"

import Image from "next/image";
// import styles from "./page.module.css";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { getCountriesFlags } from './api'

const FlagGame = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [guess, setGuess] = useState('');
  const [points, setPoints] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      const countriesData = await getCountriesFlags();
      setCountries(countriesData);
      const randomCountry = countriesData[Math.floor(Math.random() * countriesData.length)];
      setSelectedCountry(randomCountry);
    };

    fetchCountries();
  }, []);

  const handleGuess = () => {
    if (guess.toLowerCase() === selectedCountry.name.toLowerCase()) {
      setPoints(points + 10);
      setMessage('¡Correcto!');
    } else {
      setPoints(points - 1);
      setMessage('Incorrecto, intenta nuevamente.');
    }
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    setSelectedCountry(randomCountry);
    setGuess('');
  };

  return (
    <div className="container">
      <h1>Juego de Banderas</h1>
      {selectedCountry ? (
        <>
          <img src={selectedCountry.flag} alt="flag" className="flag-image" />
          <div>
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Adivina el país"
            />
            <button onClick={handleGuess}>Enviar</button>
          </div>
          <p>{message}</p>
          <p>Puntos: {points}</p>
        </>
      ) : (
        <p>Cargando banderas...</p>
      )}
    </div>
  );
};

export default FlagGame;