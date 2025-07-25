import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

// Initialize with a default admin user if no users exist
const initializeUsers = () => {
    try {
        const users = localStorage.getItem('hopeBridgeUsers');
        if (!users) {
            const adminUser = {
                id: 'admin-001',
                name: 'Admin User',
                email: 'admin@hopebridge.com',
                password: 'password', // In a real app, this would be hashed
                role: 'admin',
                joinDate: new Date().toISOString()
            };
            localStorage.setItem('hopeBridgeUsers', JSON.stringify([adminUser]));
        }
    } catch (error) {
        console.error("Failed to initialize users in localStorage:", error);
    }
};

initializeUsers();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
        const storedUser = localStorage.getItem('hopeBridgeUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        localStorage.removeItem('hopeBridgeUser');
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    try {
        const users = JSON.parse(localStorage.getItem('hopeBridgeUsers')) || [];
        const foundUser = users.find(u => u.email === email && u.password === password);
        
        if (foundUser) {
          const userToStore = { ...foundUser };
          delete userToStore.password;
          setUser(userToStore);
          localStorage.setItem('hopeBridgeUser', JSON.stringify(userToStore));
          return true;
        }
    } catch (error) {
        console.error("Login failed:", error);
    }
    return false;
  };

  const register = (userData) => {
    try {
        let users = JSON.parse(localStorage.getItem('hopeBridgeUsers')) || [];
        const existingUser = users.find(u => u.email === userData.email);
        if (existingUser) {
          return false;
        }

        const newUser = {
          id: Date.now().toString(),
          ...userData,
          joinDate: new Date().toISOString()
        };
        users.push(newUser);
        localStorage.setItem('hopeBridgeUsers', JSON.stringify(users));
        
        const userToStore = { ...newUser };
        delete userToStore.password;
        setUser(userToStore);
        localStorage.setItem('hopeBridgeUser', JSON.stringify(userToStore));
        
        return true;
    } catch (error) {
        console.error("Registration failed:", error);
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hopeBridgeUser');
  };

  const updateUser = (userId, updatedData) => {
      try {
          let users = JSON.parse(localStorage.getItem('hopeBridgeUsers')) || [];
          users = users.map(u => u.id === userId ? { ...u, ...updatedData } : u);
          localStorage.setItem('hopeBridgeUsers', JSON.stringify(users));
          if (user?.id === userId) {
              const updatedCurrentUser = { ...user, ...updatedData };
              setUser(updatedCurrentUser);
              localStorage.setItem('hopeBridgeUser', JSON.stringify(updatedCurrentUser));
          }
          return true;
      } catch (error) {
          console.error("Failed to update user:", error);
          return false;
      }
  };

  const deleteUser = (userId) => {
      try {
          let users = JSON.parse(localStorage.getItem('hopeBridgeUsers')) || [];
          users = users.filter(u => u.id !== userId);
          localStorage.setItem('hopeBridgeUsers', JSON.stringify(users));
          if (user?.id === userId) {
             logout();
          }
          return true;
      } catch(error) {
          console.error("Failed to delete user:", error);
          return false;
      }
  }

  const value = { user, loading, login, logout, register, updateUser, deleteUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};