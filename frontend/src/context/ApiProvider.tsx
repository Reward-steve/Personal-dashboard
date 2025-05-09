import { useReducer, useCallback } from "react";
import { ApiContext } from "../hooks/createApi";
import { apiReducer, initialState } from "../hooks/apiReducer";
import apiClient from "../utils/apiClient";
import axios from "axios";

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(apiReducer, initialState);

  const api = useCallback(
    async (method: string, url: string, body?: object) => {
      dispatch({ type: "LOADING" });
      try {
        const response = await apiClient.request({ method, url, data: body });

        dispatch({
          type: "SUCCESS",
          payload: {
            data: response.data,
            message: response.data.message || "Success",
          },
        });

        return response.data;
      } catch (err: unknown) {
        const errorMessage =
          axios.isAxiosError(err) && err.response?.data?.message
            ? err.response.data.message
            : "An unknown error occurred";
        dispatch({ type: "ERROR", payload: errorMessage });
        return null;
      }
    },
    []
  );

  return (
    <ApiContext.Provider
      value={{
        message: state.message,
        data: state.data,
        isLoading: state.isLoading,
        error: state.error,
        api,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
