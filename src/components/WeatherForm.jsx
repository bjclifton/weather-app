// WeatherForm.js
import '../styles/WeatherForm.css';
import image from '../img/day.svg';
import React, { useState } from 'react';

function WeatherForm({ onSearch }) {
  const [location, setLocation] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(location);
  };

  return (
    <div className="weather-form">
      <img src={image} alt="weather" />   
      <form noValidate autoComplete="Off" className="search-bar" onSubmit={handleSubmit}>
        <input type="text" name="search" pattern=".*\S.*" required value={location} onChange={(e) => setLocation(e.target.value)}/>
        <button className="search-btn" type="submit">
          <span>Search</span>
        </button>
      </form>
    </div>
  );
}

export default WeatherForm;
