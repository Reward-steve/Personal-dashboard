import * as React from "react";
import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import style from "../../styles/LoginPage.module.css";
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";
import { Input } from "../Inputs";
import { useApi } from "../../hooks/useApi";
import handleInputChange from "../../utils/handleInputChange";
import { AuthHolder } from "../AuthHolder";
import { TogglePassword } from "../TogglePassword";
import logo from "../../assets/img/jwtLogo.jpg";

export default function SignUp(): JSX.Element {
  document.title = "Auth | Signup";

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

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
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
      await api("POST", "auth/register", {
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
      navigate("auth/login");
      console.log(userInfo);
      // setErr(error.message);
      console.log(error);
      setErr(error);
    } else {
      setErr(error);
    }
  };

  return (
    <AuthHolder logo={logo}>
      <form onSubmit={handleAuth} className={style.loginForm}>
        <div className={style.iconholder}>
          <h3>Sign Up</h3>
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
            }}
          >
            <label>
              <Input
                nameTitle="Full Name"
                type="text"
                name="name"
                placeholder="Ayomideh Jackson David"
                value={userInfo.name}
                change={(e) => handleInputChange(e, setUserInfo)}
              />
            </label>
            <label>
              <Input
                nameTitle="Email Address"
                type="email"
                name="email"
                placeholder="ayojackson@example.com"
                value={userInfo.email}
                change={(e) => handleInputChange(e, setUserInfo)}
              />
            </label>
            <label>
              <TogglePassword
                password={userInfo.password}
                change={(e) => handleInputChange(e, setUserInfo)}
              />
            </label>
            <label>
              {/* <h4>Gender:</h4> */}
              <div className={style.gender}>
                <Input
                  nameTitle="Male"
                  type="radio"
                  name="gender"
                  value="Male"
                  placeholder="Male"
                  check={userInfo.gender === "Male"}
                  change={(e) => handleInputChange(e, setUserInfo)}
                />

                <Input
                  nameTitle="Female"
                  type="radio"
                  name="gender"
                  value="Female"
                  placeholder="Female"
                  check={userInfo.gender === "Female"}
                  change={(e) => handleInputChange(e, setUserInfo)}
                />
              </div>
            </label>

            <Input
              nameTitle="Date of Birth"
              type="date"
              name="dateOfBirth"
              placeholder="D.O.B"
              value={userInfo.dateOfBirth}
              change={(e) => handleInputChange(e, setUserInfo)}
            />

            <label>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className={style.navlink}
                onClick={() => setNext(true)}
                style={{ background: "#1e9ef4" }}
              >
                Next
              </motion.button>
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
            {err && (
              <p className={style.error} style={{ color: "red" }}>
                {err}
              </p>
            )}
            <label>
              <Input
                nameTitle="Country"
                type="text"
                name="country"
                placeholder="Nigeria"
                value={userInfo.country}
                change={(e) => handleInputChange(e, setUserInfo)}
              />
              <Input
                nameTitle="State"
                type="text"
                name="state"
                placeholder="Lagos State"
                value={userInfo.state}
                change={(e) => handleInputChange(e, setUserInfo)}
              />
            </label>
            <label>
              <Input
                nameTitle="City"
                type="text"
                name="city"
                placeholder="Lagos"
                value={userInfo.city}
                change={(e) => handleInputChange(e, setUserInfo)}
              />
              <Input
                nameTitle="Street"
                type="text"
                name="street"
                placeholder="No.3 Okoko miko"
                value={userInfo.street}
                change={(e) => handleInputChange(e, setUserInfo)}
              />
            </label>

            <label>
              <Input
                nameTitle="Emergency Number"
                type="number"
                name="emergencyPhone"
                placeholder="+234 80 980 67 213"
                value={userInfo.emergencyPhone}
                change={(e) => handleInputChange(e, setUserInfo)}
              />

              <Input
                nameTitle="Emergency Contact Name"
                type="text"
                name="emergencyName"
                placeholder="Dandison Evelyn"
                value={userInfo.emergencyName}
                change={(e) => handleInputChange(e, setUserInfo)}
              />
            </label>
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
            <label>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className={style.navlink}
                style={{ background: "#1e9ef4" }}
                onClick={() => setNext(!true)}
              >
                Prev
              </motion.button>
              <button
                className={style.navlink}
                onClick={handleAuth}
                style={{ background: "#1e9ef4" }}
              >
                {isLoading ? "Signup..." : "   Signup"}
              </button>
            </label>
          </div>
        )}

        <label
          style={{
            display: "flex",
            alignItems: "start",
            width: "90%",
            justifyContent: "space-between",
            height: "50px",
          }}
        >
          <p>Already have an account?</p>

          <NavLink style={{ color: "blue" }} to={"/auth/login"}>
            Log in
          </NavLink>
        </label>
      </form>
    </AuthHolder>
  );
}
