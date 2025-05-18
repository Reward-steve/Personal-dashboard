import { motion } from "framer-motion";
import { Input } from "../Inputs";
import style from "../../styles/Authpages.module.css";
import { DetailsFormProps } from "../../types/SignupFormProps";

export const DetailsForm = ({
  change,
  value,
  errors,
  step,
  isLoading,
}: DetailsFormProps) => {
  return (
    <div className={style.authSection}>
      <label>
        <Input
          nameTitle="Country"
          type="text"
          name="country"
          placeholder="Nigeria"
          value={value.country}
          change={change}
          errorMessage={errors.country}
        />
        <Input
          nameTitle="State"
          type="text"
          name="state"
          placeholder="Lagos State"
          value={value.state}
          change={change}
          errorMessage={errors.state}
        />
      </label>
      <label>
        <Input
          nameTitle="City"
          type="text"
          name="city"
          placeholder="Lagos"
          value={value.city}
          change={change}
          errorMessage={errors.city}
        />
        <Input
          nameTitle="Street"
          type="text"
          name="street"
          placeholder="No.3 Okoko miko"
          value={value.street}
          change={change}
          errorMessage={errors.street}
        />
      </label>
      <label>
        <Input
          nameTitle="Emergency Number"
          type="number"
          name="emergencyPhone"
          placeholder="+234 80 980 67 213"
          value={value.emergencyPhone}
          change={change}
          errorMessage={errors.emergencyPhone}
        />
        <Input
          nameTitle="Emergency Contact Name"
          type="text"
          name="emergencyName"
          placeholder="Dandison Evelyn"
          value={value.emergencyName}
          change={change}
          errorMessage={errors.emergencyName}
        />
      </label>
      <select name="relationship" value={value.relationship} onChange={change}>
        <option disabled value="">
          Relationship
        </option>
        <option value="Parent">Parent</option>
        <option value="Sibling">Sibling</option>
        <option value="Spouse">Spouse</option>
        <option value="Friend">Friend</option>
        <option value="Other">Other</option>
      </select>
      {errors.relationship && (
        <p style={{ color: "red", marginTop: "4px" }}>{errors.relationship}</p>
      )}

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "15px",
          width: "100%",
        }}
      >
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className={style.navlink}
          style={{ background: "gray" }}
          onClick={step}
        >
          Prev
        </motion.button>
        <button
          type="submit"
          className={style.navlink}
          disabled={isLoading}
          style={{ background: "#1e9ef4" }}
        >
          {isLoading ? "Registering..." : "Sign Up"}
        </button>
      </div>
    </div>
  );
};
