// import { useAuth } from "../../hooks/useAuth";
// import { useNavigate } from "react-router-dom";

// export default function Logout() {
//   const { logout, loading } = useAuth(); // Assuming your AuthContext provides a loading state
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     await logout();
//     // Optionally navigate to the login page after successful logout
//     navigate("/auth/login");
//   };

//   return (
//     <div className={styles.logoutContainer}>
//       <h2 className={styles.logoutTitle}>Confirm Logout</h2>
//       <p className={styles.logoutMessage}>Are you sure you want to sign out?</p>
//       <div className={styles.buttonContainer}>
//         <button
//           onClick={handleLogout}
//           className={styles.logoutButton}
//           disabled={loading}
//         >
//           {loading ? "Logging Out..." : "Yes, Sign Out"}
//         </button>
//         {/* Optionally add a "Cancel" button */}
//         {/* <button onClick={() => navigate(-1)} className={styles.cancelButton}>
//           Cancel
//         </button> */}
//       </div>
//     </div>
//   );
// }

import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import style from "../../styles/Authpages.module.css"; // Import a CSS module

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // or wherever the user should go after logout
  };

  return (
    <div className={style.logoutWrapper}>
      <div className={style.logoutCard}>
        <h2>Confirm Logout</h2>
        <p>Are you sure you want to log out?</p>
        <div className={style.buttonGroup}>
          <button className={style.confirmBtn} onClick={handleLogout}>
            Yes, Logout
          </button>
          <button className={style.cancelBtn} onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
