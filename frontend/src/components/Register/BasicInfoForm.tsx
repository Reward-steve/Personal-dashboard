import { motion } from "framer-motion";
import { TogglePassword } from "../TogglePassword";
import { Input } from "../Inputs";
import style from "../../styles/Authpages.module.css";
import { BasicInfoProps } from "../../types/SignupFormProps";

export const BasicForm = ({ change, value, errors, step }: BasicInfoProps) => {
  return (
    <div className={style.authSection}>
      <label>
        <Input
          nameTitle="First Name"
          type="text"
          name="firstname"
          placeholder="Jackson David"
          value={value.firstname}
          change={change}
          errorMessage={errors.firstname}
        />
        <Input
          nameTitle="Last Name"
          type="text"
          name="lastname"
          placeholder="Ayomideh"
          value={value.lastname}
          change={change}
          errorMessage={errors.lastname}
        />
      </label>
      <Input
        nameTitle="Username"
        type="text"
        name="username"
        placeholder="Jackson David Ayomideh"
        value={value.username}
        change={change}
        errorMessage={errors.username}
      />

      <label>
        <TogglePassword
          password={value.password}
          change={change}
          errorMessage={errors.password}
        />
        <Input
          nameTitle="Email Address"
          type="email"
          name="email"
          placeholder="***@example.com"
          value={value.email}
          change={change}
          errorMessage={errors.email}
        />
      </label>

      <div className={style.genderGroup}>
        <div className={style.gender}>
          {errors.gender && <p className={style.errorText}>{errors.gender}</p>}
          <div className={style.genderLabel}>
            Male
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={value.gender === "Male"}
              onChange={change}
            />
          </div>
          <div className={style.genderLabel}>
            Female
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={value.gender === "Female"}
              onChange={change}
            />
          </div>
        </div>
      </div>

      <Input
        nameTitle="Date of Birth"
        type="date"
        name="dateOfBirth"
        value={value.dateOfBirth}
        change={change}
        errorMessage={errors.dateOfBirth}
      />

      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        className={style.navlink}
        style={{ background: "#1e9ef4", marginTop: "10px" }}
        onClick={step}
      >
        Next
      </motion.button>
    </div>
  );
};
