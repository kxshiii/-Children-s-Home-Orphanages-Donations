import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, Building, Calendar } from 'lucide-react';

const Analytics = () => {
  const [data, setData] = useState({
    donationsByMonth: {},
    usersByMonth: {},
    orphanagesByMonth: {}
  });

  useEffect(() => {
    const donations = JSON.parse(localStorage.getItem('hopeBridgeDonations')) || [];
    const users = JSON.parse(localStorage.getItem('hopeBridgeUsers')) || [];
    const orphanages = JSON.parse(localStorage.getItem('hopeBridgeOrphanages')) || [];

    const processData = (items, dateField) => {
      return items.reduce((acc, item) => {
        const month = new Date(item[dateField]).toLocaleString('default', { month: 'short', year: 'numeric' });
        acc[month] = (acc[month] || 0) + (item.amount || 1);
        return acc;
      }, {});
    };

    setData({
      donationsByMonth: processData(donations, 'date'),
      usersByMonth: processData(users, 'joinDate'),
      orphanagesByMonth: processData(orphanages, 'addedDate') // Assuming orphanages have an 'addedDate'
    });
  }, []);

  const Chart = ({ title, chartData, icon: Icon, color }) => {
    const labels = Object.keys(chartData);
    const values = Object.values(chartData);
    const maxValue = Math.max(...values, 1);

    return (
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center"><Icon className={`mr-2 h-5 w-5 ${color}`} /> {title}</h3>
        <div className="flex items-end h-64 space-x-2">
          {labels.map((label, index) => (
            <div key={label} className="flex-1 flex flex-col items-center">
              <motion.div
                className="w-full rounded-t-lg bg-gradient-to-t"
                style={{
                  height: `${(values[index] / maxValue) * 100}%`,
                  backgroundImage: `linear-gradient(to top, var(--tw-gradient-from), var(--tw-gradient-to))`
                }}
                initial={{ height: 0 }}
                animate={{ height: `${(values[index] / maxValue) * 100}%` }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              ></motion.div>
              <span className="text-xs text-gray-400 mt-2">{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold gradient-text">Platform Analytics</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Chart 
          title="Donations Over Time" 
          chartData={data.donationsByMonth} 
          icon={DollarSign} 
          color="text-green-400"
        />
        <Chart 
          title="New Users Over Time" 
          chartData={data.usersByMonth} 
          icon={Users} 
          color="text-blue-400"
        />
      </div>
    </div>
  );
};

export default Analytics;