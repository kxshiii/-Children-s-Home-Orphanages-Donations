<<<<<<< HEAD
 import React from 'react';

const Button = ({ children, onClick, type = 'button', className = '' }) => {
=======
import React from "react";

const Button = ({ children, text, onClick, type = "button", ...props }) => {
>>>>>>> d6f341b9e0e34970ef97fa1fb73f878ccf34f3c0
  return (
    <button
      type={type}
      onClick={onClick}
<<<<<<< HEAD
      className={`bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition-all duration-200 ${className}`}
    >
      {children}
=======
      className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
      {...props}
    >
      {children || text}
>>>>>>> d6f341b9e0e34970ef97fa1fb73f878ccf34f3c0
    </button>
  );
};

export default Button;
