import React from "react";
import { useState } from "react";
import styles from "./../../styles/Header.module.css"; // Import the CSS module
import { CiSearch } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa6";
import img from "../../assets/img/jwtLogo.jpg";
import Dropdown from "./Dropdown";

const Header: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);
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

        {/* <NavLink to={"/dashboard/profile"}> */}
        <div className={styles.profile}>
          <div className={styles.profile_content}>
            <div className={styles.pro_pic}>
              <img src={img} alt={"altImg"} />
            </div>
            <p className={styles.msg}>
              Dr.kawasaki
              <p style={{ color: "gray", fontSize: "15px" }}>
                view your profile
              </p>
            </p>

            <FaCaretDown
              style={{ fontSize: "1em", color: "white" }}
              onClick={() => {
                setActive(!active);
              }}
            />
            {active && <Dropdown />}
          </div>
        </div>
        {/* </NavLink> */}
      </header>
    </nav>
  );
};

export default Header;
