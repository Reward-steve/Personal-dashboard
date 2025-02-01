import * as React from "react";
import { NavLink } from "react-router-dom";
import style from "../../styles/LoginPage.module.css";

export default function Login() {
  return (
    <div className={style.loginPageBackground}>
      <h2>Joveth Temple of Health</h2>

      <main className={style.loginPage}>
        <section className={style.loginpageIntro}>
          <p>
            Discover the power of personalized health insights and seamless
            tracking with Joveth Temple of Health
          </p>
        </section>

        <form className={style.loginForm}>
          <h3>Log in</h3>
          <NavLink
            to="/dashboard/home"
            style={{
              textDecoration: "none",
              color: "midnightblue",
            }}
          >
            Login
          </NavLink>
        </form>
      </main>
    </div>
  );
}
