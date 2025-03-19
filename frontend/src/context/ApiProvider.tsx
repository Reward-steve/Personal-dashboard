import { useState } from "react";
import { ApiContext } from "./createApi";

export interface ApiContexType {
  message: string;
  data: object | null;
  isLoading: boolean;
  error: { message: string };
  api: (body: object, method: string, urlRoute: string) => Promise<void>;
}

const API_URL = "http://localhost:5000/api/v1/";

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [message, setMessage] = useState<string>("");
  const [data, setData] = useState<object | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ message: string }>({ message: "" });

  const api = async (body: object, method: string, urlRoute: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}${urlRoute}`, {
        method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! ${response.status}`);
      }

      const data = await response.json();
      setMessage(data.message);
      setData(data);
    } catch (error) {
      setError({
        message: error instanceof Error ? error.message : "Unknown error",
      });
      setIsLoading(false);
    }
  };

  return (
    <ApiContext.Provider value={{ message, data, isLoading, error, api }}>
      {children}
    </ApiContext.Provider>
  );
};
