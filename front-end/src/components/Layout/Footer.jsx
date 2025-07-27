import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="glass-effect border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-pink-500" />
              <span className="text-xl font-bold gradient-text">CareConnect</span>
            </div>
            <p className="text-gray-300 text-sm">
              Connecting hearts and homes to create brighter futures for children in need.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          
          <div className="space-y-4">
            <span className="text-lg font-semibold text-white">Quick Links</span>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Home
              </Link>
              <Link to="/homes" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Children's Homes
              </Link>
              <Link to="/get-involved" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Get Involved
              </Link>
              <Link to="/about" className="block text-gray-300 hover:text-white transition-colors text-sm">
                About Us
              </Link>
            </div>
          </div>

          
          <div className="space-y-4">
            <span className="text-lg font-semibold text-white">Support</span>
            <div className="space-y-2">
              <Link to="/get-involved" className="block text-gray-300 text-sm cursor-pointer hover:text-white transition-colors">
                How to Donate
              </Link>
              <Link to="/get-involved" className="block text-gray-300 text-sm cursor-pointer hover:text-white transition-colors">
                Volunteer
              </Link>
              <span className="block text-gray-300 text-sm cursor-pointer hover:text-white transition-colors">
                FAQ
              </span>
              <span className="block text-gray-300 text-sm cursor-pointer hover:text-white transition-colors">
                Privacy Policy
              </span>
            </div>
          </div>

          
          <div className="space-y-4">
            <span className="text-lg font-semibold text-white">Contact Info</span>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300 text-sm">info@careconnect.org</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300 text-sm">+254 700 123 456</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300 text-sm">Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 CareConnect. All rights reserved. Made with ❤️ for children in need.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;