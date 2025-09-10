import React from "react";

function WeatherCard({ data }) {
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
  const temp = data.main.temp;
  const wind = data.wind.speed;

  const outdoor =
    temp >= 18 && temp <= 28 && wind < 15
      ? "✅ Great for outdoor games"
      : "⚠️ Not ideal for outdoor games";

  return (
    <div className="weather-card">
      <h2>{data.name}, {data.sys.country}</h2>
      <p>🌡 Temperature: {temp}°C</p>
      <p>🌥 Condition: {data.weather[0].description}</p>
      <p>💨 Wind: {wind} m/s</p>
      <p>🌅 Sunrise: {sunrise}</p>
      <p>🌇 Sunset: {sunset}</p>
      <p>{outdoor}</p>
    </div>
  );
}

export default WeatherCard;
