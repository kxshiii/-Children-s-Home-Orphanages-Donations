import React from "react";

const Button = ({ text, ...props }) => {
  return (
    <button
      {...props}
      className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
    >
      {text}
    </button>
  );
};

export default Button;
