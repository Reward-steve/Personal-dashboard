import * as React from "react";
import style from "../../styles/styledComponent.module.css";

export default function SideComponent({ children }: React.PropsWithChildren) {
  return (
    <>
      <main className={style.background}>{children}</main>
    </>
  );
}
