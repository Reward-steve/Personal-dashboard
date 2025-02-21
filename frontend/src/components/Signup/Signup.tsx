import * as React from "react";
import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import style from "../../styles/LoginPage.module.css";
import { motion } from "framer-motion";
import SocialIcons from "../../router/socialIcons";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IconType } from "react-icons";

export default function SignUp(): JSX.Element {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState<boolean>(true);

  const PasswordIcon: IconType = hidePassword ? FaEye : FaEyeSlash;
  const ConfirmPasswordIcon: IconType = hideConfirmPassword
    ? FaEye
    : FaEyeSlash;

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

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

      <label>
        <input name="fullName" type="text" placeholder="Full Name" required />
      </label>

      <label>
        <input name="email" type="email" placeholder="Email address" required />
      </label>

      <label>
        <select name="role" required>
          <option value="" disabled selected>
            Select Role
          </option>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>
      </label>

      <label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          ref={passwordRef}
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

      <label>
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          ref={confirmPasswordRef}
        />
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <ConfirmPasswordIcon
            style={{
              marginRight: "10px",
              color: "gray",
              fontSize: "1.5em",
              cursor: "pointer",
            }}
            onClick={() =>
              togglePasswordVisibility(
                confirmPasswordRef,
                hideConfirmPassword,
                setHideConfirmPassword
              )
            }
          />
        </motion.div>
        <NavLink
          className={style.navlink}
          to="/dashboard/dashboard"
          style={{
            textDecoration: "none",
          }}
        >
          Signup
        </NavLink>
      </label>

      <p>or sign up with</p>

      <div className={style.socialLogin}>
        {SocialIcons.map((Icon, index: number) => (
          <motion.button
            key={index}
            className={style.socialLoginButton}
            whileTap={{ scale: 0.9 }}
            whileHover={{
              scale: 1.2,
              color: Icon.color,
              outline: `1px solid ${Icon.color}`,
            }}
          >
            <Icon.icon key={index} />
          </motion.button>
        ))}
      </div>

      <NavLink to={"/"} className={style.signup}>
        Already have an account? Log in
      </NavLink>
    </form>
  );
}
