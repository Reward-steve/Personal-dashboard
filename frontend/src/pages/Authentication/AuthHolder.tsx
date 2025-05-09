import style from "../../styles/LoginPage.module.css";

export function AuthHolder({
  children,
  logo,
}: {
  children: React.ReactNode;
  logo: string;
}) {
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
