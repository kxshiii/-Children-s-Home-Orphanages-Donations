import React from "react";

const Card = ({ title, subtitle, description }) => {
  return (
    <div className="border border-gray-300 p-4 rounded shadow-sm bg-white">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{subtitle}</p>
      <p className="mt-2 text-gray-700">{description}</p>
    </div>
  );
};

export default Card;
