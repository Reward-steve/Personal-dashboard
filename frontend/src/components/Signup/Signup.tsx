import * as React from "react";
import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import style from "../../styles/LoginPage.module.css";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IconType } from "react-icons";
import { Input } from "../Inputs";
import { useApi } from "../../hooks/useApi";

export interface UserTypes {
  name: string;
  email: string;
  password: string;
  gender: string;
  dateOfBirth: string;
  address: {
    country: string;
    state: string;
    city: string;
    street: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: { enum: ["Parent", "Sibling", "Spouse", "Friend", "Other"] };
  };
}

export default function SignUp(): JSX.Element {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [next, setNext] = useState<boolean>(false);
  const { api } = useApi();

  const [userInfo, setUserInfo] = useState({
    name: "",
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

  const OnchangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((i) => ({ ...i, name: e.target.value }));
  };
  const OnchangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((i) => ({ ...i, email: e.target.value }));
  };
  const OnchangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((i) => ({ ...i, password: e.target.value }));
  };
  const OnchangeGender = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((i) => ({ ...i, gender: e.target.value }));
  };
  const OnchangeDateOfBirth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((i) => ({ ...i, dateOfBirth: e.target.value }));
  };
  const OnchangeCountryAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((i) => ({ ...i, country: e.target.value }));
  };
  const OnchangeCityAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((i) => ({ ...i, city: e.target.value }));
  };
  const OnchangeStreetAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((i) => ({ ...i, street: e.target.value }));
  };
  const OnchangeStateAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((i) => ({ ...i, state: e.target.value }));
  };
  const OnchangeEmergencyInfoName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserInfo((i) => ({ ...i, emergencyName: e.target.value }));
  };
  const OnchangeEmergencyInfoPhone = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserInfo((i) => ({ ...i, emergencyPhone: e.target.value }));
  };
  const OnchangeRelationship = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserInfo((i) => ({ ...i, relationship: e.target.value }));
  };

  const handleAuth = async () => {
    if (
      userInfo.name &&
      userInfo.email &&
      userInfo.password &&
      userInfo.dateOfBirth &&
      userInfo.gender &&
      userInfo.country &&
      userInfo.city &&
      userInfo.state &&
      userInfo.street &&
      userInfo.emergencyName &&
      userInfo.emergencyPhone &&
      userInfo.relationship
    ) {
      await api(
        {
          name: userInfo.name,
          email: userInfo.email,
          password: userInfo.password,
          dateOfBirth: userInfo.dateOfBirth,
          gender: userInfo.gender,
          address: {
            country: userInfo.country,
            state: userInfo.state,
            street: userInfo.street,
            city: userInfo.city,
          },
          emergencyContact: {
            name: userInfo.emergencyName,
            phone: userInfo.emergencyPhone,
            relationship: userInfo.relationship,
          },
        },
        "POST",
        "auth/register"
      );
    }
  };

  const PasswordIcon: IconType = hidePassword ? FaEye : FaEyeSlash;

  const passwordRef = useRef<HTMLInputElement>(null);

  const togglePasswordVisibility = (
    ref: React.RefObject<HTMLInputElement>,
    hideState: boolean,
    setHideState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (ref.current) {
      ref.current.type = hideState ? "text" : "password";
      setHideState(!hideState);
    }
  };

  return (
    <form className={style.loginForm}>
      <h3>Sign Up</h3>

      {!next ? (
        <>
          <Input
            type="text"
            placeholder="Full Name"
            value={userInfo.name}
            change={OnchangeName}
          />

          <Input
            type="email"
            placeholder="Email address"
            value={userInfo.email}
            change={OnchangeEmail}
          />

          <label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={userInfo.password}
              onChange={OnchangePassword}
              ref={passwordRef}
              required
            />
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <PasswordIcon
                style={{
                  marginRight: "10px",
                  color: "gray",
                  fontSize: "1.5em",
                  cursor: "pointer",
                }}
                onClick={() =>
                  togglePasswordVisibility(
                    passwordRef,
                    hidePassword,
                    setHidePassword
                  )
                }
              />
            </motion.div>
          </label>
          <label style={{ color: "gray", padding: "15px" }}>
            <h4>Gender:</h4>
            <label>
              <span>Male</span>
              <input
                type="radio"
                value={"Male"}
                checked={userInfo.gender === "Male"}
                onChange={OnchangeGender}
              />
            </label>

            <label>
              <span>Female</span>
              <br />
              <input
                type="radio"
                value={"Female"}
                checked={userInfo.gender === "Female"}
                onChange={OnchangeGender}
              />
            </label>
          </label>
          <label style={{ color: "gray", padding: "0 15px" }}>
            <h4>D.O.B:</h4>
            <Input
              type="date"
              placeholder="D.O.B"
              value={userInfo.dateOfBirth}
              change={OnchangeDateOfBirth}
            />
          </label>
          <label>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className={style.navlink}
              onClick={() => setNext(!next)}
            >
              Next
            </motion.button>
          </label>
        </>
      ) : (
        <>
          <label>
            <Input
              type="text"
              placeholder="Country"
              value={userInfo.country}
              change={OnchangeCountryAddress}
            />
            <Input
              type="text"
              placeholder="State"
              value={userInfo.state}
              change={OnchangeStateAddress}
            />
          </label>
          <label>
            <Input
              type="text"
              placeholder="City"
              value={userInfo.city}
              change={OnchangeCityAddress}
            />
            <Input
              type="text"
              placeholder="Street"
              value={userInfo.street}
              change={OnchangeStreetAddress}
            />
          </label>
          <p style={{ margin: 7 }}> Emergency Contact Information</p>
          <label>
            <Input
              type="text"
              placeholder="name"
              value={userInfo.emergencyName}
              change={OnchangeEmergencyInfoName}
            />
            <label>
              <select
                name="role"
                required
                value={userInfo.relationship}
                onChange={OnchangeRelationship}
              >
                <option disabled selected>
                  Relationship
                </option>
                <option value="Parent">Parent</option>
                <option value="Sibling">Sibling</option>
                <option value="Spouse">Spouse</option>
                <option value="Friend">Friend</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </label>
          <Input
            type="number"
            placeholder="Phone Number"
            value={userInfo.emergencyPhone}
            change={OnchangeEmergencyInfoPhone}
          />
          <label>
            <NavLink
              className={style.navlink}
              onClick={handleAuth}
              to="/"
              style={{
                textDecoration: "none",
              }}
            >
              Signup
            </NavLink>
          </label>
        </>
      )}

      <p>or sign up with</p>

      <NavLink to={"/"} className={style.signup}>
        Already have an account? Log in
      </NavLink>
    </form>
  );
}
