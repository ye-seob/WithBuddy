import React, { useEffect } from "react";
import styles from "../public/css/AlertMessage.module.css";

interface AlertMessageProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  message,
  type,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const alertClass =
    type === "success" ? styles.alertMessage : styles.alertErrorMessage;

  return <div className={`${alertClass} ${styles.show}`}>{message}</div>;
};

export default AlertMessage;
