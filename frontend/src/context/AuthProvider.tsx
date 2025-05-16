import { useEffect, useState } from "react";
import { AuthContext } from "../hooks/AuthContext";
import { userType } from "../types/User";
import apiClient from "../utils/apiClient";
import { RiLoader2Fill } from "react-icons/ri";

export interface AuthContextType {
  user: userType | null; // Changed undefined to null for initial state consistency
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<userType | null>(null); // Initialized to null
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const verifyAuthWithProtectedEndpoint = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`auth/check-auth`);
      console.log(response);
      if (response.status === 200 && response.data.user) {
        setIsAuthenticated(true);
        setUser(response.data.user);
        console.log(response.data.user);
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
      if (response.status === 200 && response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        console.log("🚀 User logged in:", response.data.user);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        console.warn("❌ Login successful but no user data returned");
      }
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
      console.error("Login failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true); // Set loading to true on logout start
    try {
      await apiClient.post(`/auth/logout/${user?._id}`);
      // setUser(null);
      // setIsAuthenticated(false);
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
      value={{ user, login, logout, isAuthenticated, loading }}
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
