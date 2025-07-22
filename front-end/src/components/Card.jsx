
import { ClassNames } from '@emotion/react';
import React from 'react';
const Card =({ title , subtitle , description, image, children,actions}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 max-w-md mx-auto">
      <img src={image} alt={title} ClassName="w-full h48 object-cover rounded-t-lg mb-3"/>
      <h3 ClassName="text-xl font-semibold mb-2 ">{title}</h3>
      <p ClassName="text-sm text-gray-600">{subtitle}</p>
      <p ClassName="mt-2 text-gray-700">{description}</p>
      {children}
      {actions} 
    </div>
  )
}

export default Card;

