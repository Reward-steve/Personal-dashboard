import * as React from "react";
import { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import style from "../../styles/LoginPage.module.css";
import { FaHome } from "react-icons/fa";
import { Input } from "../Inputs";
import { useAuth } from "../../hooks/useAuth";
import { AuthHolder } from "../../pages/Authentication/AuthHolder";
import { TogglePassword } from "../TogglePassword";
import logo from "../../assets/img/medical-team.png";

export interface LoginType {
  email: string;
  password: string;
}

interface ErrorType {
  response: { data: { message: string } };
}

export default function Login(): JSX.Element {
  const [next, setNext] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | string>();
  const [isLoading, setIsLoading] = useState(false);

  const { user, login } = useAuth();

  document.title = !next ? "Auth | Login" : "Auth | Forgotten Password";
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<LoginType>({
    email: "",
    password: "",
  });

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
    <AuthHolder logo={logo}>
      <form className={style.loginForm}>
        <div className={style.iconholder}>
          {!next ? <h3>Log in</h3> : <h3>Forgotten Password</h3>}
          <Link to={"#"} className={style.homeIcon}>
            <FaHome size={20} />
          </Link>
        </div>
        {!next ? (
          <div
            style={{
              background: "aliceblue",
              width: "90%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px 0",
              borderRadius: "10px",
              height: "100%",
            }}
          >
            {error && (
              <p style={{ color: "red" }} className={style.error}>
                {typeof error === "string"
                  ? error
                  : "An unexpected error occured"}
              </p>
            )}
            <label>
              <Input
                nameTitle="Email Address"
                name="email"
                type="email"
                value={currentUser.email}
                placeholder="ayojackson@example.com"
                change={handleInputChange}
              />
            </label>
            <label>
              <TogglePassword
                password={currentUser.password}
                change={handleInputChange}
              />
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
          </div>
        ) : (
          <div
            style={{
              background: "aliceblue",
              width: "90%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px 0",
              borderRadius: "10px",
            }}
          >
            <label>
              <Input
                nameTitle="Email Address"
                name="email"
                type="email"
                value={currentUser.email}
                placeholder="ayojackson@example.com"
                change={handleInputChange}
              />
            </label>
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
          </div>
        )}
        <label>
          <p
            onClick={() => setNext(!next)}
            style={{
              color: "rgb(0 16 255)",
              width: "95%",
              padding: "10px",
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            {!next ? "Forgotten password" : "Login"}
          </p>
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "start",
            width: "90%",
            justifyContent: "space-between",
            height: "50px",
          }}
        >
          <p>Need an account? </p>
          <NavLink style={{ color: "blue" }} to={"/auth/signup"}>
            Sign up
          </NavLink>
        </label>
      </form>
    </AuthHolder>
  );
}
