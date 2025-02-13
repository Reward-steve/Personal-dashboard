import * as React from "react";
import styles from "../../styles/styledComponent.module.css";

interface GrayBgProps {
  children: React.ReactNode;
  width: string;
}

export default function GrayBg({ children, width }: GrayBgProps) {
  return (
    <>
      <div className={styles.container} style={{ width: width }}>
        {children}
      </div>
    </>
  );
}
