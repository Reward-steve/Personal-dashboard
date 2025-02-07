import * as React from "react";
import style from "../../styles/Page.module.css";

const SignupForm: React.FC = () => {
  return (
    <>
      <form className={style.form}>
        <h1 style={{ color: "#007bff", height: "10%", margin: "10px 0" }}>
          Fill out this form
        </h1>

        <label>Name:</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name..."
          className={style.inputs}
        />
        <br />

        <label>Email:</label>
        <br />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email..."
          className={style.inputs}
        />
        <br />

        <label>Password:</label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password..."
          className={style.inputs}
        />
        <br />

        <label>Date of birth:</label>
        <br />
        <input type="date" id="date" name="date" className={style.inputs} />
        <br />

        <br />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: " #007bff",
            color: "white",
            border: "none",
            borderRadius: " 3px",
          }}
        >
          Submit
        </button>
      </form>
    </>
  );
};
export default SignupForm;
