import { useContext } from "react";
import { ApiContexType } from "../context/ApiProvider";
import { ApiContext } from "../context/createApi";

// Custom hook for using the context
export const useApi = (): ApiContexType => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
