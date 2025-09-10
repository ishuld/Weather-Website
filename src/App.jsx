import { useState } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";
import Forecast from "./Forecast";
import "./App.css";

const API_KEY = "6d1f32dd8de38c64a0da73b12f80ef8f"; // paste your key here

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      setWeather(null);
      setForecast(null);
      return;
    }
    try {
      setError("");
      // ✅ Current weather
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await axios.get(url);
      const data = response.data;
      setWeather(data);

      // ✅ Forecast (5 days / 3-hour intervals)
      const { lat, lon } = data.coord;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      const forecastRes = await axios.get(forecastUrl);
      setForecast(forecastRes.data);
    } catch (err) {
      setWeather(null);
      setForecast(null);
      setError("City not found. Try again!");
    }
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="header">
        <h1>🌤️ Modern Weather Dashboard</h1>
        <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && <WeatherCard data={weather} />}

      {forecast && <Forecast forecast={forecast} />}
    </div>
  );
}

export default App;
