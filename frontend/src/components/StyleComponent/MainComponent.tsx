import * as React from "react";
import style from "../../styles/styledComponent.module.css";

export default function MainComponent({ children }: React.PropsWithChildren) {
  return (
    <>
      <div className={style.mainContent}>{children}</div>
    </>
  );
}
