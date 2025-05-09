import { createContext } from "react";
export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// Create the context
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
