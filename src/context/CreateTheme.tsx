import { createContext } from "react";
import { ThemeContextType } from "./ThemeContext";

// Create the context
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
