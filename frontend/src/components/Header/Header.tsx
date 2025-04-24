import { useState } from "react";
import styles from "./../../styles/Header.module.css";
import img from "../../assets/img/jwtLogo.jpg";
import { FaBell, FaSearch } from "react-icons/fa";
import Dropdown from "./Dropdown";

interface countType {
  count: string;
}

const Header = ({ count }: countType) => {
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
            style={{ padding: "10px", border: "1px solid black" }} // Added inline styles
          />
          <FaSearch size={25} />
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
                width: "70%",
              }}
            >
              visit profile
              <h4 className={styles.msg}>Dr.kawasaki</h4>
            </li>

            {active && <Dropdown />}
          </ul>
        </div>
        <div className={styles.icon}>
          <div className={styles.notification}>{count}</div>
          <FaBell size={25} />
        </div>
      </header>
    </nav>
  );
};

export default Header;
