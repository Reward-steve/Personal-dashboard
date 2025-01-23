import * as React from "react";
import { ComponentProps } from "../../router/mainRoutes";
import styles from "./../../styles/HomePage.module.css";
import { useTheme } from "../../hooks/useTheme";

const Profile: React.FC<ComponentProps> = ({ name }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={styles.body}>
      <section
        className={`${styles.content} ${
          isDarkMode ? styles.darkMode : styles.lightMode
        }`}
      >
        <h1>Welcome {name}</h1>
      </section>
    </div>
  );
};
export default Profile;
