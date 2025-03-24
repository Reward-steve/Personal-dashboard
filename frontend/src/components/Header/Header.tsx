import { useState } from "react";
import styles from "./../../styles/Header.module.css";
import img from "../../assets/img/jwtLogo.jpg";
import { FaBell } from "react-icons/fa";
import Dropdown from "./Dropdown";
interface countType {
  count: string;
}
const Header = ({ count }: countType) => {
  const [active, setActive] = useState<boolean>(false);

  return (
    <nav>
      <header className={`${styles.header}`}>
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
