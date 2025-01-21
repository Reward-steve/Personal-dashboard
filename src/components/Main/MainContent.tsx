import React from "react";
import styles from "./../../styles/MainContent.module.css"; // Import the CSS module
import { MainContentProps } from "./../../types/mainContent"; // Import the interface

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return <main className={styles.mainContent}>{children}</main>;
};

export default MainContent;
