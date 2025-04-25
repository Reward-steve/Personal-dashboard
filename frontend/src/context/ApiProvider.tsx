import { useState } from "react";
import { ApiContext } from "./createApi";
import apiClient from "../utils/apiClient";
import axios from "axios";

export interface ApiContexType {
  message: string;
  data: object | null;
  isLoading: boolean;
  error: { message: string };
  api: (
    method: string,
    url: string,
    body?: object
  ) => Promise<{
    data: object;
    message: string;
    stats: object;
    status: string;
  }>;
}

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [message, setMessage] = useState<string>("");
  const [data, setData] = useState<object | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ message: string }>({ message: "" });

  const api = async (method: string, url: string, body?: object) => {
    setIsLoading(true);
    try {
      const response = await apiClient.request({ method, url, data: body });

      setMessage((await response.data.message) || "success");
      setData(await response.data);
      setError({ message: "" });
      return response.data;
    } catch (error: string | unknown) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "An unknown error occured";

      setError(await errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ApiContext.Provider value={{ message, data, isLoading, error, api }}>
      {children}
    </ApiContext.Provider>
  );
};
