import { createContext } from "react";
import { ApiContexType } from "./ApiProvider";

export const ApiContext = createContext<ApiContexType | undefined>(undefined);
