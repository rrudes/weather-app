import { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import SearchBar from './components/SearchBar';
import './App.css';

const MainWeather = lazy(() => import('./components/MainWeather'));
const Forecast = lazy(() => import('./components/Forecast'));

const API_KEY = import.meta.env.VITE_API_KEY;
if (!API_KEY) {
  console.error("API Key is missing! Make sure you have a .env file with VITE_API_KEY.");
}

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    if (!API_KEY) {
      setError("API Key is not configured. Please check the console.");
      return;
    }
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const geoResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${API_KEY}`);
      const geoData = await geoResponse.json();
      
      if (geoData.length === 0) {
        throw new Error("City not found. Please try again.");
      }
      
      const { lat, lon, name } = geoData[0];

      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
      ]);

      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error("Failed to fetch weather data.");
      }
      
      const currentWeatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();

      setWeatherData({
        current: currentWeatherData,
        forecast: forecastData,
        cityName: name,
      });

    } catch (err) { // The missing '{' has been added here
      // console.error("Fetch Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app-container">
      <h1 className="dashboard-title">Hello, Sky!</h1>
      <p className="dashboard-subtitle">i hope your day goes well lol ^^</p>
      
      <SearchBar onSearch={handleSearch} />

      <div className="dashboard-layout">
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        
        <Suspense fallback={<p>Loading UI...</p>}>
          {weatherData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="weather-results"
            >
              <MainWeather data={weatherData} />
              <Forecast data={weatherData} />
            </motion.div>
          )}
        </Suspense>
      </div>
    </main>
  );
}

export default App;