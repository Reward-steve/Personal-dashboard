import { createContext } from "react";
import { AuthContextType } from "./AuthProvider";
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
