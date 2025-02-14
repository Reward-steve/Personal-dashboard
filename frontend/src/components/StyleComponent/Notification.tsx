import * as React from "react";
import style from "../../styles/styledComponent.module.css";
import SideComponent from "./SideComponent";

// import { motion } from "framer-motion";

interface NotificationProps {
  image: string;
  altImg: string;
  message: string;
}

export default function Notification({
  image,
  altImg,
  message,
}: NotificationProps) {
  return (
    <>
      <SideComponent width={"100%"} pad="5px 10px">
        <div className={style.notify}>
          <div className={style.img_holder}>
            <img src={image} alt={altImg} />
          </div>
          <p className={style.msg}>{message}</p>
        </div>
      </SideComponent>
    </>
  );
}
