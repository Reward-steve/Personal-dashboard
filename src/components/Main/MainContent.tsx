import React from "react";
import styles from "./../../styles/MainContent.module.css"; // Import the CSS module
import WeatherWidget from "./../Widgets/WeatherWidget/WeatherWidget";

import { MainContentProps } from "./../../types/mainContent"; // Import the interface

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <div className={styles.mainContent}>
      <div className={styles.grid}>
        <div className={styles.weatherWidget}>
          <WeatherWidget />
          {children}
        </div>
        <div className={styles.analyticsWidget}></div>
        <div className={styles.financialWidget}></div>
      </div>
    </div>
  );
};

export default MainContent;
