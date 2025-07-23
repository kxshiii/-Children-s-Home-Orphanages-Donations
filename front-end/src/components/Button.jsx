import React from "react";

<<<<<<< HEAD
const Button = ({
  children,
  text,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
=======
const Button = ({ children, text, onClick, type = "button", className = "", ...props }) => {
>>>>>>> ef62e18e87098ed95eefca9a127fe7a086d78b15
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded ${className}`}
      {...props}
    >
      {children || text}
    </button>
  );
};

export default Button;
