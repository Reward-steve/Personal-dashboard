import React from "react";
import styles from "./../../styles/styledComponent.module.css"; // Import the CSS module

import SideComponent from "./SideComponent";
import MainComponent from "./MainComponent";
const PageIntro: React.FC = () => {
  return (
    <div className={styles.container}>
      <main className={styles.mainHolder}>
        <MainComponent>
          <h1>Welcome to Our Website</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac urna
            ipsum. Donec quis lectus vel neque efficitur bibendum.
          </p>
        </MainComponent>
      </main>
      <aside>
        <SideComponent>
          <h2>Sidebar</h2>
          <p>Some content goes here</p>
        </SideComponent>
      </aside>
    </div>
  );
};
export default PageIntro;
