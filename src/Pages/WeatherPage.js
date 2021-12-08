import {useEffect} from "react";
import {useHistory} from "react-router-dom";
import '../styles/weather_page.css';
import WeatherDayInfo from "../components/WeatherDayInfo";

const createDateArr = () => {
  const date = new Date();
  const dateArr = [];

  for(let i = 0; i < 5; i++) {
    dateArr.push(date.getDate() + i)
  }

  return dateArr;
}

export default function WeatherPage() {
  const history = useHistory();
  const dateArray = createDateArr();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      history.push("/login")
    }
  },[history]);

  return (
    <div className="weather-wrapper">
      <div className="weather-header">
        <b>Kyiv</b>, Ukraine
      </div>
      <div className="weather_items-wrapper">
        {
          dateArray.map((date) => {
            return <WeatherDayInfo key={date} date={date}/>
          })
        }
      </div>
    </div>
  )
}
