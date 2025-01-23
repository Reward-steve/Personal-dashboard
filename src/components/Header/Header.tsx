import React from "react";
import styles from "./../../styles/Header.module.css"; // Import the CSS module
import theme from "./../../styles/Theme.module.css";
import { useTheme } from "../../hooks/useTheme";
import { CiSettings } from "react-icons/ci";

const Header: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <header
      className={`${styles.header} ${
        isDarkMode ? theme.darkMode : theme.lightMode
      }`}
    >
      <h1 className={styles.title}>Dashboard</h1>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search..."
      />
      <CiSettings
        className={`${styles.icon} ${
          isDarkMode ? theme.darkMode : theme.lightMode
        }`}
      />
    </header>
  );
};

export default Header;
