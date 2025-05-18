import * as React from "react";
import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import style from "../../styles/Authpages.module.css";
import { FaHome } from "react-icons/fa";
import { useApi } from "../../hooks/useApi";
import handleInputChange from "../../utils/handleInputChange";
import { AuthHolder } from "../AuthHolder";
import { BasicForm } from "./BasicInfoForm";
import { DetailsForm } from "./DetailsForm";
import { validateSignup } from "../../utils/validateSignup";
import { initialUserInfo } from "../../constants/initialUserInfo";

export default function SignUp(): JSX.Element {
  document.title = "Auth | Signup";

  const [step, setStep] = useState<"basic" | "details">("basic");
  const [err, setErr] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [userInfo, setUserInfo] = useState(initialUserInfo);

  const { api, error, isLoading, message } = useApi();

  useEffect(() => {
    if (error) {
      setErr(error);
    }
  }, [error]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setErrors({});

    const validationErrors = validateSignup(userInfo);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setErr("Please fix the highlighted errors.");
      return;
    }

    const {
      firstname,
      lastname,
      username,
      email,
      password,
      gender,
      dateOfBirth,
      country,
      state,
      city,
      street,
      emergencyName,
      emergencyPhone,
      relationship,
    } = userInfo;

    await api("POST", "auth/register", {
      firstname,
      lastname,
      username,
      email,
      password,
      dateOfBirth,
      gender,
      address: { country, state, city, street },
      emergencyContact: {
        name: emergencyName,
        phone: emergencyPhone,
        relationship,
      },
    });

    setUserInfo(initialUserInfo);
  };

  return (
    <AuthHolder>
      <form
        onSubmit={handleAuth}
        className={style.loginForm}
        aria-labelledby="signup-heading"
      >
        <div className={style.iconholder}>
          <h3 id="signup-heading">Sign Up</h3>
          <Link to="/" className={style.homeIcon} aria-label="Go to homepage">
            <FaHome size={20} />
          </Link>
        </div>

        {err && (
          <p
            className={style.error}
            role="alert"
            style={{ color: "red", marginBottom: "10px" }}
          >
            {err}
          </p>
        )}

        {message && (
          <p role="status" style={{ color: "green", marginBottom: "10px" }}>
            {message}
          </p>
        )}

        {/* Use semantic fieldsets for grouping form inputs */}
        <section aria-live="polite">
          {step === "basic" ? (
            <BasicForm
              change={(e) => handleInputChange(e, setUserInfo)}
              value={userInfo}
              errors={errors}
              step={() => setStep("details")}
            />
          ) : (
            <DetailsForm
              change={(e) => handleInputChange(e, setUserInfo)}
              value={userInfo}
              errors={errors}
              step={() => setStep("basic")}
              isLoading={isLoading}
            />
          )}
        </section>

        <label className={style.bottomText}>
          <p>Already have an account?</p>
          <NavLink style={{ color: "blue" }} to="/auth/login">
            Log in
          </NavLink>
        </label>
      </form>
    </AuthHolder>
  );
}
