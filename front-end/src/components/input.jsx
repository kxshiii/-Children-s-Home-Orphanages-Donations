import React from "react";

const Input = ({ value, onChange, placeholder = '', type = 'text', className = '' }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
}