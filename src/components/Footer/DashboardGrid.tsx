// Layout/DashboardGrid.tsx
import React from "react";
import styles from "./../../styles/DashboardGrid.module.css";

interface DashboardGridProps {
  children: React.ReactNode;
}

const DashboardGrid: React.FC<DashboardGridProps> = ({ children }) => {
  return <div className={styles.grid}>{children}</div>;
};

export default DashboardGrid;
