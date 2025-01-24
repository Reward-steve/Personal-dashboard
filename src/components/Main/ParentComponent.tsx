import React from "react";
import { MainContentProps } from "../../types/mainContent";
import { useTheme } from "../../hooks/useTheme";
import styles from "./../../styles/Theme.module.css";
import { useBackground } from "../../hooks/useBackground";

const ParentComponent: React.FC<MainContentProps> = ({ children }) => {
  const { isDarkMode } = useTheme();
  const { bgImage } = useBackground();

  return (
    <div
      className={`${styles.flexContainer} ${
        isDarkMode ? styles.darkMode : styles.lightMode
      }`}
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover" }}
    >
      {children}
    </div>
  );
};

export default ParentComponent;
