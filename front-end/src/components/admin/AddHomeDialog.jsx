import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Home, MapPin, Users, Target, Phone, Mail, Plus, X } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const AddHomeDialog = ({ isOpen, onClose, onAddHome }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    image: '',
    children: '',
    capacity: '',
    donationGoal: '',
    urgentNeeds: [''],
    contact: {
      phone: '',
      email: '',
      address: ''
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }));
  };

  const handleUrgentNeedsChange = (index, value) => {
    const newUrgentNeeds = [...formData.urgentNeeds];
    newUrgentNeeds[index] = value;
    setFormData(prev => ({
      ...prev,
      urgentNeeds: newUrgentNeeds
    }));
  };

  const addUrgentNeed = () => {
    setFormData(prev => ({
      ...prev,
      urgentNeeds: [...prev.urgentNeeds, '']
    }));
  };

  const removeUrgentNeed = (index) => {
    if (formData.urgentNeeds.length > 1) {
      const newUrgentNeeds = formData.urgentNeeds.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        urgentNeeds: newUrgentNeeds
      }));
    }
  };

  const validateForm = () => {
    const requiredFields = ['name', 'location', 'description', 'children', 'capacity', 'donationGoal'];
    const missingFields = requiredFields.filter(field => !formData[field]?.toString().trim());
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Required Fields",
        description: `Please fill in: ${missingFields.join(', ')}`,
        variant: "destructive"
      });
      return false;
    }

    if (parseInt(formData.children) > parseInt(formData.capacity)) {
      toast({
        title: "Invalid Capacity",
        description: "Number of children cannot exceed capacity",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.contact.phone || !formData.contact.email) {
      toast({
        title: "Contact Information Required",
        description: "Please provide phone and email contact information",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Clean up urgent needs (remove empty ones)
      const cleanUrgentNeeds = formData.urgentNeeds.filter(need => need.trim() !== '');
      
      const homeData = {
        ...formData,
        children: parseInt(formData.children),
        capacity: parseInt(formData.capacity),
        donationGoal: parseInt(formData.donationGoal),
        urgentNeeds: cleanUrgentNeeds,
        image: formData.image || 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500' // Default image
      };

      onAddHome(homeData);
      
      toast({
        title: "Home Added Successfully!",
        description: `${formData.name} has been added to the platform.`,
      });

      handleClose();
    } catch (error) {
      toast({
        title: "Error Adding Home",
        description: "There was an error adding the children's home. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      location: '',
      description: '',
      image: '',
      children: '',
      capacity: '',
      donationGoal: '',
      urgentNeeds: [''],
      contact: {
        phone: '',
        email: '',
        address: ''
      }
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl bg-gray-900 border-gray-700 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center">
            <Home className="h-5 w-5 mr-2 text-blue-400" />
            Add New Children's Home
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Fill in the details to add a new children's home to the platform
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4 space-y-4">
              <h3 className="text-white font-semibold flex items-center">
                <Home className="h-4 w-4 mr-2" />
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Home Name *</label>
                  <Input
                    placeholder="e.g., Sunshine Children's Home"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="input-field"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Location *</label>
                  <Input
                    placeholder="e.g., Nairobi, Kenya"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Description *</label>
                <textarea
                  placeholder="Describe the children's home, its mission, and services..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="input-field min-h-[80px] resize-none"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Image URL (Optional)</label>
                <Input
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  className="input-field"
                />
                <p className="text-xs text-gray-400">Leave empty to use default image</p>
              </div>
            </CardContent>
          </Card>

          {/* Capacity & Goals */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4 space-y-4">
              <h3 className="text-white font-semibold flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Capacity & Goals
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Current Children *</label>
                  <Input
                    type="number"
                    placeholder="45"
                    value={formData.children}
                    onChange={(e) => handleInputChange('children', e.target.value)}
                    className="input-field"
                    min="0"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Total Capacity *</label>
                  <Input
                    type="number"
                    placeholder="60"
                    value={formData.capacity}
                    onChange={(e) => handleInputChange('capacity', e.target.value)}
                    className="input-field"
                    min="1"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Donation Goal (KES) *</label>
                  <Input
                    type="number"
                    placeholder="25000"
                    value={formData.donationGoal}
                    onChange={(e) => handleInputChange('donationGoal', e.target.value)}
                    className="input-field"
                    min="1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Urgent Needs */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold flex items-center">
                  <Target className="h-4 w-4 mr-2" />
                  Urgent Needs
                </h3>
                <Button
                  type="button"
                  size="sm"
                  onClick={addUrgentNeed}
                  className="btn-secondary"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Need
                </Button>
              </div>
              
              <div className="space-y-2">
                {formData.urgentNeeds.map((need, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      placeholder="e.g., School supplies, Medical care, Food"
                      value={need}
                      onChange={(e) => handleUrgentNeedsChange(index, e.target.value)}
                      className="input-field flex-1"
                    />
                    {formData.urgentNeeds.length > 1 && (
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => removeUrgentNeed(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4 space-y-4">
              <h3 className="text-white font-semibold flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                Contact Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Phone Number *</label>
                  <Input
                    placeholder="+254 700 123 456"
                    value={formData.contact.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    className="input-field"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Email Address *</label>
                  <Input
                    type="email"
                    placeholder="info@childrenshome.org"
                    value={formData.contact.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Physical Address</label>
                <Input
                  placeholder="123 Hope Street, City"
                  value={formData.contact.address}
                  onChange={(e) => handleContactChange('address', e.target.value)}
                  className="input-field"
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-primary"
            >
              {isSubmitting ? 'Adding Home...' : 'Add Home'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddHomeDialog;