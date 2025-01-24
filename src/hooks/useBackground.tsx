import { useContext } from "react";
import { BackgroundContextProps } from "../context/BackgroundContext";
import { BackgroundContext } from "../context/CreateBackground";
// Custom Hook to use Background Context

export const useBackground = (): BackgroundContextProps => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error("useBackground must be used within a BackgroundProvider");
  }
  return context;
};
