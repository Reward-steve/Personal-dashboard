import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LoginType, ErrorType, ValidationErrors } from "./types";
import { validateLoginForm } from "../../utils/validateForm";

export const useLoginLogic = () => {
  const [next, setNext] = useState(false);
  const [error, setError] = useState<ErrorType | string>();
  const [successMessage, setSuccessMessage] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [currentUser, setCurrentUser] = useState<LoginType>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { user, serverError, login, clearError } = useAuth();

  useEffect(() => {
    document.title = next ? "Auth | Forgotten Password" : "Auth | Login";
  }, [next]);

  // Navigate when user logs in
  useEffect(() => {
    if (user) {
      switch (user.role) {
        case "Admin":
          navigate("/admin/dashboard");
          break;
        case "Patient":
          navigate("/patient/dashboard");
          break;
        case "Doctor":
          navigate("/doctor/dashboard");
          break;
      }
    }
  }, [user, navigate, serverError]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentUser((prev) => ({ ...prev, [name]: value }));
    clearError();
  };

  const handleUserLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(undefined);
    const errors = validateLoginForm(currentUser, next);
    setValidationErrors(errors || {});

    if (errors && Object.keys(errors).length > 0) {
      setError("Please fix the errors before continuing.");
      return;
    }

    try {
      setIsLoading(true);
      await login(currentUser);
    } catch (err) {
      const errorMessage =
        (err as ErrorType)?.response?.data?.message ||
        (err as Error).message ||
        "Something went wrong. Please try again.";
      setError(errorMessage || serverError);
      console.error("Login Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setError(undefined);
    setSuccessMessage(""); // clear previous

    const errors = validateLoginForm(currentUser, next);
    setValidationErrors(errors || {});

    if (errors && Object.keys(errors).length > 0) return;

    try {
      setIsLoading(true);
      // Ideally: await api call here
      setSuccessMessage("Reset instructions sent to your email.");
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
    serverError,
    isLoading,
    currentUser,
    handleInputChange,
    handleUserLogin,
    handlePasswordReset,
    validationErrors,
    successMessage,
    setSuccessMessage,
    setError,
  };
};
