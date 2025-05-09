import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LoginType, ErrorType } from "./types";

export const useLoginLogic = () => {
  const [next, setNext] = useState(false);
  const [error, setError] = useState<ErrorType | string>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const [currentUser, setCurrentUser] = useState<LoginType>({
    email: "",
    password: "",
  });

  useEffect(() => {
    document.title = next ? "Auth | Forgotten Password" : "Auth | Login";
  }, [next]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserLogin = async () => {
    setError("");
    if (!currentUser.email || !currentUser.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      await login(currentUser);
      navigate("/dashboard");
    } catch (err) {
      if ((err as ErrorType)?.response?.data?.message) {
        setError((err as ErrorType).response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!currentUser.email) {
      setError("Enter your email to reset password");
      return;
    }

    try {
      setIsLoading(true);
      alert("Reset instructions sent to your email.");
    } catch (err) {
      setError("Failed to send reset email.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    next,
    setNext,
    error,
    isLoading,
    currentUser,
    handleInputChange,
    handleUserLogin,
    handlePasswordReset,
  };
};
