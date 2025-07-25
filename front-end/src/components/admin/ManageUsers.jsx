import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Edit, Trash2, Shield, User } from 'lucide-react';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const { updateUser, deleteUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('hopeBridgeUsers')) || [];
    setUsers(storedUsers);
  }, []);

  const handleRoleChange = (userId, newRole) => {
    const success = updateUser(userId, { role: newRole });
    if (success) {
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      toast({ title: 'Success', description: "User's role updated." });
    } else {
      toast({ title: 'Error', description: "Failed to update role.", variant: 'destructive' });
    }
  };

  const handleDeleteUser = (userId) => {
    const success = deleteUser(userId);
    if (success) {
        setUsers(users.filter(u => u.id !== userId));
        toast({ title: 'Success', description: 'User deleted successfully.' });
    } else {
        toast({ title: 'Error', description: 'Failed to delete user.', variant: 'destructive' });
    }
  };
  
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold gradient-text">Manage Users</h1>
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5">
              <tr>
                <th className="p-4 font-semibold">User</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Role</th>
                <th className="p-4 font-semibold">Joined Date</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <motion.tr 
                  key={user.id} 
                  className="border-t border-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-xl font-bold">{user.name.charAt(0)}</span>
                    </div>
                    <span>{user.name}</span>
                  </td>
                  <td className="p-4 text-gray-300">{user.email}</td>
                  <td className="p-4">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="bg-white/10 p-2 rounded-lg border border-white/20"
                    >
                      <option value="donor">Donor</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="organization">Organization</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-4 text-gray-300">{new Date(user.joinDate).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="icon" className="text-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-300">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-400 hover:bg-red-400/10 hover:text-red-300" onClick={() => handleDeleteUser(user.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;