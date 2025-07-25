
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="glass-effect mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-pink-400" />
              <span className="text-2xl font-bold gradient-text">Hope Bridge</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Connecting hearts with children's homes worldwide. Together, we build brighter futures for vulnerable children through technology and compassion.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-pink-400 cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <span className="text-lg font-semibold text-white">Quick Links</span>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Home
              </Link>
              <Link to="/orphanages" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Find Orphanages
              </Link>
              <Link to="/donate" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Make Donation
              </Link>
              <Link to="/admin" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Admin Portal
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <span className="text-lg font-semibold text-white">Support</span>
            <div className="space-y-2">
              <p className="text-gray-300 hover:text-white transition-colors text-sm cursor-pointer">
                Help Center
              </p>
              <p className="text-gray-300 hover:text-white transition-colors text-sm cursor-pointer">
                Privacy Policy
              </p>
              <p className="text-gray-300 hover:text-white transition-colors text-sm cursor-pointer">
                Terms of Service
              </p>
              <p className="text-gray-300 hover:text-white transition-colors text-sm cursor-pointer">
                Contact Us
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <span className="text-lg font-semibold text-white">Contact</span>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300 text-sm">support@hopebridge.org</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300 text-sm">Global Operations</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Hope Bridge. All rights reserved. Built with ❤️ for children worldwide.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Empowering futures through technology and compassion.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;