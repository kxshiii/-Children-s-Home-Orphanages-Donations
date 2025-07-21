import React from "react";

const Inputs = ({ label, name, type, value, onChange }) => {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );
};

export default Inputs;
