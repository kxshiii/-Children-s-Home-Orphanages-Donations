
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Edit, Trash2, Building, MapPin, Phone, Mail } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const ManageOrphanages = () => {
  const [orphanages, setOrphanages] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentOrphanage, setCurrentOrphanage] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedOrphanages = JSON.parse(localStorage.getItem('hopeBridgeOrphanages')) || [
        { id: '1', name: 'Sunrise Children\'s Home', location: 'Kathmandu, Nepal', contactEmail: 'sunrise@example.com', contactPhone: '123-456-7890', description: 'A home for orphaned and abandoned children, providing education and care.' },
        { id: '2', name: 'St. Jude\'s Orphanage', location: 'Nairobi, Kenya', contactEmail: 'stjude@example.com', contactPhone: '987-654-3210', description: 'Focused on providing a safe and loving environment for children in need.' },
    ];
    setOrphanages(storedOrphanages);
  }, []);

  const saveOrphanages = (updatedOrphanages) => {
    localStorage.setItem('hopeBridgeOrphanages', JSON.stringify(updatedOrphanages));
    setOrphanages(updatedOrphanages);
  };

  const handleAdd = () => {
    setCurrentOrphanage(null);
    setIsFormOpen(true);
  };

  const handleEdit = (orphanage) => {
    setCurrentOrphanage(orphanage);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    const updatedOrphanages = orphanages.filter(o => o.id !== id);
    saveOrphanages(updatedOrphanages);
    toast({ title: 'Success', description: 'Orphanage deleted successfully.' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (currentOrphanage) {
      const updatedOrphanages = orphanages.map(o => o.id === currentOrphanage.id ? { ...o, ...data } : o);
      saveOrphanages(updatedOrphanages);
      toast({ title: 'Success', description: 'Orphanage updated successfully.' });
    } else {
      const newOrphanage = { id: Date.now().toString(), ...data };
      saveOrphanages([...orphanages, newOrphanage]);
      toast({ title: 'Success', description: 'Orphanage added successfully.' });
    }
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold gradient-text">Manage Orphanages</h1>
        <Button onClick={handleAdd} className="bg-gradient-to-r from-blue-500 to-purple-600 hover-glow">
          <PlusCircle className="mr-2 h-5 w-5" />
          Add Orphanage
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orphanages.map((orphanage, index) => (
          <motion.div
            key={orphanage.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card p-6 rounded-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Building className="h-6 w-6 text-blue-300" />
                </div>
                <h2 className="text-xl font-bold text-white">{orphanage.name}</h2>
              </div>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-blue-400" /> {orphanage.location}</div>
                <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-blue-400" /> {orphanage.contactPhone || 'N/A'}</div>
                <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-blue-400" /> {orphanage.contactEmail || 'N/A'}</div>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="ghost" size="icon" onClick={() => handleEdit(orphanage)} className="text-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-300">
                <Edit className="h-4 w-4" />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-red-400 hover:bg-red-400/10 hover:text-red-300">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="glass-effect">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the orphanage and remove their data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(orphanage.id)} className="bg-red-600 hover:bg-red-700">Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="glass-effect text-white">
          <DialogHeader>
            <DialogTitle className="gradient-text text-2xl">
              {currentOrphanage ? 'Edit Orphanage' : 'Add New Orphanage'}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Fill in the details below. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-4 py-4">
            <input name="name" placeholder="Orphanage Name" defaultValue={currentOrphanage?.name} className="w-full bg-white/10 p-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400" required />
            <input name="location" placeholder="Location" defaultValue={currentOrphanage?.location} className="w-full bg-white/10 p-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400" required />
            <input name="contactEmail" type="email" placeholder="Contact Email" defaultValue={currentOrphanage?.contactEmail} className="w-full bg-white/10 p-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400" />
            <input name="contactPhone" type="tel" placeholder="Contact Phone" defaultValue={currentOrphanage?.contactPhone} className="w-full bg-white/10 p-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400" />
            <textarea name="description" placeholder="Description" defaultValue={currentOrphanage?.description} rows="3" className="w-full bg-white/10 p-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"></textarea>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="outline" className="text-white border-white/30 hover:bg-white/10">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 hover-glow">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageOrphanages;