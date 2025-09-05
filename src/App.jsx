import { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import './App.css';

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (query) => {
    setLoading(true);
    setError(null);
    setWeather(null);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`);
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        setError(data.message || 'City not found. Please try again.');
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError('Failed to fetch weather data. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app-container">
      <div className="content-wrapper">
        <header className="app-header">
          <h1 className="app-title">Time to check the weather buddy!</h1>
          <SearchBar onSearch={fetchWeather} />
        </header>
        <div className="content-container">
          {loading && <p>Loading...</p>}
          {error && <p className="error-message">{error}</p>}
          {weather && <WeatherCard weather={weather} />}
        </div>
      </div>
    </main>
  );
}

export default App;