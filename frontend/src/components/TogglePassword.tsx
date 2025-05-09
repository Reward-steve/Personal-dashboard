import { useState } from "react";
import { Input } from "./Inputs";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IconType } from "react-icons";
export function TogglePassword({
  password,
  change,
  errorMessage,
}: {
  password: string;
  change: React.ChangeEventHandler<HTMLInputElement>;
  errorMessage: string | undefined;
}) {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const PasswordIcon: IconType = hidePassword ? FaEye : FaEyeSlash;

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <Input
        nameTitle="Password"
        type={hidePassword ? "password" : "text"}
        name="password"
        placeholder="******************"
        value={password}
        change={change}
        errorMessage={errorMessage} // <-- pass error
      />
      <label
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "20px",
          position: "absolute",
          right: "35px",
          top: "55%",
          transform: "translateY(-50%)",
        }}
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <PasswordIcon
            onClick={() => setHidePassword(!hidePassword)}
            style={{
              color: "gray",
              fontSize: "1.3em",
              cursor: "pointer",
            }}
          />
        </motion.div>
      </label>
    </div>
  );
}
