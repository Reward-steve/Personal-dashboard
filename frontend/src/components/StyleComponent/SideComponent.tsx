import * as React from "react";
import style from "../../styles/styledComponent.module.css"; // Import the CSS module for styling

interface SideComponentProps {
  children: React.ReactNode; // Content can be any React component or text
}

const SideComponent: React.FC<SideComponentProps> = ({ children }) => {
  return (
    <>
      <main className={style.background}>{children}</main>
    </>
  );
};

export default React.memo(SideComponent);
