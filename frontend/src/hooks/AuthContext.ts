import { createContext } from "react";
import { AuthContextType } from "../context/AuthProvider";
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
