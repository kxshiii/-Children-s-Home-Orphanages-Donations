import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin } from 'lucide-react';

const HomeDetailsHeader = ({ home }) => (
  <section className="relative h-96 overflow-hidden">
    <img  className="w-full h-full object-cover" alt={`${home.name} - Children's home in ${home.location}`} src="https://images.unsplash.com/photo-1501729208101-cf4389dfe233" />
    <div className="absolute inset-0 bg-black/50"></div>
    <div className="absolute bottom-0 left-0 right-0 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <Badge className="bg-purple-600 text-white">
              {home.children} Children
            </Badge>
            <div className="flex items-center space-x-1">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="text-white font-medium">{home.rating}</span>
              <span className="text-gray-300">({home.reviews.length} reviews)</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{home.name}</h1>
          <p className="text-xl text-gray-200 flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            {home.location}
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

export default HomeDetailsHeader;