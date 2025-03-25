import * as React from "react";
import style from "../../styles/styledComponent.module.css";
// import { motion } from "framer-motion";

interface SideComponentProps {
  children: React.ReactNode;
  width: string;
  pad?: string;
}

export default function SideComponent({
  children,
  width,
  pad,
}: SideComponentProps) {
  return (
    <>
      <main style={{ width: width, padding: pad }} className={style.background}>
        {children}
      </main>
    </>
  );
}
