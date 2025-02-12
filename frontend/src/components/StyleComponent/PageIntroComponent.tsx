import React from "react";
import styles from "./../../styles/styledComponent.module.css"; // Import the CSS module
import { PageIntroProps } from "../../router/mainRoutes";
import SideComponent from "./SideComponent";

const PageIntro: React.FC<PageIntroProps> = React.memo(({ children }) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>{children}</main>

      <SideComponent />
    </div>
  );
});
export default PageIntro;
