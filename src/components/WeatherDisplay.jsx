// WeatherDisplay.js
import React from 'react';
import '../styles/WeatherDisplay.css';

function WeatherDisplay({ data, onBack }) {
  return (
    <div>
      <h1>{data.location.name}</h1>
      <p>{data.current.condition.text}</p>
      <p>{data.current.temp_c}°C</p>
      <button onClick={onBack}>Back</button>
    </div>
  );
}

export default WeatherDisplay;
