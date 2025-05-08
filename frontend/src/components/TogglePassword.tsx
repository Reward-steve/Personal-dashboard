import { useState } from "react";
import { Input } from "./Inputs";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IconType } from "react-icons";

export function TogglePassword({
  password,
  change,
}: {
  password: string;
  change: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const PasswordIcon: IconType = hidePassword ? FaEye : FaEyeSlash;

  return (
    <>
      <Input
        nameTitle="Password"
        type={hidePassword ? "password" : "text"}
        name="password"
        placeholder="******************"
        value={password}
        change={change}
      />
      <label
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "20px",
          position: "relative",
          bottom: "-11px",
          left: "-50px",
        }}
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <PasswordIcon
            onClick={() => setHidePassword(!hidePassword)}
            style={{
              color: "gray",
              fontSize: "1.5em",
              cursor: "pointer",
            }}
          />
        </motion.div>
      </label>
    </>
  );
}
