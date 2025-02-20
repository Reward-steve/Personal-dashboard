import React from "react";
import { motion } from "framer-motion";
import style from "../../styles/Header.module.css";
import img from "../../assets/img/jwtLogo.jpg";
import { CiLogout } from "react-icons/ci";

const Dropdown: React.FC = () => {
  return (
    <>
      <motion.ul
        whileInView={{
          height: "240px",
          width: "250px",
          background: "#1e3a5f",
          backdropFilter: " blur(15px)",
        }}
        className={style.dropdown}
      >
        <motion.li className={style.dropdown_content}>
          <div className={style.dropdown_img_holder}>
            <motion.img src={img} alt="k" />
          </div>
          <p className={style.msg}> {"View Profile"}</p>
        </motion.li>
        <motion.li className={style.dropdown_content}>
          <div className={style.dropdown_img_holder}>
            <motion.img src={img} alt="k" />
          </div>
          <p className={style.msg}> {"View Profile"}</p>
        </motion.li>
        <motion.li className={style.dropdown_content}>
          <div className={style.dropdown_img_holder}>
            <CiLogout fontSize="1.5em" />
          </div>
          <p className={style.msg}>{"Log Out"}</p>
        </motion.li>
      </motion.ul>
    </>
  );
};

export default Dropdown;
