import * as React from "react";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import style from "../../styles/LoginPage.module.css";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IconType } from "react-icons";
import { Input } from "../Inputs";
import { useApi } from "../../hooks/useApi";
import handleInputChange from "../../utils/handleInputChange";

export default function SignUp(): JSX.Element {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [next, setNext] = useState<boolean>(false);
  const [err, setErr] = useState("");
  const { api, error, isLoading } = useApi();
  const navigate = useNavigate();

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
      const res = await api("POST", "auth/register", {
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
      });
      if (res) navigate("/dashboard/admin");
    } else {
      setErr(error.message || "All fields are required");
    }
  };

  const PasswordIcon: IconType = hidePassword ? FaEye : FaEyeSlash;

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
            change={(e) => handleInputChange(e, setUserInfo)}
          />

          <Input
            type="email"
            name="email"
            placeholder="Email address"
            value={userInfo.email}
            change={(e) => handleInputChange(e, setUserInfo)}
          />
          <label>
            <input
              type={hidePassword ? "password" : "text"}
              name="password"
              placeholder="Password"
              value={userInfo.password}
              onChange={(e) => handleInputChange(e, setUserInfo)}
              required
            />
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <PasswordIcon
                onClick={() => setHidePassword(!hidePassword)}
                style={{
                  marginRight: "10px",
                  color: "gray",
                  fontSize: "1.5em",
                  cursor: "pointer",
                }}
              />
            </motion.div>
          </label>
          <label style={{ color: "gray", padding: "15px" }}>
            <h4>Gender:</h4>
            <div className={style.flex_form}>
              <p>Male</p>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={userInfo.gender === "Male"}
                onChange={(e) => handleInputChange(e, setUserInfo)}
              />

              <p>Female</p>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={userInfo.gender === "Female"}
                onChange={(e) => handleInputChange(e, setUserInfo)}
              />
            </div>
          </label>
          <label style={{ color: "gray", padding: "0 15px" }}>
            <h4>D.O.B:</h4>
            <Input
              type="date"
              name="dateOfBirth"
              placeholder="D.O.B"
              value={userInfo.dateOfBirth}
              change={(e) => handleInputChange(e, setUserInfo)}
            />
          </label>
          <label>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className={style.navlink}
              onClick={() => setNext(true)}
            >
              Next
            </motion.button>
          </label>
        </>
      ) : (
        <>
          {err && (
            <p className={style.error} style={{ color: "red" }}>
              {err}
            </p>
          )}
          <label>
            <Input
              type="text"
              name="country"
              placeholder="Country"
              value={userInfo.country}
              change={(e) => handleInputChange(e, setUserInfo)}
            />
            <Input
              type="text"
              name="state"
              placeholder="State"
              value={userInfo.state}
              change={(e) => handleInputChange(e, setUserInfo)}
            />
          </label>
          <label>
            <Input
              type="text"
              name="city"
              placeholder="City"
              value={userInfo.city}
              change={(e) => handleInputChange(e, setUserInfo)}
            />
            <Input
              type="text"
              name="street"
              placeholder="Street"
              value={userInfo.street}
              change={(e) => handleInputChange(e, setUserInfo)}
            />
          </label>
          <p style={{ margin: 7 }}> Emergency Contact Information</p>
          <Input
            type="text"
            name="emergencyName"
            placeholder="Emergency Contact Name"
            value={userInfo.emergencyName}
            change={(e) => handleInputChange(e, setUserInfo)}
          />
          <label>
            <label>
              <select
                name="relationship"
                required
                value={userInfo.relationship}
                onChange={(e) => handleInputChange(e, setUserInfo)}
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
            </label>
            <Input
              type="number"
              name="emergencyPhone"
              placeholder="Phone Number"
              value={userInfo.emergencyPhone}
              change={(e) => handleInputChange(e, setUserInfo)}
            />
          </label>
          <label>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className={style.navlink}
              onClick={() => setNext(!true)}
            >
              Prev
            </motion.button>
            <button className={style.navlink} onClick={handleAuth}>
              {isLoading ? "Signup..." : "   Signup"}
            </button>
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
