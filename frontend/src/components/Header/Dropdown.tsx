import React from "react";
import { motion } from "framer-motion";
import style from "../../styles/Header.module.css";
import img from "../../assets/img/profile.jpg";
import { CiSettings } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

const Dropdown: React.FC = () => {
  const dropdown = [
    {
      link: "/dashboard/Profile",
      message: "View profile",
      icon: <motion.img src={img} alt="profile_image" />,
    },
    {
      link: "/dashboard/Settings",
      message: "Settings",
      icon: <CiSettings className={style.icon} />,
    },
    { link: "/", message: "Logout", icon: <CiLogout className={style.icon} /> },
  ];
  return (
    <>
      <motion.ul
        whileInView={{
          height: "200px",
        }}
        className={style.dropdown}
      >
        {dropdown.map((el, i) => {
          return (
            <NavLink key={i} to={el.link} className={style.dropdownHolder}>
              <motion.li className={style.dropdown_content}>
                <div className={style.dropdown_img_holder}>{el.icon}</div>
                <p className={style.msg}> {el.message}</p>
              </motion.li>
            </NavLink>
          );
        })}
      </motion.ul>
    </>
  );
};

export default Dropdown;
