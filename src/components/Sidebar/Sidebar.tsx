import React from "react";
import styles from "./../../styles/Sidebar.module.css"; // Import your CSS module
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.navContainer}>
        <h2 className={styles.title}>Navigation</h2>
        <ul className={styles.navList}>
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/Analytics"}>Analytics</NavLink>
          <NavLink to={"/Profile"}>Profile</NavLink>
          <NavLink to={"/Setting"}>Settings</NavLink>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
