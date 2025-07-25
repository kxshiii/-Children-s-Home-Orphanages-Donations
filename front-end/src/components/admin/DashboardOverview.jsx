import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Building, Heart, BarChart, ArrowRight } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className="glass-card p-6 rounded-2xl flex items-center space-x-4 hover-glow"
  >
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${color}`}>
      <Icon className="h-8 w-8 text-white" />
    </div>
    <div>
      <span className="text-3xl font-bold text-white block">{value}</span>
      <span className="text-gray-300">{title}</span>
    </div>
  </motion.div>
);

const QuickActionButton = ({ icon: Icon, label, color, onClick }) => (
  <button onClick={onClick} className={`flex items-center justify-between w-full p-4 rounded-lg text-white transition-all duration-300 ${color} hover:scale-105`}>
    <div className="flex items-center space-x-3">
      <Icon className="h-5 w-5" />
      <span className="font-medium">{label}</span>
    </div>
    <ArrowRight className="h-5 w-5" />
  </button>
);


const DashboardOverview = ({ setActiveTab }) => {
  const [stats, setStats] = useState({ users: 0, orphanages: 0, donations: 0, totalAmount: 0 });

  useEffect(() => {
    // In a real app, you'd fetch this from an API. Here we use localStorage.
    const users = JSON.parse(localStorage.getItem('hopeBridgeUsers')) || [];
    const orphanages = JSON.parse(localStorage.getItem('hopeBridgeOrphanages')) || [];
    const donations = JSON.parse(localStorage.getItem('hopeBridgeDonations')) || [];
    const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);

    setStats({
      users: users.length,
      orphanages: orphanages.length,
      donations: donations.length,
      totalAmount
    });
  }, []);

  const statCards = [
    { icon: Users, title: 'Total Users', value: stats.users, color: 'from-blue-500 to-cyan-500', delay: 0.1 },
    { icon: Building, title: 'Partner Homes', value: stats.orphanages, color: 'from-purple-500 to-indigo-500', delay: 0.2 },
    { icon: Heart, title: 'Total Donations', value: stats.donations, color: 'from-pink-500 to-rose-500', delay: 0.3 },
    { icon: BarChart, title: 'Amount Raised', value: `$${stats.totalAmount.toLocaleString()}`, color: 'from-green-500 to-emerald-500', delay: 0.4 },
  ];
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold gradient-text mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back, Admin! Here's a snapshot of your platform's activity.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map(card => <StatCard key={card.title} {...card} />)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="glass-card p-6 rounded-2xl"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <QuickActionButton icon={Building} label="Manage Orphanages" color="bg-blue-500/80 hover:bg-blue-500" onClick={() => setActiveTab('orphanages')} />
            <QuickActionButton icon={Users} label="Manage Users" color="bg-purple-500/80 hover:bg-purple-500" onClick={() => setActiveTab('users')} />
            <QuickActionButton icon={BarChart} label="View Analytics" color="bg-green-500/80 hover:bg-green-500" onClick={() => setActiveTab('analytics')} />
          </div>
        </motion.div>
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="glass-card p-6 rounded-2xl"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4 text-gray-300 text-sm">
            <p>No recent activity to show.</p>
            <p>This is where recent donations, new user registrations, and new orphanage listings would appear.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardOverview;