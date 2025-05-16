import { motion } from "framer-motion";
import styles from "./../../styles/Sidebar.module.css"; // Import your CSS module
import { NavLink } from "react-router-dom";
import navLinkRouter from "../Admin/Sidebardata";
import { IoMenu } from "react-icons/io5"; // Toggle icon

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <motion.aside
      className={styles.sidebar}
      animate={{ width: sidebarOpen ? "5%" : "15%" }} // Slide animation
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <motion.div>
        <button
          className={styles.toggleButton}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <IoMenu size={24} />
        </button>

        <h3 className={`${styles.title}`}>
          {sidebarOpen ? " JTH" : "Joveth Temple of Health"}
        </h3>
      </motion.div>
      <div className={styles.navContainer}>
        <ul className={styles.navList}>
          {navLinkRouter.map((route, id) => (
            <motion.li
              key={id}
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink className={styles.navlink} to={route.to}>
                {<route.icon className={styles.icon} title={route.name} />}
                {!sidebarOpen && (
                  <span className={styles.navName}>{route.name}</span>
                )}
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
