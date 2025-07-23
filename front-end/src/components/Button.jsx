import React from "react";

const Button = ({
  children,
  text,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
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
