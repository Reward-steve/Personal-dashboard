import * as React from "react";
import { useState, useEffect, ChangeEvent } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import style from "../../styles/Authpages.module.css";
import { FaHome } from "react-icons/fa";
import { Input } from "../Inputs";
import { useAuth } from "../../hooks/useAuth";
import { AuthHolder } from "../AuthHolder";
import { TogglePassword } from "../TogglePassword";
import { motion } from "framer-motion";
import logo from "../../assets/img/jwtLogo.jpg";

export interface LoginType {
  email: string;
  password: string;
}

interface ErrorType {
  response: { data: { message: string } };
}

export default function Login(): JSX.Element {
  const [next, setNext] = useState(false); // For toggling password reset
  const [error, setError] = useState<ErrorType | string>();
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<LoginType>({
    email: "",
    password: "",
  });

  useEffect(() => {
    document.title = next ? "Auth | Forgotten Password" : "Auth | Login";
  }, [next]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserLogin = async () => {
    setError("");
    if (!currentUser.email || !currentUser.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      await login(currentUser); // assumed working login function from useAuth hook
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
      if ((err as ErrorType)?.response?.data?.message) {
        setError((err as ErrorType).response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!currentUser.email) {
      setError("Enter your email to reset password");
      return;
    }

    try {
      setIsLoading(true);
      // Add your actual password reset logic here
      alert("Reset instructions sent to your email.");
    } catch (err) {
      console.error("Password Reset Error:", err);
      setError("Failed to send reset email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthHolder logo={logo}>
      <form
        className={style.loginForm}
        onSubmit={(e) => e.preventDefault()} // prevent default form submit
      >
        <div className={style.iconholder}>
          <h3>{next ? "Forgotten Password" : "Log in"}</h3>
          <Link to="/" className={style.homeIcon}>
            <FaHome size={20} />
          </Link>
        </div>

        <div className={style.authSection}>
          {error && (
            <p className={style.error} style={{ color: "red" }}>
              {typeof error === "string"
                ? error
                : error?.response?.data?.message || "Unexpected error occurred"}
            </p>
          )}

          <label>
            <Input
              nameTitle="Email Address"
              type="email"
              name="email"
              value={currentUser.email}
              placeholder="ayojackson@example.com"
              change={handleInputChange}
              errorMessage={
                typeof error === "string" &&
                error.toLowerCase().includes("email")
                  ? error
                  : ""
              }
            />
          </label>

          {!next && (
            <label>
              <TogglePassword
                password={currentUser.password}
                change={handleInputChange}
                errorMessage={
                  typeof error === "string" &&
                  error.toLowerCase().includes("password")
                    ? error
                    : ""
                }
              />
            </label>
          )}

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className={style.navlink}
            onClick={next ? handlePasswordReset : handleUserLogin}
            style={{
              textDecoration: "none",
              background: isLoading ? "#1e9eb2" : "#1e9ef4",
            }}
          >
            {isLoading
              ? next
                ? "Sending..."
                : "Logging in..."
              : next
              ? "Reset Password"
              : "Login"}
          </motion.button>
        </div>

        <label className={style.bottomText}>
          <p
            onClick={() => setNext(!next)}
            style={{
              color: "rgb(0 16 255)",
              width: "95%",
              padding: "10px",
              display: "flex",
              justifyContent: "end",
              cursor: "pointer",
            }}
          >
            {next ? "Back to Login" : "Forgotten password?"}
          </p>
        </label>

        <label className={style.bottomText}>
          <p>Need an account?</p>
          <NavLink style={{ color: "blue" }} to="/auth/signup">
            Sign up
          </NavLink>
        </label>
      </form>
    </AuthHolder>
  );
}
