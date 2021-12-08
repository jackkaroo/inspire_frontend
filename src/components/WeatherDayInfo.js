import {useEffect, useState} from "react";
import {CircularProgress} from "@material-ui/core";

const getData = async (date) => {
  const proxy = 'https://thingproxy.freeboard.io/fetch/';
  const url = `http://metaweather.com/api/location/924938/2021/11/${date}/`;

  const data = await fetch(proxy + url);
  return data.json();
};

const getDate = (date) => {
  const days = ['Sun', 'Mon','Tue','Wed','Thu','Fri','Sat'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const newDate = new Date(date);

  const day = days[newDate.getDay()];
  const month = months[newDate.getMonth()];

  return day + ' ' + newDate.getDate() + ' ' + month;
}

export default function WeatherDayInfo({date}) {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getData(date)
      .then((data) => {
        return setWeatherData(data[0]);
      })
      .catch(() => console.log('Something goes wrong..'))
      .finally(() => setLoading(false));
  },[]);

  console.log(weatherData);

  return (
    <>
      {loading
        ? (
          <div className="world-loader">
            <CircularProgress/>
          </div>
        )
        : weatherData &&
          <div className="weather-item">
            <p className="weather-date">
              {getDate(weatherData.applicable_date)}
            </p>
            <img className="weather-img"
                 src={`https://www.metaweather.com/static/img/weather/${weatherData.weather_state_abbr}.svg`}
                 alt=""
            />
            <span>{weatherData.weather_state_name}</span>
            <div className="weather-content">
              <p>
                <b>Max: </b>
                {weatherData.max_temp > 0 ? '+' + Math.round(weatherData.max_temp) : Math.round(weatherData.max_temp)} C
              </p>
              <p>
                <b>Min: </b>
                {weatherData.minTemp > 0 ? '+' + Math.round(weatherData.minTemp) : Math.round(weatherData.minTemp)} C
              </p>
              <p>
                <b>Wind: </b>
                {Math.round(weatherData.wind_speed)}mph
              </p>
              <p>
                <b>Humidity: </b><br/>
                {Math.round(weatherData.humidity)} %
              </p>
              <p>
                <b>Visibility: </b><br/>
                {Math.round(weatherData.visibility * 10)/10} miles
              </p>
              <p>
                <b>Pressure: </b><br/>
                {Math.round(weatherData.air_pressure)} mbar
              </p>
              {/*<p>*/}
              {/*  <b>Confidence: </b><br/>*/}
              {/*  {weatherData.predictability} %*/}
              {/*</p>*/}
            </div>
          </div>
      }
    </>
  )
};
