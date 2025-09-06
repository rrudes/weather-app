import ReactAnimatedWeather from 'react-animated-weather';
import './MainWeather.css';
import { iconMapping } from './iconMapping';

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });
};

function MainWeather({ data }) {
  if (!data || !data.current) return null;

  return (
    <div className="main-weather-card">
      <div className="location-info">
        <h2>{data.cityName}</h2>
        <p>{formatDate(data.current.dt)}</p>
      </div>
      <div className="temperature-info">
        <div className="weather-icon">
          <ReactAnimatedWeather
            icon={iconMapping[data.current.weather[0].icon] || 'CLEAR_DAY'}
            color="white" size={84} animate={true}
          />
        </div>
        <h1 className="temperature">{Math.round(data.current.main.temp)}°</h1>
        <p className="weather-description">{data.current.weather[0].description}</p>
      </div>
      <div className="details-grid">
        <div className="detail-item">
          <p className="label">Feels like</p>
          <p className="value">{Math.round(data.current.main.feels_like)}°</p>
        </div>
        <div className="detail-item">
          <p className="label">Humidity</p>
          <p className="value">{data.current.main.humidity}%</p>
        </div>
        <div className="detail-item">
          <p className="label">Wind</p>
          <p className="value">{data.current.wind.speed} km/h</p>
        </div>
        <div className="detail-item">
          <p className="label">Visibility</p>
          <p className="value">{data.current.visibility / 1000} km</p>
        </div>
      </div>
    </div>
  );
}

export default MainWeather;