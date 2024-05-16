import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import logo from './images/github.svg'
import './App.css'
import Weather from './components/Weather';

// const WeatherApiSection = ({ onFetchWeather }) => {
//   const [city, setCity] = useState('');

//   return (
//     <div>
//       <div className='form-control'>
//       <input
//         type="text"
//         placeholder="Enter city"
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//       className='input input-alt'/>
//       <span className='input-border input-border-alt'></span>
//       </div>
//       <button onClick={() => onFetchWeather(city)} className='button'>Get Weather</button>
//     </div>
//   );
// };

// const WeatherApp = () => {
//   const [weatherData, setWeatherData] = useState(null);

//   const getWeatherData = async (city) => {
//     // Replace '{API key}' with your actual OpenWeatherMap API key
    const apiKey = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

//     try {
//       const response = await fetch(apiUrl);
//       const data = await response.json();

//       if (response.ok) {
//         setWeatherData({
//           city: data.name,
//           temperature: data.main.temp,
//           condition: data.weather[0].description,
//         });
//       } else {
//         console.error(`Error: ${data.message}`);
//         // You can handle error cases here
//       }
//     } catch (error) {
//       console.error('Error fetching weather data:', error);
//       // You can handle error cases here
//     }
//   };

//   return (
//     <>
//     <div>
//       <h1>Weather App</h1>

//       <WeatherApiSection onFetchWeather={getWeatherData} />

//       {weatherData && (
//         <div>
//           <h2>{weatherData.city}</h2>
//           <p>Temperature: {weatherData.temperature}°C</p>
//           <p>Condition: {weatherData.condition}</p>
//         </div>
//       )}
//     </div>
//     </>
//   );
// };

// export default WeatherApp;



export default function App() {
  
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setData(result)
        console.log(result);
      });
    }
    fetchData();
  }, [lat,long])

  return (
    <>
    <div className="App">
    <Weather weatherData={data}/>
    </div>
    </>
  );
}