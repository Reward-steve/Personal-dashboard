import { createContext } from "react";

export interface ApiContextType {
  message: string;
  data: object | null;
  isLoading: boolean;
  error: string;
  api: (
    method: string,
    url: string,
    body?: object
  ) => Promise<{
    data: object;
    message: string;
    stats: object;
    status: string;
  } | null>;
}

export const ApiContext = createContext<ApiContextType | undefined>(undefined);
