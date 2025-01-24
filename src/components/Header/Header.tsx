import React from "react";
import styles from "./../../styles/Header.module.css"; // Import the CSS module
// import theme from "./../../styles/Theme.module.css";
// import { useTheme } from "../../hooks/useTheme";
import { CiSettings } from "react-icons/ci";

const Header: React.FC = () => {
  return (
    <nav className={`${styles.header}`}>
      <h1 className={styles.title}>Dashboard</h1>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search..."
      />
      <CiSettings className={`${styles.icon}`} />
    </nav>
  );
};

export default Header;
