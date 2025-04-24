import * as React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import style from "../../styles/LoginPage.module.css";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IconType } from "react-icons";
import { Input } from "../Inputs";
import { useAuth } from "../../hooks/useAuth";

export interface LoginType {
  email: string;
  password: string;
}

export default function Login(): JSX.Element {
  const [hide, setHide] = useState<boolean>(true);
  const [next, setNext] = useState<boolean>(false);

  const { login } = useAuth();

  const [currentUser, setCurrentUser] = useState<LoginType>({
    email: "",
    password: "",
  });

  const Icon: IconType = hide ? FaEye : FaEyeSlash;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserLogin = async (): Promise<void> => {
    try {
      if (!currentUser.email || !currentUser.password) {
        alert("Please fill in all fields");
        return;
      }
      await login({
        email: currentUser.email,
        password: currentUser.password,
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <form className={style.loginForm}>
      {!next ? <h3>Log in</h3> : <h3>Forgotten Password</h3>}
      {!next ? (
        <>
          <Input
            name="email"
            type="email"
            value={currentUser.email}
            placeholder="Email address"
            change={handleInputChange}
          />
          <label>
            <input
              name="password"
              type={hide ? "password" : "text"}
              value={currentUser.password}
              placeholder="Password"
              onChange={handleInputChange}
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
                  onClick={() => setHide(!hide)}
                />
              </motion.div>
            }
          </label>
          <label>
            <div
              className={style.navlink}
              onClick={handleUserLogin}
              style={{
                textDecoration: "none",
              }}
            >
              Login
            </div>
          </label>
        </>
      ) : (
        <>
          <Input
            name="email"
            type="email"
            value={currentUser.email}
            placeholder="Email address"
            change={handleInputChange}
          />
          <label>
            <div
              className={style.navlink}
              onClick={handleUserLogin}
              style={{
                textDecoration: "none",
              }}
            >
              Reset Password
            </div>
          </label>
        </>
      )}
      <p
        onClick={() => setNext(!next)}
        style={{
          color: "rgb(0 16 255)",
          width: " 80%",
          height: "10%",
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        {!next ? "Forgotten password" : "Login"}
      </p>
      <p>or log in with</p>

      <NavLink to={"/Signup"} className={style.signup}>
        Need an account? Sign up
      </NavLink>
    </form>
  );
}
