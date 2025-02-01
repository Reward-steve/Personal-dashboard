import React from "react";
import { MainContentProps } from "../../types/mainContent";
import { useTheme } from "../../hooks/useTheme";
import styles from "./../../styles/Theme.module.css";

const ParentComponent: React.FC<MainContentProps> = ({ children }) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`${styles.flexContainer} ${
        isDarkMode ? styles.darkMode : styles.lightMode
      }`}
    >
      {children}
    </div>
  );
};

export default ParentComponent;
