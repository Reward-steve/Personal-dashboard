import React from "react";
import styles from "./../../styles/Header.module.css"; // Import the CSS module
import { CiSearch } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <nav className={`${styles.header}`}>
      <h1 className={styles.title}>Dashboard</h1>

      <div className={styles.searchInputHolder}>
        <input
          type="text"
          placeholder="Search..."
          className={`${styles.searchInput}`}
        />
        <CiSearch className={`${styles.icon}`} />
      </div>

      <NavLink to={"/Settings"} style={{ color: "aliceblue" }}>
        <CiSettings className={`${styles.icon}`} />
      </NavLink>
    </nav>
  );
};

export default Header;
