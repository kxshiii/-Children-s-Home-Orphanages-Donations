import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <div className="text-2xl font-bold text-blue-700">ChildCare Connect</div>
      <ul className="flex space-x-6 text-gray-800 font-medium">
        <li>
          <Link to="/" className="hover:text-blue-600">Home</Link>
        </li>
        <li>
          <Link to="/homes" className="hover:text-blue-600">Homes</Link>
        </li>
        <li>
          <Link to="/donate" className="hover:text-blue-600">Donate</Link>
        </li>
        <li>
          <Link to="/login" className="hover:text-blue-600">Login</Link>
        </li>
      </ul>
    </nav>
  );
}
