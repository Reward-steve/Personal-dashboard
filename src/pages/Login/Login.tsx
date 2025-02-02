import * as React from "react";
import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import style from "../../styles/LoginPage.module.css";
import logo from "../../assets/img/medical-team.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IconType } from "react-icons";
import { motion } from "framer-motion";
import SocialIcons from "../../router/socialIcons";

export default function Login() {
  const [hide, setHide] = useState<boolean>(true);
  const hidePassword = useRef<HTMLInputElement>(null);

  const Icon: IconType = hide ? FaEye : FaEyeSlash;

  const onclickHidePassword = () => {
    if (hidePassword.current) {
      hidePassword.current.type = hide ? "text" : "password";
    }
  };

  return (
    <div className={style.loginPageBackground}>
      <h2>Joveth Temple of Health (JWT)</h2>

      <main className={style.loginPage}>
        <section className={style.loginpageIntro}>
          <div className={style.logo}>
            <img src={logo} alt="logo" />
          </div>
          <p>
            Discover the power of personalized health insights and seamless
            tracking with Joveth Temple of Health
          </p>
        </section>

        <form className={style.loginForm}>
          <h3>Log in</h3>
          <label>
            <input
              name="email"
              type="email"
              placeholder="Email address"
              required
            />
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
            {SocialIcons.map((icon: IconType, index: number) => {
              const IconComponent = icon;
              return (
                <button className={style.socialLoginButton} key={index}>
                  <IconComponent key={index} />
                </button>
              );
            })}
          </div>
          <NavLink to={"/"} className={style.signup}>
            Need an account? Sign up
          </NavLink>
        </form>
      </main>
    </div>
  );
}
