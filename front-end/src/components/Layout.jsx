import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, LogIn, UserPlus, Shield, Heart, Building, LogOut, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Layout = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = (path) => {
    window.location.href = path;
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "Thank you for using Hope Bridge!",
    });
    navigate('/');
  };

  const navItems = [
    { name: 'Home', path: '/', icon: Home, public: true },
    { name: 'Orphanages', path: '/orphanages', icon: Building, public: true },
    { name: 'Donate', path: '/donate', icon: Heart, public: true },
  ];

  if (user?.role === 'admin') {
    navItems.push({ name: 'Admin', path: '/admin', icon: Shield, public: false });
  }

  return (
    <div className="min-h-screen bg-gray-900/80 text-white flex flex-col pattern-bg">
      <header className="bg-gray-900/80 backdrop-blur-sm border-b border-purple-500/20 sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2">
            <img src='https://imagedelivery.net/LqiWLm-3MGbYHtFuUbcBtU/119580eb-abd9-4191-b93a-f01938786700/public' alt='Logo' className="h-8 w-8" />
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">Hope Bridge</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map(item => (
              (item.public || user) && <NavLink key={item.name} to={item.path} Icon={item.icon} />
            ))}
          </div>
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
               <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 glass-card px-3 py-2 rounded-lg">
                  <User className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <NavLink to="/login" Icon={LogIn} />
                <Button asChild size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-6 py-8">
        <Outlet />
      </main>
      <footer className="bg-gray-900/50 border-t border-purple-500/20 py-6">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Hope Bridge. All rights reserved.</p>
          <p className="text-sm mt-2">Connecting hearts, changing lives.</p>
        </div>
      </footer>
    </div>
  );
};

const NavLink = ({ to, children, Icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} className={`flex items-center text-gray-300 hover:text-white transition-colors duration-300 relative group ${isActive ? 'text-white' : ''}`}>
      {Icon && <Icon className="w-5 h-5 mr-2" />} 
      {children}
      { to === '/' ? 'Home' : to.substring(1).charAt(0).toUpperCase() + to.slice(2)}
      {isActive && <motion.span layoutId="underline" className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-500" />}
    </Link>
  )
};

export default Layout;