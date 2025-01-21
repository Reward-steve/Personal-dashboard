import React from "react";
import styles from "./../../styles/Sidebar.module.css"; // Import your CSS module

const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.navContainer}>
        <h2 className={styles.title}>Navigation</h2>
        <ul className={styles.navList}>
          <li>Home</li>
          <li>Analytics</li>
          <li>Profile</li>
          <li>Settings</li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
