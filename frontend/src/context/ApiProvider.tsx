import { useState, useEffect } from "react";
import { ApiContext } from "./createApi";
import axios from "axios";

export interface ApiContexType {
  message: string;
  data: string;
  isLoading: boolean;
  error: string;
}

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [message, setMessage] = useState<string>("");
  const [data, setData] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:5500/api/doctors")
      .then((res) => {
        setMessage(res.data.message);
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error fetching data");
        setIsLoading(false);
      });
  }, []);

  return (
    <ApiContext.Provider value={{ message, data, isLoading, error }}>
      {children}
    </ApiContext.Provider>
  );
};
