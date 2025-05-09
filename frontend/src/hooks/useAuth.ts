import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { AuthContextType } from "../context/AuthProvider";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within the AuthProvider");
  }
  return context;
};
