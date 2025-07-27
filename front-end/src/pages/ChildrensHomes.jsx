import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Filter, Heart, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useChildrensHomes } from '@/hooks/useChildrensHomes';

const ChildrensHomes = () => {
  const { homes, loading } = useChildrensHomes();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const locations = [...new Set(homes.map(home => home.location))];

  const filteredHomes = homes
    .filter(home => 
      home.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      home.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(home => 
      selectedLocation === '' || home.location === selectedLocation
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'children':
          return b.children - a.children;
        case 'donations':
          return b.donationsReceived - a.donationsReceived;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <>
      <Helmet>
        <title>Children's Homes - CareConnect</title>
        <meta name="description" content="Browse and discover children's homes and orphanages. Find homes by location, read reviews, and make donations to support vulnerable children." />
      </Helmet>

      <div className="min-h-screen">
        {/* Header */}
        <section className="py-16 hero-pattern">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                Children's Homes Directory
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Discover and connect with children's homes making a difference in their communities.
              </p>
            </motion.div>
          </div>
        </section>

        
        <section className="py-8 border-b border-white/10 sticky top-16 bg-background/80 backdrop-blur-sm z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              
              <div className="relative flex-1 w-full lg:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10 w-full"
                />
              </div>

              
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="input-field w-full lg:w-auto min-w-[200px]"
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>

              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field w-full lg:w-auto min-w-[150px]"
              >
                <option value="name">Sort by Name</option>
                <option value="rating">Sort by Rating</option>
                <option value="children">Sort by Children</option>
                <option value="donations">Sort by Donations</option>
              </select>
            </div>
          </div>
        </section>

        
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="loading-spinner"></div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-semibold text-white">
                    {filteredHomes.length} Home{filteredHomes.length !== 1 ? 's' : ''} Found
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredHomes.map((home, index) => (
                    <motion.div
                      key={home.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="donation-card h-full flex flex-col">
                        <div className="relative h-48 overflow-hidden">
                          <img  className="w-full h-full object-cover" alt={`${home.name} - Children's home in ${home.location}`} src="https://images.unsplash.com/photo-1501729208101-cf4389dfe233" />
                          <div className="absolute top-4 right-4 glass-effect rounded-full px-3 py-1">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{home.rating}</span>
                            </div>
                          </div>
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-purple-600 text-white">
                              {home.children} Children
                            </Badge>
                          </div>
                        </div>

                        <CardContent className="p-6 flex flex-col flex-grow">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-white mb-2">{home.name}</h3>
                            <p className="text-gray-300 text-sm mb-3 flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {home.location}
                            </p>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-3">{home.description}</p>
                            
                            <div className="mb-4">
                              <p className="text-sm font-medium text-white mb-2">Urgent Needs:</p>
                              <div className="flex flex-wrap gap-1">
                                {home.urgentNeeds.slice(0, 3).map((need, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {need}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-2 mb-6">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-300">Donation Progress</span>
                                <span className="text-white font-medium">
                                  {Math.round((home.donationsReceived / home.donationGoal) * 100)}%
                                </span>
                              </div>
                              <div className="progress-bar">
                                <div 
                                  className="progress-fill"
                                  style={{ width: `${(home.donationsReceived / home.donationGoal) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>

                          <Link to={`/homes/${home.id}`} className="block mt-auto">
                            <Button className="w-full btn-primary">
                              View Details
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {filteredHomes.length === 0 && (
                  <div className="text-center py-20">
                    <div className="glass-effect rounded-2xl p-12 max-w-md mx-auto">
                      <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">No homes found</h3>
                      <p className="text-gray-400">
                        Try adjusting your search criteria or browse all available homes.
                      </p>
                      <Button 
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedLocation('');
                        }}
                        className="btn-primary mt-4"
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ChildrensHomes;