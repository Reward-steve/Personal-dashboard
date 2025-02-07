import React from "react";
import styles from "./../../styles/styledComponent.module.css"; // Import the CSS module
import { PageIntroProps } from "../../router/mainRoutes";

const PageIntro: React.FC<PageIntroProps> = React.memo(
  ({ title, description }) => {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <header>
            <h1>Welcome {title}</h1>
          </header>
          <section>
            <p>{description}</p>
          </section>
        </main>
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.title === nextProps.title &&
    prevProps.description === nextProps.description
);
export default PageIntro;
