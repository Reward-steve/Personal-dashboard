import * as React from "react";
import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import style from "../../styles/LoginPage.module.css";
import logo from "../../assets/img/medical-team.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IconType } from "react-icons";

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
            <input name="email" type="email" placeholder="Email address" />
          </label>
          <label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              ref={hidePassword}
            />
            {
              <Icon
                style={{
                  marginRight: "10px",
                  color: "gray",
                  fontSize: "2em",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setHide(!hide);
                  onclickHidePassword();
                }}
              />
            }
          </label>
          <label>
            <NavLink
              to="/dashboard/dashboard"
              style={{
                textDecoration: "none",
              }}
            >
              Login
            </NavLink>
          </label>
        </form>
      </main>
    </div>
  );
}
