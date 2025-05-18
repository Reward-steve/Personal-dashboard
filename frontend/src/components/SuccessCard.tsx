import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import styles from "../styles/successcard.module.css"; // We'll define the styles below

interface SuccessCardProps {
  message: string;
  onClose: () => void;
}

const SuccessCard: React.FC<SuccessCardProps> = ({ message, onClose }) => {
  return (
    <div className={styles.card}>
      <FaCheckCircle className={styles.icon} />
      <p className={styles.message}>{message}</p>
      <button className={styles.closeBtn} onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default SuccessCard;
