import style from "../../styles/LoginPage.module.css";
import logo from "../../assets/img/medical-team.png";

export function AuthHolder({ children }: { children: React.ReactNode }) {
  return (
    <main className={style.loginPageBackground}>
      <div className={style.loginpageholder}>{children}</div>
      <main className={style.flex_form}>
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
      </main>
    </main>
  );
}
