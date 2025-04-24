// import { Navigate, Outlet } from "react-router-dom";
// import { useEffect } from "react";
// import useAuth from "../hooks/useAuth";

// export function ProtectedRoute() {
//   const { user } = useAuth();
//   useEffect(() => {
//     const user = sessionStorage.getItem("user");

//   }, [user]);
//     if (user === null) return <p>Loading...</p>;
//     return user ? <Outlet /> : <Navigate to="/" />;
// }
