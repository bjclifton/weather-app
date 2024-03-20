// WeatherForm.js
import '../styles/WeatherForm.css';
import React, { useState } from 'react';

function WeatherForm({ onSearch }) {
  const [location, setLocation] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(location);
  };

  return (
    <div>
      <h1>Swaggy Brad's Weather</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter City" className="input input-bordered w-full max-w-xs" value={location} onChange={(e) => setLocation(e.target.value)} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default WeatherForm;
