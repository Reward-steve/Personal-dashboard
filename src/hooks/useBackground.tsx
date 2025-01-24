import { useContext } from "react";
import { BackgroundContext } from "../context/CreateBackground";
// Custom Hook to use Background Context

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error("useBackground must be used within a BackgroundProvider");
  }
};
