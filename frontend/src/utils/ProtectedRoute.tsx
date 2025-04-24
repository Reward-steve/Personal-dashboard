import { Navigate, Outlet } from "react-router-dom";
// import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
