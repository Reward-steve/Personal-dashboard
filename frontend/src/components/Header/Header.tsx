import React from "react";
import { useState } from "react";
import styles from "./../../styles/Header.module.css"; // Import the CSS module
import { CiSearch } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa6";

import img from "../../assets/img/analytics.jpg";

const Header: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  console.log(search);

  return (
    <nav>
      <header className={`${styles.header}`}>
        <div className={styles.searchInputHolder}>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`${styles.searchInput}`}
          />
          <CiSearch className={`${styles.icon}`} />
        </div>

        <NavLink to={"/dashboard/Settings"} style={{ color: "aliceblue" }}>
          <CiSettings className={`${styles.icon}`} />
        </NavLink>

        <div className={styles.profile}>
          <div className={styles.profile_content}>
            <div className={styles.pro_pic}>
              <img src={img} alt={"altImg"} />
            </div>
            <p className={styles.msg}>Dr.kawasaki</p>
            <FaCaretDown style={{ fontSize: "2em", color: "red" }} />
          </div>
        </div>
      </header>
    </nav>
  );
};

export default Header;
