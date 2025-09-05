import { motion } from 'framer-motion';
import ReactAnimatedWeather from 'react-animated-weather';
import './WeatherCard.css';

function WeatherCard({ weather }) {
  if (!weather) { return null; }

  const iconMapping = {
    '01d': 'CLEAR_DAY', '01n': 'CLEAR_NIGHT',
    '02d': 'PARTLY_CLOUDY_DAY', '02n': 'PARTLY_CLOUDY_NIGHT',
    '03d': 'PARTLY_CLOUDY_DAY', '03n': 'PARTLY_CLOUDY_NIGHT',
    '04d': 'CLOUDY', '04n': 'CLOUDY',
    '09d': 'RAIN', '09n': 'RAIN',
    '10d': 'RAIN', '10n': 'RAIN',
    '11d': 'RAIN', '11n': 'RAIN',
    '13d': 'SNOW', '13n': 'SNOW',
    '50d': 'FOG', '50n': 'FOG',
  };

  return (
    <motion.div // Make sure this says 'motion.div'
      className="weather-card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
      <h2>{weather.name}, {weather.sys.country}</h2>
      <div className="weather-main">
        <ReactAnimatedWeather
          icon={iconMapping[weather.weather[0].icon] || 'CLEAR_DAY'}
          color="white"
          size={112}
          animate={true}
        />
        <h1>{Math.round(weather.main.temp)}°C</h1>
      </div>
      <p className="weather-description">{weather.weather[0].description}</p>
      <div className="weather-details">
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
    </motion.div>
  );
}

export default WeatherCard;