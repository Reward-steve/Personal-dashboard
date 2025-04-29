import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

export function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const authenticatedUser = sessionStorage.getItem("user");
    if (authenticatedUser) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) {
    // Optional: loading spinner or nothing
    return (
      <div
        style={{
          fontSize: "2em",
          fontWeight: "bold",
          color: "black",
          textAlign: "center",
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

  if (isAuthenticated === null) return <h2>Loading...</h2>;

  return isAuthenticated ? <Outlet /> : <Navigate to={"/auth"} />;
}
