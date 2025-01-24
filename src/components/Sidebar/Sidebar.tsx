import styles from "./../../styles/Sidebar.module.css"; // Import your CSS module
import { NavLink } from "react-router-dom";
import { GiPowerButton } from "react-icons/gi";
import navLinkRouter from "../../router/sidebarRoutes";
import { useTheme } from "../../hooks/useTheme";

const Sidebar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <aside
      className={`${styles.sidebar} ${
        isDarkMode ? styles.darkMode : styles.lightMode
      }`}
    >
      <div className={styles.navContainer}>
        <h2 className={styles.title}>Navigation</h2>
        <ul className={styles.navList}>
          {navLinkRouter.map((route, id) => {
            return (
              <NavLink
                className={`${styles.navlink} ${
                  isDarkMode ? styles.darkMode : styles.lightMode
                }`}
                key={id}
                to={route.to}
              >
                {<route.icon className={styles.icon} />}
                <span className={styles.navName}>{route.name}</span>
              </NavLink>
            );
          })}
        </ul>
        <div onClick={toggleTheme} className={`${styles.button}`}>
          <GiPowerButton
            className={`${isDarkMode ? styles.lightMode : styles.darkMode}`}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
