// WeatherDisplay.js
import React from "react";
import "../styles/WeatherDisplay.css";

function WeatherDisplay({ data, location}) {
  const [index, setIndex] = React.useState(0);

  // Take location, and completely lowercase it, make the first letter of everyword uppercase
  const title = location
    .toLowerCase()
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");

  const forecast = data.properties.periods.map((period, index) => {
    const date = new Date(period.startTime);
    const day = date.toLocaleString("en-US", { weekday: "long" });
    const time = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return (
      <div key={index} className="forecast">
        <h3>
          {day} {time}
        </h3>
        <div className="image-container">
          <button onClick={() => setIndex(((index - 1)%14 + 14)%14)}>&lt;</button>
          <img src={period.icon} className="weather-icon" alt={period.shortForecast} />
          <button onClick={() => setIndex((index + 1)%14)}>&gt;</button>
        </div>
        <p className="short-forecast">{period.shortForecast}</p>
        <p className="temp">Temperature: {period.temperature}°F</p>
        <p className="wind">Wind: {period.windSpeed}</p>
      </div>
    );
  });

  // Want to only display one card at a time, having arrows on either side to rotate through the cards
  return (
    <div className="weather-display">
      <h2>{title}</h2>
      {forecast[index]}
    </div>
  );
}

export default WeatherDisplay;
