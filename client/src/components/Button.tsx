import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-1/3 py-2 bg-[#C6D1AE] text-white rounded-xl "
    >
      {text}
    </button>
  );
};

export default Button;
