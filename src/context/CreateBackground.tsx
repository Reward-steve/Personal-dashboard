import { BackgroundContextProps } from "./BackgroundContext";
import { createContext } from "react";
// Default Context Value
export const BackgroundContext = createContext<
  BackgroundContextProps | undefined
>(undefined);
