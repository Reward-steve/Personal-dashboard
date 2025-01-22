import styles from "./../../styles/Sidebar.module.css"; // Import your CSS module
import theme from "./../../styles/Theme.module.css";
import { NavLink } from "react-router-dom";
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
                className={isDarkMode ? theme.darkMode : theme.lightMode}
                key={id}
                to={route.to}
              >
                {route.name}
              </NavLink>
            );
          })}
        </ul>
        <button onClick={toggleTheme}>
          Switch to {isDarkMode ? "Light" : "Dark"} Mode
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
