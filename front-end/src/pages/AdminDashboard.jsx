import React from "react";

const AdminDashboard = () => {
  const stats = [
    { title: "Most Visited Home", value: "Hope Haven", visits: 125 },
    { title: "Most In-Need", value: "Sunshine Shelter", donations: "$420" },
    { title: "Total Registered Homes", value: 18 },
    { title: "Total Donations", value: "$5,320" },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-4 text-center"
          >
            <h2 className="text-lg font-semibold text-gray-600">
              {stat.title}
            </h2>
            <p className="text-2xl font-bold text-blue-600 mt-2">{stat.value}</p>
            {stat.visits && (
              <p className="text-sm text-gray-400">{stat.visits} visits</p>
            )}
            {stat.donations && (
              <p className="text-sm text-gray-400">{stat.donations} donated</p>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Manage Children’s Homes</h2>
        <p className="text-gray-600 mb-4">
          Add, edit, or remove registered homes.
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          + Add New Home
        </button>

        {/* Placeholder: Table/List of homes to be added */}
        <div className="mt-4 text-gray-400 italic">
          (Table of homes with Edit/Delete actions will go here...)
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
