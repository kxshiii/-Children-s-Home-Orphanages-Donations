
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Search, MapPin, Users, Heart, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import OrphanageCard from '@/components/orphanages/OrphanageCard';
import SearchFilters from '@/components/orphanages/SearchFilters';

const OrphanagesPage = () => {
  const [orphanages, setOrphanages] = useState([]);
  const [filteredOrphanages, setFilteredOrphanages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadOrphanages();
  }, []);

  useEffect(() => {
    filterOrphanages();
  }, [orphanages, searchTerm, selectedLocation]);

  const loadOrphanages = () => {
    const savedOrphanages = localStorage.getItem('orphanages');
    if (savedOrphanages) {
      const data = JSON.parse(savedOrphanages);
      setOrphanages(data);
    } else {
      // Sample data
      const sampleOrphanages = [
        {
          id: '1',
          name: 'Sunshine Children\'s Home',
          location: 'Nairobi, Kenya',
          description: 'A loving home providing education, healthcare, and emotional support to 120 children aged 3-18.',
          children: 120,
          urgentNeeds: ['Medical supplies', 'Educational materials', 'Food'],
          image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500',
          rating: 4.8,
          totalDonations: 45000,
          verified: true
        },
        {
          id: '2',
          name: 'Hope Valley Orphanage',
          location: 'Mumbai, India',
          description: 'Dedicated to providing quality education and vocational training to underprivileged children.',
          children: 85,
          urgentNeeds: ['School uniforms', 'Computer equipment', 'Nutritional supplements'],
          image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=500',
          rating: 4.6,
          totalDonations: 32000,
          verified: true
        },
        {
          id: '3',
          name: 'Little Angels Care Center',
          location: 'São Paulo, Brazil',
          description: 'Providing comprehensive care including education, healthcare, and life skills training.',
          children: 95,
          urgentNeeds: ['Medical equipment', 'Sports equipment', 'Art supplies'],
          image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=500',
          rating: 4.9,
          totalDonations: 58000,
          verified: true
        },
        {
          id: '4',
          name: 'Rainbow Children\'s Village',
          location: 'Manila, Philippines',
          description: 'A community-based approach to childcare with focus on family-style living and education.',
          children: 150,
          urgentNeeds: ['Building repairs', 'Educational software', 'Kitchen equipment'],
          image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500',
          rating: 4.7,
          totalDonations: 41000,
          verified: true
        },
        {
          id: '5',
          name: 'Bright Future Home',
          location: 'Lagos, Nigeria',
          description: 'Empowering children through education, skills development, and emotional support programs.',
          children: 75,
          urgentNeeds: ['Solar panels', 'Library books', 'Medical supplies'],
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
          rating: 4.5,
          totalDonations: 28000,
          verified: true
        },
        {
          id: '6',
          name: 'Sacred Heart Children\'s Home',
          location: 'Dhaka, Bangladesh',
          description: 'Providing holistic care with emphasis on education, health, and spiritual development.',
          children: 110,
          urgentNeeds: ['Water purification system', 'Textbooks', 'Playground equipment'],
          image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500',
          rating: 4.8,
          totalDonations: 39000,
          verified: true
        }
      ];
      localStorage.setItem('orphanages', JSON.stringify(sampleOrphanages));
      setOrphanages(sampleOrphanages);
    }
  };

  const filterOrphanages = () => {
    let filtered = orphanages;

    if (searchTerm) {
      filtered = filtered.filter(orphanage =>
        orphanage.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        orphanage.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        orphanage.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedLocation) {
      filtered = filtered.filter(orphanage =>
        orphanage.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    setFilteredOrphanages(filtered);
  };

  const locations = [...new Set(orphanages.map(o => o.location.split(', ')[1]))].filter(Boolean);

  return (
    <>
      <Helmet>
        <title>Find Children's Homes & Orphanages - Hope Bridge</title>
        <meta name="description" content="Discover verified children's homes and orphanages worldwide. Search by location, view detailed profiles, and make direct donations to support vulnerable children." />
      </Helmet>

      <div className="min-h-screen pt-8">
        {/* Header */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">Discover</span> Children's Homes
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Connect with verified orphanages and children's homes worldwide. Every home has been carefully vetted to ensure your donations make a real impact.
              </p>
            </motion.div>

            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-card p-6 rounded-2xl mb-8"
            >
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, location, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Countries</option>
                  {locations.map(location => (
                    <option key={location} value={location} className="bg-slate-800">
                      {location}
                    </option>
                  ))}
                </select>

                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="border-white/30"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="border-white/30"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Results Summary */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-between items-center mb-8"
            >
              <p className="text-gray-300">
                Showing {filteredOrphanages.length} of {orphanages.length} children's homes
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{filteredOrphanages.reduce((sum, o) => sum + o.children, 0)} children</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="h-4 w-4" />
                  <span>${filteredOrphanages.reduce((sum, o) => sum + o.totalDonations, 0).toLocaleString()} raised</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Orphanages Grid */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredOrphanages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-16"
              >
                <div className="glass-card p-12 rounded-2xl max-w-md mx-auto">
                  <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Results Found</h3>
                  <p className="text-gray-300 mb-6">
                    Try adjusting your search criteria or browse all available homes.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedLocation('');
                    }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600"
                  >
                    Clear Filters
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div className={`grid gap-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredOrphanages.map((orphanage, index) => (
                  <motion.div
                    key={orphanage.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <OrphanageCard orphanage={orphanage} viewMode={viewMode} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default OrphanagesPage;