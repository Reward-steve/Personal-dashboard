import styles from "./../../styles/Sidebar.module.css"; // Import your CSS module
import { NavLink } from "react-router-dom";
import navLinkRouter from "../../router/sidebarRoutes";

const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.navContainer}>
        <h2 className={styles.title}>Navigation</h2>
        <ul className={styles.navList}>
          {navLinkRouter.map((route, id) => {
            return (
              <NavLink className={styles.navlink} key={id} to={route.to}>
                {<route.icon className={styles.icon} />}
                <span className={styles.navName}>{route.name}</span>
              </NavLink>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
