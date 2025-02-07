import React, { useEffect, useState } from "react";
import { fetchWeather } from "../../../api/WeatherApi";
import styles from "../../../styles/WeatherWidget.module.css"; // Import the CSS module for styling

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState({
    temp: 0,
    condition: "",
    location: "",
  });

  useEffect(() => {
    fetchWeather("Lagos").then(setWeather).catch(console.error);
  }, []);

  return (
    <div className={styles.widget}>
      <h2 className={styles.location}>{weather.location}</h2>
      <p className={styles.temp}>{weather.temp}°C</p>
      <p className={styles.condition}>{weather.condition}</p>
    </div>
  );
};

export default WeatherWidget;
