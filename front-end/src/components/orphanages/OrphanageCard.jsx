
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Users, Heart, Star, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OrphanageCard = ({ orphanage, viewMode = 'grid' }) => {
  const isListView = viewMode === 'list';

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`glass-card rounded-2xl overflow-hidden hover-glow group ${
        isListView ? 'flex flex-col md:flex-row' : ''
      }`}
    >
      <div className={`relative ${isListView ? 'md:w-1/3' : ''}`}>
        <img  
          alt={`${orphanage.name} - Children's home providing care and education`}
          className={`w-full object-cover ${isListView ? 'h-48 md:h-full' : 'h-48'}`}
         src="https://images.unsplash.com/photo-1608803238528-16ca3cf5c0c2" />
        
        {orphanage.verified && (
          <div className="absolute top-4 left-4 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <Shield className="h-3 w-3" />
            <span>Verified</span>
          </div>
        )}
        
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span>{orphanage.rating}</span>
        </div>
      </div>

      <div className={`p-6 ${isListView ? 'md:w-2/3 flex flex-col justify-between' : ''}`}>
        <div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {orphanage.name}
          </h3>
          
          <div className="flex items-center space-x-1 text-gray-300 mb-3">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{orphanage.location}</span>
          </div>

          <p className="text-gray-300 text-sm mb-4 leading-relaxed">
            {orphanage.description}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-1 text-blue-400">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">{orphanage.children} children</span>
            </div>
            <div className="flex items-center space-x-1 text-green-400">
              <Heart className="h-4 w-4" />
              <span className="text-sm font-medium">${orphanage.totalDonations.toLocaleString()} raised</span>
            </div>
          </div>

          {orphanage.urgentNeeds && orphanage.urgentNeeds.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-400 mb-2">Urgent Needs:</p>
              <div className="flex flex-wrap gap-1">
                {orphanage.urgentNeeds.slice(0, 3).map((need, index) => (
                  <span
                    key={index}
                    className="bg-red-500/20 text-red-300 px-2 py-1 rounded-full text-xs"
                  >
                    {need}
                  </span>
                ))}
                {orphanage.urgentNeeds.length > 3 && (
                  <span className="text-gray-400 text-xs">+{orphanage.urgentNeeds.length - 3} more</span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className={`flex gap-3 ${isListView ? 'mt-4' : ''}`}>
          <Link to={`/orphanage/${orphanage.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full border-white/30 text-white hover:bg-white/10">
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to={`/donate/${orphanage.id}`}>
            <Button size="sm" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
              <Heart className="mr-2 h-4 w-4" />
              Donate
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default OrphanageCard;