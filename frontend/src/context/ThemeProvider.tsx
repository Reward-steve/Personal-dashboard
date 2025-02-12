import React, { useState } from "react";
import { ThemeContext } from "./CreateTheme";

// Define the shape of the context
export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// Create the provider
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
