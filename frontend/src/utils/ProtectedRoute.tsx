// import { Navigate, Outlet } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export function ProtectedRoute() {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

//   useEffect(() => {
//     const verifyUser = async () => {
//       try {
//         await axios.get("http://localhost:5000/api/v1/pharmarcist", {
//           withCredentials: true, // ✅ Sends the cookie automatically
//         });
//         setIsAuthenticated(true);
//       } catch {
//         setIsAuthenticated(false);
//       }
//     };

//     verifyUser();
//   }, []);

//   if (isAuthenticated === null) return <p>Loading...</p>;
//   return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
// }
