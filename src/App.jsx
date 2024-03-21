import './styles/App.css';
import React, { useState } from 'react';
import WeatherForm from './components/WeatherForm';
import WeatherDisplay from './components/WeatherDisplay';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loc, setLoc] = useState('');
  const [error, setError] = useState(false);
  const handleSearch = async (location) => {
    // If location is empty, do nothing
    if (!location) {
      return;
    }
    setLoc(location);
    // Encode the location into a format suitable for a URL
    const encodedLocation = encodeURIComponent(location);
  
    // Fetch latitude and longitude
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodedLocation}&format=json`);
    
    if (!response.ok) {
      console.error('Failed to fetch location data');
      setError(true);
      return;
    }

    const data = await response.json();
    const lat = data[0].lat;
    const lon = data[0].lon;

    const weatherResponse = await fetch(`https://api.weather.gov/points/${lat},${lon}`);

    if (!weatherResponse.ok) {
      console.error('Failed to fetch weather data');
      setError(true);
      return;
    }
    const weatherData = await weatherResponse.json();

    const forecastURL = weatherData.properties.forecastHourly;

    const forecastResponse = await fetch(forecastURL);

    if (!forecastResponse.ok) {
      console.error('Failed to fetch forecast data');
      return;
    }
    const forecastData = await forecastResponse.json();
    console.log(forecastData);
    setError(false);
    setWeatherData(forecastData);
  };


  const handleBack = () => {
    setWeatherData(null);
  };
  

  return (
    <div className="App">
      <button className="header-button" onClick={handleBack}>Swaggy Brad's Weather</button>
      {weatherData ? <WeatherDisplay data={weatherData} location={loc}/> : <WeatherForm onSearch={handleSearch} />}
      {error && <div className="error">Only US locations are supported</div>}
    </div>
  );
}

export default App;
