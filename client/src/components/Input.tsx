import React from "react";
import styles from "../public/css/Input.module.css";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  readOnly?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  readOnly = false,
  onChange,
  onKeyPress,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      onKeyPress={onKeyPress}
      className={styles.input}
    />
  );
};

export default Input;
