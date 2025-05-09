import { useContext } from "react";
import { ThemeContextType } from "./CreateTheme";
import { ThemeContext } from "./CreateTheme";

// Custom hook for using the context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
