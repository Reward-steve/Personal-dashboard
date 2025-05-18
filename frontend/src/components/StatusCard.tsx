import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

type StatusCardProps = {
  type: "success" | "error";
  message: string;
  onClose?: () => void;
};

const cardStyles = {
  base: {
    padding: "1.5rem",
    margin: "1rem auto",
    maxWidth: "400px",
    borderRadius: "10px",
    fontFamily: "sans-serif",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center" as const,
    position: "relative" as const,
  },
  success: {
    backgroundColor: "#e6ffed",
    color: "#2e7d32",
  },
  error: {
    backgroundColor: "#ffe6e6",
    color: "#c62828",
  },
  icon: {
    fontSize: "2rem",
    marginBottom: "0.5rem",
  },
  closeButton: {
    position: "absolute" as const,
    top: "10px",
    right: "15px",
    background: "none",
    border: "none",
    fontSize: "1.2rem",
    cursor: "pointer",
  },
};

export default function StatusCard({
  type,
  message,
  onClose,
}: StatusCardProps) {
  const style = {
    ...cardStyles.base,
    ...(type === "success" ? cardStyles.success : cardStyles.error),
  };

  return (
    <div style={style}>
      {type === "success" ? (
        <FaCheckCircle style={cardStyles.icon} />
      ) : (
        <FaTimesCircle style={cardStyles.icon} />
      )}
      <p>{message}</p>
      {onClose && (
        <button onClick={onClose} style={cardStyles.closeButton}>
          &times;
        </button>
      )}
    </div>
  );
}
