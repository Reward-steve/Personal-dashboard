import * as React from "react";
import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import style from "../../styles/LoginPage.module.css";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IconType } from "react-icons";
import { Input } from "../Inputs";
import { useApi } from "../../hooks/useApi";

export interface LoginType {
  email: string;
  password: string;
}

export default function Login(): JSX.Element {
  const [hide, setHide] = useState<boolean>(true);
  const [next, setNext] = useState<boolean>(false);
  const Icon: IconType = hide ? FaEye : FaEyeSlash;
  const hidePassword = useRef<HTMLInputElement>(null);

  const { api } = useApi();

  const [currentUser, setCurrentUser] = useState<LoginType>({
    email: "",
    password: "",
  });

  const OnchangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentUser((c) => ({ ...c, email: e.target.value }));
  };
  const OnchangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentUser((c) => ({ ...c, password: e.target.value }));
  };

  const handleUserLogin = async () => {
    if (currentUser.email && currentUser.password) {
      await api(
        { email: currentUser.email, password: currentUser.password },
        "POST",
        "auth/login"
      );
    }
  };

  const onclickHidePassword = () => {
    if (hidePassword.current) {
      hidePassword.current.type = hide ? "text" : "password";
    }
  };

  return (
    <form className={style.loginForm}>
      <h3>Log in</h3>
      {!next ? (
        <>
          {" "}
          <Input
            type="email"
            value={currentUser.email}
            placeholder="Email address"
            change={OnchangeEmail}
          />
          <label>
            <input
              name="password"
              type="password"
              value={currentUser.password}
              placeholder="Password"
              onChange={OnchangePassword}
              ref={hidePassword}
            />

            {
              <motion.div
                whileHover={{
                  scale: 1.1,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon
                  style={{
                    marginRight: "10px",
                    color: "gray",
                    fontSize: "1.5em",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setHide(!hide);
                    onclickHidePassword();
                  }}
                />
              </motion.div>
            }
          </label>
          <label>
            <NavLink
              className={style.navlink}
              to="/dashboard/dashboard"
              onClick={handleUserLogin}
              style={{
                textDecoration: "none",
              }}
            >
              Login
            </NavLink>
          </label>
        </>
      ) : (
        <>
          <Input
            type="email"
            value={currentUser.email}
            placeholder="Email address"
            change={OnchangeEmail}
          />
          <label>
            <NavLink
              className={style.navlink}
              to="/dashboard/dashboard"
              onClick={handleUserLogin}
              style={{
                textDecoration: "none",
              }}
            >
              Reset Password
            </NavLink>
          </label>
        </>
      )}
      <NavLink
        to="/"
        onClick={() => setNext(!next)}
        style={{
          color: "rgb(0 16 255)",
          width: " 80%",
          height: "10%",
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
        }}
      >
        Forgotten password
      </NavLink>
      <p>or log in with</p>

      <NavLink to={"/Signup"} className={style.signup}>
        Need an account? Sign up
      </NavLink>
    </form>
  );
}
