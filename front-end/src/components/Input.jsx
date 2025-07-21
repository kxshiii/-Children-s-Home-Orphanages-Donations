import React from "react";

const Input = ({ label, name, type = "text", value, onChange, placeholder, ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 font-medium" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
        {...props}
      />
    </div>
  );
};

export default Input;
