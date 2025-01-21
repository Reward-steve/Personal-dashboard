import React from "react";
import styles from "./../../styles/Header.module.css"; // Import the CSS module

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Dashboard</h1>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search..."
      />
    </header>
  );
};

export default Header;
