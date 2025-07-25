import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Building, Users, BarChart3, Settings } from 'lucide-react';
import DashboardOverview from '@/components/admin/DashboardOverview';
import ManageOrphanages from '@/components/admin/ManageOrphanages';
import ManageUsers from '@/components/admin/ManageUsers';
import Analytics from '@/components/admin/Analytics';
import { useAuth } from '@/context/AuthContext';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuth();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, component: <DashboardOverview setActiveTab={setActiveTab} /> },
    { id: 'orphanages', label: 'Orphanages', icon: Building, component: <ManageOrphanages /> },
    { id: 'users', label: 'Users', icon: Users, component: <ManageUsers /> },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, component: <Analytics /> },
    { id: 'settings', label: 'Settings', icon: Settings, component: <div>Settings coming soon!</div> },
  ];

  const renderContent = () => {
    const activeTabData = tabs.find(tab => tab.id === activeTab);
    return activeTabData ? activeTabData.component : null;
  };

  if (!user) {
    return null; 
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Hope Bridge</title>
        <meta name="description" content="Manage orphanages, users, donations, and analytics on the Hope Bridge platform." />
      </Helmet>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row gap-8"
      >
        <aside className="lg:w-64 flex-shrink-0">
          <div className="glass-card p-4 rounded-2xl sticky top-24">
            <div className="flex items-center gap-3 p-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-2xl font-bold">{user.name.charAt(0)}</span>
              </div>
              <div>
                <span className="font-semibold text-white block">{user.name}</span>
                <span className="text-xs text-gray-400 capitalize">{user.role}</span>
              </div>
            </div>
            <nav className="flex flex-row lg:flex-col gap-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors w-full text-left ${
                    activeTab === tab.id 
                      ? 'bg-blue-500/20 text-blue-300' 
                      : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="hidden lg:inline">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </motion.div>
    </>
  );
};

export default AdminDashboard;