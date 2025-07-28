import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Home, Plus, Search, MapPin, Users, Target, 
  Phone, Mail, Edit, Trash2, Eye, TrendingUp 
} from 'lucide-react';
import { useChildrensHomes } from '@/hooks/useChildrensHomes';
import AddHomeDialog from '@/components/admin/AddHomeDialog';
import { toast } from '@/components/ui/use-toast';

const HomesManagement = () => {
  const { homes, loading, addHome, deleteHome } = useChildrensHomes();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHome, setSelectedHome] = useState(null);

  const filteredHomes = homes.filter(home =>
    home.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    home.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddHome = (homeData) => {
    addHome(homeData);
    setIsAddDialogOpen(false);
  };

  const handleDeleteHome = (homeId, homeName) => {
    if (window.confirm(`Are you sure you want to delete "${homeName}"? This action cannot be undone.`)) {
      deleteHome(homeId);
      toast({
        title: "Home Deleted",
        description: `${homeName} has been removed from the platform.`,
      });
    }
  };

  const getProgressPercentage = (received, goal) => {
    return Math.min((received / goal) * 100, 100);
  };

  const getOccupancyPercentage = (children, capacity) => {
    return Math.round((children / capacity) * 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Home className="h-6 w-6 mr-2 text-blue-400" />
            Homes Management
          </h2>
          <p className="text-gray-300 mt-1">
            Manage children's homes on the platform ({homes.length} total)
          </p>
        </div>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="btn-primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Home
        </Button>
      </div>

      {/* Search */}
      <Card className="admin-card">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search homes by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Homes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredHomes.map((home) => {
          const progressPercentage = getProgressPercentage(home.donationsReceived, home.donationGoal);
          const occupancyPercentage = getOccupancyPercentage(home.children, home.capacity);
          
          return (
            <Card key={home.id} className="admin-card">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-white text-lg mb-1">
                      {home.name}
                    </CardTitle>
                    <p className="text-gray-400 text-sm flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {home.location}
                    </p>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-blue-400 hover:text-blue-300"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-yellow-400 hover:text-yellow-300"
                      title="Edit Home"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteHome(home.id, home.name)}
                      className="text-red-400 hover:text-red-300"
                      title="Delete Home"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Description */}
                <p className="text-gray-300 text-sm line-clamp-2">
                  {home.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-400 text-xs">Occupancy</span>
                      <Users className="h-3 w-3 text-blue-400" />
                    </div>
                    <p className="text-white font-semibold">
                      {home.children}/{home.capacity}
                    </p>
                    <p className="text-xs text-gray-400">
                      {occupancyPercentage}% full
                    </p>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-400 text-xs">Donations</span>
                      <TrendingUp className="h-3 w-3 text-green-400" />
                    </div>
                    <p className="text-white font-semibold">
                      KES {home.donationsReceived.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">
                      {Math.round(progressPercentage)}% of goal
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Donation Progress</span>
                    <span className="text-gray-300">
                      KES {home.donationGoal.toLocaleString()} goal
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Urgent Needs */}
                {home.urgentNeeds && home.urgentNeeds.length > 0 && (
                  <div>
                    <p className="text-gray-400 text-xs mb-2">Urgent Needs:</p>
                    <div className="flex flex-wrap gap-1">
                      {home.urgentNeeds.slice(0, 3).map((need, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded-full"
                        >
                          {need}
                        </span>
                      ))}
                      {home.urgentNeeds.length > 3 && (
                        <span className="px-2 py-1 bg-gray-600/50 text-gray-400 text-xs rounded-full">
                          +{home.urgentNeeds.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Contact Info */}
                <div className="pt-2 border-t border-gray-700">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center text-gray-400">
                      <Phone className="h-3 w-3 mr-1" />
                      {home.contact?.phone || 'No phone'}
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Mail className="h-3 w-3 mr-1" />
                      {home.contact?.email ? 'Email available' : 'No email'}
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="flex justify-between text-xs text-gray-400 pt-2 border-t border-gray-700">
                  <span>⭐ {home.rating || 0} rating</span>
                  <span>👥 {home.visits || 0} visits</span>
                  <span>💬 {home.reviews?.length || 0} reviews</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredHomes.length === 0 && (
        <Card className="admin-card">
          <CardContent className="text-center py-12">
            <Home className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">
              {searchTerm ? 'No homes found' : 'No homes yet'}
            </h3>
            <p className="text-gray-400 mb-4">
              {searchTerm 
                ? `No homes match "${searchTerm}". Try a different search term.`
                : 'Get started by adding your first children\'s home to the platform.'
              }
            </p>
            {!searchTerm && (
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                className="btn-primary"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add First Home
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Add Home Dialog */}
      <AddHomeDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddHome={handleAddHome}
      />
    </div>
  );
};

export default HomesManagement;