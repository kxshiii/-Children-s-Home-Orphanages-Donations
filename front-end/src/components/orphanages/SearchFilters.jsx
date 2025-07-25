
import React from 'react';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SearchFilters = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange,
  locations 
}) => {
  if (!isOpen) return null;

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      location: '',
      minChildren: '',
      maxChildren: '',
      verified: false,
      urgentNeeds: false
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-card p-6 rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filters
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Location Filter */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Country
            </label>
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Countries</option>
              {locations.map(location => (
                <option key={location} value={location} className="bg-slate-800">
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Children Count Range */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Number of Children
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minChildren}
                onChange={(e) => handleFilterChange('minChildren', e.target.value)}
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxChildren}
                onChange={(e) => handleFilterChange('maxChildren', e.target.value)}
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={filters.verified}
                onChange={(e) => handleFilterChange('verified', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
              />
              <span className="text-white">Verified homes only</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={filters.urgentNeeds}
                onChange={(e) => handleFilterChange('urgentNeeds', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
              />
              <span className="text-white">Has urgent needs</span>
            </label>
          </div>
        </div>

        <div className="flex space-x-3 mt-8">
          <Button
            variant="outline"
            onClick={clearFilters}
            className="flex-1 border-white/30 text-white hover:bg-white/10"
          >
            Clear All
          </Button>
          <Button
            onClick={onClose}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600"
          >
            Apply Filters
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SearchFilters;