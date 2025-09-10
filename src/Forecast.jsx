import React from "react";

function Forecast({ forecast }) {
  // Group data by day
  const daily = {};
  forecast.list.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!daily[date]) daily[date] = [];
    daily[date].push(item);
  });

  const days = Object.keys(daily).slice(0, 7); // next 7 days

  return (
    <div className="forecast">
      <h2>📅 Upcoming Forecast</h2>

      <div className="forecast-grid">
        {days.map((day) => {
          const temps = daily[day].map((d) => d.main.temp);
          const min = Math.min(...temps);
          const max = Math.max(...temps);

          return (
            <div className="forecast-card" key={day}>
              <h3>{day}</h3>
              <p>🌡 Min: {min.toFixed(1)}°C</p>
              <p>🌡 Max: {max.toFixed(1)}°C</p>
              <p>🌧 Rain chance: {daily[day][0].pop * 100 || 0}%</p>
            </div>
          );
        })}
      </div>

      <h2>⏰ Hourly Today</h2>
      <div className="forecast-grid">
        {forecast.list.slice(0, 8).map((hour, index) => (
          <div className="forecast-card" key={index}>
            <p>{new Date(hour.dt * 1000).toLocaleTimeString()}</p>
            <p>{hour.main.temp}°C</p>
            <p>{hour.weather[0].main}</p>
            <p>💧 {hour.pop * 100}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
