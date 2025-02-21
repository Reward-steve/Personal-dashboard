import React from "react";
import { useState } from "react";
import styles from "./../../styles/Header.module.css"; // Import the CSS module
import { CiSearch } from "react-icons/ci";
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
          <CiSearch className={`${styles.icon}`} />
        </div>

        <div
          className={styles.profile}
          onClick={() => {
            setActive(!active);
          }}
        >
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

            <FaCaretDown style={{ fontSize: "1em", color: "white" }} />
            {active && <Dropdown />}
          </div>
        </div>
      </header>
    </nav>
  );
};

export default Header;
