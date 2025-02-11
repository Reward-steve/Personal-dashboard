import * as React from "react";
import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import style from "../../styles/LoginPage.module.css";
import { motion } from "framer-motion";
import SocialIcons from "../../router/socialIcons";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IconType } from "react-icons";

export default function Login(): JSX.Element {
  const [hide, setHide] = useState<boolean>(true);
  const Icon: IconType = hide ? FaEye : FaEyeSlash;
  const hidePassword = useRef<HTMLInputElement>(null);

  const onclickHidePassword = () => {
    if (hidePassword.current) {
      hidePassword.current.type = hide ? "text" : "password";
    }
  };

  return (
    <form className={style.loginForm}>
      <h3>Log in</h3>
      <label>
        <input name="email" type="email" placeholder="Email address" required />
      </label>
      <label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          ref={hidePassword}
        />
        {
          <motion.div
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon
              style={{
                marginRight: "10px",
                color: "gray",
                fontSize: "1.5em",
                cursor: "pointer",
              }}
              onClick={() => {
                setHide(!hide);
                onclickHidePassword();
              }}
            />
          </motion.div>
        }
      </label>
      <label>
        <NavLink
          className={style.navlink}
          to="/dashboard/dashboard"
          style={{
            textDecoration: "none",
          }}
        >
          Login
        </NavLink>
      </label>
      <NavLink
        to="/signup"
        style={{
          color: "rgb(0 16 255)",
          width: " 80%",
          height: "10%",
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
        }}
      >
        Forgotten password
      </NavLink>
      <p>or log in with</p>
      <div className={style.socialLogin}>
        {SocialIcons.map((Icon, index: number) => {
          return (
            <motion.button
              key={index}
              className={style.socialLoginButton}
              whileTap={{ scale: 0.9 }}
              whileHover={{
                scale: 1.2,
                color: Icon.color,
                outline: `1px solid ${Icon.color}  `,
              }}
            >
              <Icon.icon key={index} />
            </motion.button>
          );
        })}
      </div>
      <NavLink to={"/Signup"} className={style.signup}>
        Need an account? Sign up
      </NavLink>
    </form>
  );
}
