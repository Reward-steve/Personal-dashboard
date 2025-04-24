import { useState } from "react";
import styles from "./../../styles/Header.module.css";
import img from "../../assets/img/profile.jpg";
import { FaSearch } from "react-icons/fa";
import Dropdown from "./Dropdown";

const Header = () => {
  const [active, setActive] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <nav>
      <header className={`${styles.header}`}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onClick={() => setInputValue("")}
            placeholder="Search for anything"
            className={styles.searchInput}
          />
          <FaSearch size={18} cursor={"pointer"} />
        </div>

        <div
          className={styles.profile}
          onClick={() => {
            setActive(!active);
          }}
        >
          <ul className={styles.profile_content}>
            <li className={styles.pro_pic}>
              <img src={img} alt={"altImg"} />
            </li>

            <li
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              visit profile
              <p className={styles.msg}>Mr. Reward_St</p>
            </li>

            {active && <Dropdown />}
          </ul>
        </div>
      </header>
    </nav>
  );
};

export default Header;
