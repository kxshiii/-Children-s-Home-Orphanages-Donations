import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Home, Settings, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth.jsx';
import AddHomeDialog from '@/components/admin/AddHomeDialog';
import { useChildrensHomes } from '@/hooks/useChildrensHomes';

const AdminFloatingActions = () => {
  const { user } = useAuth();
  const { addHome } = useChildrensHomes();
  const [isOpen, setIsOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Only show for admin users
  if (!user || user.role !== 'admin') {
    return null;
  }

  const handleAddHome = (homeData) => {
    addHome(homeData);
    setIsAddDialogOpen(false);
    setIsOpen(false);
  };

  const actions = [
    {
      icon: Home,
      label: 'Manage Homes',
      action: () => window.location.href = '/admin/homes',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: Plus,
      label: 'Add New Home',
      action: () => {
        setIsAddDialogOpen(true);
        setIsOpen(false);
      },
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: Settings,
      label: 'Admin Dashboard',
      action: () => window.location.href = '/admin',
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-16 right-0 space-y-3"
            >
              {actions.map((action, index) => (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <span className="bg-black/80 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap">
                    {action.label}
                  </span>
                  <button
                    onClick={action.action}
                    className={`w-12 h-12 rounded-full ${action.color} text-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110`}
                  >
                    <action.icon className="h-5 w-5" />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
            isOpen 
              ? 'bg-red-500 hover:bg-red-600 rotate-45' 
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Settings className="h-6 w-6" />
          )}
        </motion.button>
      </div>

      {/* Add Home Dialog */}
      <AddHomeDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddHome={handleAddHome}
      />
    </>
  );
};

export default AdminFloatingActions;