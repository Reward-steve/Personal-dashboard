import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { RiLoader2Line } from "react-icons/ri";

export function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          fontSize: "1.5em",
          fontWeight: "bold",
          color: "aliceblue",
          textAlign: "center",
          fontFamily: "sans-serif",
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RiLoader2Line className="spin" size={30} />
      </div>
    );
  }

  // ✅ Allow access if authenticated
  if (isAuthenticated) {
    return <Outlet />;
  }

  // ❌ Redirect to login if not authenticated
  return <Navigate to="/auth/login" replace />;
}
