import * as React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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

interface ErrorType {
  response: { data: { message: string } };
}

export default function Login(): JSX.Element {
  const [hide, setHide] = useState<boolean>(true);
  const [next, setNext] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | string>();
  const [isLoading, setIsLoading] = useState(false);

  const { user, login } = useAuth();

  const navigate = useNavigate();

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
      setIsLoading(true);
      if (!currentUser.email || !currentUser.password) {
        setError("Please fill in all fields");
        return;
      }
      await login({
        email: currentUser.email,
        password: currentUser.password,
      });

      if (user) {
        navigate("/*");
        setError("");
      }
    } catch (error: unknown) {
      console.error("Error:", error);
      if ((error as ErrorType)?.response?.data?.message) {
        setError((error as ErrorType).response.data.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={style.loginForm}>
      {!next ? <h3>Log in</h3> : <h3>Forgotten Password</h3>}
      {!next ? (
        <>
          {error && (
            <p style={{ color: "red" }} className={style.error}>
              {typeof error === "string"
                ? error
                : "An unexpected error occured"}
            </p>
          )}
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
            <button
              disabled={isLoading}
              className={style.navlink}
              onClick={handleUserLogin}
              style={{
                textDecoration: "none",
                background: `${isLoading ? "#1e9eb2" : "#1e9ef4"}`,
              }}
            >
              {isLoading ? "Loging in..." : "Login"}
            </button>
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
                background: "#1e9ef4",
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

      <NavLink to={"/auth/signup"} className={style.signup}>
        Need an account? Sign up
      </NavLink>
    </form>
  );
}
