import ReactAnimatedWeather from 'react-animated-weather';
import './Forecast.css';
import { iconMapping } from './iconMapping';

// This function finds the weather for the next 5 days at noon
const getFiveDayForecast = (list) => {
    const dailyData = {};
    list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!dailyData[date]) {
            dailyData[date] = item;
        }
    });
    // Return the next 5 days
    return Object.values(dailyData).slice(1, 6);
};

const getDayName = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', { weekday: 'long' });
};

function Forecast({ data }) {
  if (!data || !data.forecast || !data.forecast.list) return null;
  
  const fiveDayForecast = getFiveDayForecast(data.forecast.list);

  return (
    <div className="forecast-card">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-list">
        {fiveDayForecast.map((item, index) => (
          <div className="forecast-item" key={index}>
            <p className="day">{getDayName(item.dt)}</p>
            <div className="icon">
              <ReactAnimatedWeather
                icon={iconMapping[item.weather[0].icon] || 'CLEAR_DAY'}
                color="white" size={32} animate={true}
              />
            </div>
            <p className="temps">{Math.round(item.main.temp_max)}° <span className="low">{Math.round(item.main.temp_min)}°</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;