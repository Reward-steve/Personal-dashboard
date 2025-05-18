import { useEffect, useState } from "react";
import { AuthContext } from "../hooks/AuthContext";
import { userType } from "../types/User";
import apiClient from "../utils/apiClient";
import { RiLoader2Fill } from "react-icons/ri";
import { ErrorType } from "../components/Login/types";

export interface AuthContextType {
  user: userType | null; // Changed undefined to null for initial state consistency
  serverError: ErrorType | string;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
  clearError: () => void;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<userType | null>(null); // Initialized to null
  const [serverError, setServerError] = useState<ErrorType | string>(""); // Initialized to null
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const clearError = () => setServerError("");

  const verifyAuthWithProtectedEndpoint = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`auth/check-auth`);
      if (response.status === 200 && response.data.user) {
        setIsAuthenticated(true);
        setUser(response.data.user);
        console.log(response.data.user.role);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      console.error(
        "Authentication check via protected endpoint failed:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const response = await apiClient.post("/auth/login", { email, password });

      if (response?.status?.toString().startsWith("4")) {
        setServerError(response.data?.message || "Login failed.");
        return;
      }

      if (response.status === 200 && response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        console.log("🚀 User logged in:", response.data.user.role);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        console.warn("❌ Login successful but no user data returned");
      }
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response &&
        err.response.data &&
        typeof err.response.data === "object" &&
        "message" in err.response.data
      ) {
        errorMessage =
          (err.response.data as { message?: string }).message || errorMessage;
      }
      setServerError(errorMessage);

      console.error("Login failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true); // Set loading to true on logout start
    if (!user?._id) {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }
    try {
      await apiClient.post(`/auth/logout/${user?._id}`);
      setUser(null);
      setIsAuthenticated(false);
      console.log("🚪User logged out");
    } catch (err) {
      console.warn("Logout request failed:", err);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await verifyAuthWithProtectedEndpoint();
    };
    fetchData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        serverError,
        login,
        logout,
        isAuthenticated,
        loading,
        clearError,
      }}
    >
      {!loading && children}
      {loading && (
        <div>
          <RiLoader2Fill size={30} />
        </div>
      )}
    </AuthContext.Provider>
  );
};
