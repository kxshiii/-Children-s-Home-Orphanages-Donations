<<<<<<< HEAD
import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white p-4 rounded-2xl shadow-md ${className}`}>
      {children}
=======
import React from "react";

const Card = ({ title, subtitle, description, image, children, actions }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 max-w-md mx-auto">
      {image && (
        <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg mb-3" />
      )}
      {title && <h3 className="text-xl font-semibold mb-2">{title}</h3>}
      {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      {description && <p className="mt-2 text-gray-700">{description}</p>}
      {children}
      {actions && <div className="mt-3">{actions}</div>}
>>>>>>> d6f341b9e0e34970ef97fa1fb73f878ccf34f3c0
    </div>
  );
};

export default Card;
