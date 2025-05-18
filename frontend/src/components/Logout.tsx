import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import style from "../styles/Authpages.module.css"; // Import a CSS module

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login"); // or wherever the user should go after logout
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
