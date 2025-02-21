import React from "react";
import { motion } from "framer-motion";
import style from "../../styles/Header.module.css";
import img from "../../assets/img/jwtLogo.jpg";
import { CiSettings } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

const Dropdown: React.FC = () => {
  return (
    <>
      <motion.ul
        whileInView={{
          height: "200px",
        }}
        className={style.dropdown}
      >
        <NavLink to={"/dashboard/Settings"} className={style.dropdownHolder}>
          <motion.li className={style.dropdown_content}>
            <div className={style.dropdown_img_holder}>
              <motion.img src={img} alt="k" />
            </div>
            <p className={style.msg}> {"View Profile"}</p>
          </motion.li>
        </NavLink>
        <NavLink to={"/dashboard/Settings"} className={style.dropdownHolder}>
          <motion.li className={style.dropdown_content}>
            <div className={style.dropdown_img_holder}>
              <CiSettings className={style.icon} />
            </div>
            <p className={style.msg}> {"Settings"}</p>
          </motion.li>
        </NavLink>
        <NavLink to={"/"} className={style.dropdownHolder}>
          <motion.li className={style.dropdown_content}>
            <div className={style.dropdown_img_holder}>
              <CiLogout className={style.icon} />
            </div>
            <p className={style.msg}>{"Log Out"}</p>
          </motion.li>
        </NavLink>
      </motion.ul>
    </>
  );
};

export default Dropdown;
