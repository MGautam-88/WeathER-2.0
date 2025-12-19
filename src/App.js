import { useEffect } from 'react';

import { Card } from './components/Card';
import { Input } from './components/Input';
import { Button } from './components/Button';
import { Background } from "./components/Background";

import './App.css';

import { useWeather } from './context/Weather';

function App() {
  const weather = useWeather();

  // useEffect(() => {
  //   weather.fetchLocData();
  // }, []);//get current location on mounting

  useEffect(() => {
    const handleKey = (e) => {

      if (e.key === "/") {
        e.preventDefault();
        const input = document.querySelector(".input-field");
        if (input) { input.focus(); input.select(); }
      }

      if (e.key === "Enter") weather.fetchData();
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [weather]);//to handle keyboard shourtcuts


  return (
    <div className="App">
      <Background />
      <h1>Weather Forecast</h1>
      <Card />
      <div className="input-container">
        <div className="search-box" style={{ marginTop: '15px' }}>
          <Input />
          <Button onClick={weather.fetchData} value="Search" />
          <Button onClick={weather.fetchLocData} value="📍" />
        </div>
      </div>
    </div>
  );
}

export default App;
