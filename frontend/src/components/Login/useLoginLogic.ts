import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LoginType, ErrorType, ValidationErrors } from "./types";
import { validateLoginForm } from "../../utils/validateForm";

export const useLoginLogic = () => {
  const [next, setNext] = useState(false);
  const [error, setError] = useState<ErrorType | string>();
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

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
    const errors = validateLoginForm(currentUser, next);
    setValidationErrors(errors || {});

    if (errors) {
      setError("Please fix the errors before continuing.");
      return;
    }

    try {
      setIsLoading(true);
      await login(currentUser);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
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
    setError("");
    const errors = validateLoginForm(currentUser, next);
    setValidationErrors(errors || {});

    if (errors) return;

    try {
      setIsLoading(true);
      alert("Reset instructions sent to your email.");
    } catch (err) {
      console.error("Password Reset Error:", err);
      setError("Failed to send reset email.");
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
    validationErrors,
  };
};
