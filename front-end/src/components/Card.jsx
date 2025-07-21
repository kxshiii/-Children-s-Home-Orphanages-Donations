
import React from "react";

function Card({ title, children, image, actions }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 max-w-md mx-auto">
      {image && (
        <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg mb-3" />
      )}
      {title && <h3 className="text-xl font-semibold mb-2">{title}</h3>}
      <div className="mb-2">{children}</div>
      {actions && <div className="mt-3">{actions}</div>}
    </div>
  );
}

export default Card;
