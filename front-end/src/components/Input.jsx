
import React from "react";

function Input({ label, type = "text", value, onChange, name, placeholder, ...props }) {
  return (
    <div className="mb-4">
      {label && <label className="block mb-1 font-medium" htmlFor={name}>{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        {...props}
      />
    </div>
  );
}

export default Input;
