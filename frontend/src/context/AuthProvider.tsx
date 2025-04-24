import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { userType } from "../types/User";
import apiClient from "../utils/apiClient";

export interface AuthContextType {
  user: userType | null | undefined;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<userType | null | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await apiClient.post("/auth/login", { email, password });
      const { user } = await response.data;
      setUser(user);
      if (user) {
        sessionStorage.setItem("user", JSON.stringify(user));
        setIsAuthenticated(true);
        console.log("🚀 User from backend:", user);
      } else console.warn("❌ No user data returned");
    } catch (err) {
      setIsAuthenticated(false);
      console.error("Login failed:", err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await apiClient.post("/auth/logout");
      setUser(null);
      sessionStorage.removeItem("user");
    } catch (err) {
      console.warn("Logout request failed - forcing logout anyway.");
      console.log(err);
    }
  };

  useEffect(() => {
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
