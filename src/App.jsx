import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const WeatherApiSection = ({ onFetchWeather }) => {
  const [city, setCity] = useState('');

  return (
    <div>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={() => onFetchWeather(city)}>Get Weather</button>
    </div>
  );
};

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);

  const getWeatherData = async (city) => {
    // Replace '{API key}' with your actual OpenWeatherMap API key
    const apiKey = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        setWeatherData({
          city: data.name,
          temperature: data.main.temp,
          condition: data.weather[0].description,
        });
      } else {
        console.error(`Error: ${data.message}`);
        // You can handle error cases here
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // You can handle error cases here
    }
  };

  return (
    <div>
      <h1>Weather App</h1>

      <WeatherApiSection onFetchWeather={getWeatherData} />

      {weatherData && (
        <div>
          <h2>{weatherData.city}</h2>
          <p>Temperature: {weatherData.temperature}°C</p>
          <p>Condition: {weatherData.condition}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;

