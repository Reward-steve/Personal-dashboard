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
    relationship: string;
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

  // **Reusable onChange handler**
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuth = async () => {
    const {
      name,
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

    if (
      name &&
      email &&
      password &&
      dateOfBirth &&
      gender &&
      country &&
      city &&
      state &&
      street &&
      emergencyName &&
      emergencyPhone &&
      relationship
    ) {
      await api(
        {
          name,
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
        },
        "POST",
        "auth/register"
      );
    }
  };

  const PasswordIcon: IconType = hidePassword ? FaEye : FaEyeSlash;
  const passwordRef = useRef<HTMLInputElement>(null);

  const togglePasswordVisibility = () => {
    if (passwordRef.current) {
      passwordRef.current.type = hidePassword ? "text" : "password";
      setHidePassword(!hidePassword);
    }
  };

  return (
    <form className={style.loginForm}>
      <h3>Sign Up</h3>

      {!next ? (
        <>
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={userInfo.name}
            change={handleInputChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email address"
            value={userInfo.email}
            change={handleInputChange}
          />
          <label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userInfo.password}
              onChange={handleInputChange}
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
                onClick={togglePasswordVisibility}
              />
            </motion.div>
          </label>
          <label style={{ color: "gray", padding: "15px" }}>
            <h4>Gender:</h4>
            <label>
              <span>Male</span>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={userInfo.gender === "Male"}
                onChange={handleInputChange}
              />
            </label>
            <label>
              <span>Female</span>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={userInfo.gender === "Female"}
                onChange={handleInputChange}
              />
            </label>
          </label>
          <label style={{ color: "gray", padding: "0 15px" }}>
            <h4>D.O.B:</h4>
            <Input
              type="date"
              name="dateOfBirth"
              placeholder="D.O.B"
              value={userInfo.dateOfBirth}
              change={handleInputChange}
            />
          </label>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className={style.navlink}
            onClick={() => setNext(true)}
          >
            Next
          </motion.button>
        </>
      ) : (
        <>
          <Input
            type="text"
            name="country"
            placeholder="Country"
            value={userInfo.country}
            change={handleInputChange}
          />
          <Input
            type="text"
            name="state"
            placeholder="State"
            value={userInfo.state}
            change={handleInputChange}
          />
          <Input
            type="text"
            name="city"
            placeholder="City"
            value={userInfo.city}
            change={handleInputChange}
          />
          <Input
            type="text"
            name="street"
            placeholder="Street"
            value={userInfo.street}
            change={handleInputChange}
          />
          <p style={{ margin: 7 }}> Emergency Contact Information</p>
          <Input
            type="text"
            name="emergencyName"
            placeholder="Emergency Contact Name"
            value={userInfo.emergencyName}
            change={handleInputChange}
          />
          <select
            name="relationship"
            required
            value={userInfo.relationship}
            onChange={handleInputChange}
          >
            <option disabled value="">
              Relationship
            </option>
            <option value="Parent">Parent</option>
            <option value="Sibling">Sibling</option>
            <option value="Spouse">Spouse</option>
            <option value="Friend">Friend</option>
            <option value="Other">Other</option>
          </select>
          <Input
            type="number"
            name="emergencyPhone"
            placeholder="Phone Number"
            value={userInfo.emergencyPhone}
            change={handleInputChange}
          />
          <NavLink className={style.navlink} onClick={handleAuth} to="/">
            Signup
          </NavLink>
        </>
      )}

      <p>or sign up with</p>
      <NavLink to={"/"} className={style.signup}>
        Already have an account? Log in
      </NavLink>
    </form>
  );
}
