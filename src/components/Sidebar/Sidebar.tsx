import styles from "./../../styles/Sidebar.module.css"; // Import your CSS module
import theme from "./../../styles/Theme.module.css";
import { NavLink } from "react-router-dom";
import { GiPowerButton } from "react-icons/gi";
import navLinkRouter from "../../router/sidebarRoutes";
import { useTheme } from "../../hooks/useTheme";

const Sidebar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <aside
      className={`${styles.sidebar} ${
        isDarkMode ? theme.darkMode : theme.lightMode
      }`}
    >
      <div className={styles.navContainer}>
        <h2 className={styles.title}>Navigation</h2>
        <ul className={styles.navList}>
          {navLinkRouter.map((route, id) => {
            return (
              <NavLink
                className={`${styles.navlink} ${
                  isDarkMode ? theme.darkMode : theme.lightMode
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
        <button
          onClick={toggleTheme}
          className={`${styles.button} ${
            isDarkMode ? theme.lightMode : theme.darkMode
          }`}
        >
          <GiPowerButton />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
