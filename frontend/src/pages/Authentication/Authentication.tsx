import * as React from "react";
import { Outlet } from "react-router-dom";
import style from "../../styles/LoginPage.module.css";
import logo from "../../assets/img/medical-team.png";

export default function Authentication() {
  return (
    <div className={style.loginPageBackground}>
      <main className={style.loginPage}>
        <div className={style.flex_form}>
          <section className={style.loginpageIntro}>
            <h2>Joveth Temple of Health (JTH)</h2>
            <div className={style.logo}>
              <img src={logo} alt="logo" />
            </div>
            <p>
              Discover the power of personalized health insights and seamless
              tracking with Joveth Temple of Health
            </p>
          </section>
        </div>
        <div className={style.flex_form}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
