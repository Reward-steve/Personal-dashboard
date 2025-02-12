import { createContext } from "react";
import { ThemeContextType } from "./ThemeProvider";

// Create the context
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
