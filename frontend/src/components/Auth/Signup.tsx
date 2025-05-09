import * as React from "react";
import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import style from "../../styles/Authpages.module.css";
import { FaHome } from "react-icons/fa";
import { useApi } from "../../hooks/useApi";
import handleInputChange from "../../utils/handleInputChange";
import { AuthHolder } from "../AuthHolder";
import logo from "../../assets/img/jwtLogo.jpg";
import { BasicForm } from "../Signup/BasicInfoForm";
import { DetailsForm } from "../Signup/DetailsForm";

export default function SignUp(): JSX.Element {
  document.title = "Auth | Signup";

  const [step, setStep] = useState<"basic" | "details">("basic");
  const [err, setErr] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { api, error, isLoading } = useApi();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    gender: "",
    dateOfBirth: "",
    country: "",
    state: "",
    city: "",
    street: "",
    emergencyName: "",
    emergencyPhone: "",
    relationship: "",
  });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      firstname,
      lastname,
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

    const isValid =
      firstname &&
      lastname &&
      email &&
      password &&
      gender &&
      dateOfBirth &&
      country &&
      state &&
      city &&
      street &&
      emergencyName &&
      emergencyPhone &&
      relationship;

    if (!isValid) {
      setErr("Please fill in all fields.");
      return;
    }
    const newErrors: Record<string, string> = {};

    if (!firstname) newErrors.firstname = "First name is required.";
    if (!lastname) newErrors.lastname = "Last name is required.";
    if (!email || !/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Valid email is required.";
    if (!password || password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (!gender) newErrors.gender = "Please select your gender.";
    if (!dateOfBirth) newErrors.dateOfBirth = "Date of birth is required.";
    if (!country) newErrors.country = "Country is required.";
    if (!state) newErrors.state = "State is required.";
    if (!city) newErrors.city = "City is required.";
    if (!street) newErrors.street = "Street is required.";
    if (!emergencyName)
      newErrors.emergencyName = "Emergency contact name is required.";
    if (!emergencyPhone || emergencyPhone.length < 11)
      newErrors.emergencyPhone = "Valid emergency phone is required.";
    if (!relationship) newErrors.relationship = "Please select a relationship.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setErr("Please fix the highlighted errors.");
      return;
    } else {
      setErrors({});
      setErr("");
    }

    await api("POST", "auth/register", {
      firstname,
      lastname,
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

    if (!error) {
      navigate("/auth/login");
    } else {
      setErr(error || "An error occurred during signup.");
    }
  };

  return (
    <AuthHolder logo={logo}>
      <form onSubmit={handleAuth} className={style.loginForm}>
        <div className={style.iconholder}>
          <h3>Sign Up</h3>
          <Link to="/" className={style.homeIcon}>
            <FaHome size={20} />
          </Link>
        </div>

        {err && (
          <p
            className={style.error}
            style={{ color: "red", marginBottom: "10px" }}
          >
            {err}
          </p>
        )}

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
