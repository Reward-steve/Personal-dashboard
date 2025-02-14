import * as React from "react";
import styles from "../../styles/styledComponent.module.css";

interface GrayBgProps {
  children: React.ReactNode;
  width: string;
  height: string;
}

export default function GrayBg({ children, width, height }: GrayBgProps) {
  return (
    <>
      <div
        className={styles.container}
        style={{ width: width, height: height }}
      >
        {children}
      </div>
    </>
  );
}
