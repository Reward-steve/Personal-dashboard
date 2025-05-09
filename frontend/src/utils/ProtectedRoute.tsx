import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

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
          fontFamily: "san-serif",
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={"/auth/login"} />;
  } else {
    return <Outlet />;
  }
}
