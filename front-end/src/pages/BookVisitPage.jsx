
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Calendar, Clock, Users, MapPin, Phone, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const BookVisitPage = () => {
  const { id } = useParams();
  const [orphanage, setOrphanage] = useState(null);
  const [visitInfo, setVisitInfo] = useState({
    date: '',
    time: '',
    visitors: 1,
    purpose: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'
  ];

  const visitPurposes = [
    'General Visit',
    'Volunteer Opportunity',
    'Donation Delivery',
    'Educational Tour',
    'Media/Documentation',
    'Partnership Discussion'
  ];

  useEffect(() => {
    loadOrphanageDetails();
  }, [id]);

  const loadOrphanageDetails = () => {
    const savedOrphanages = localStorage.getItem('orphanages');
    if (savedOrphanages) {
      const orphanages = JSON.parse(savedOrphanages);
      const foundOrphanage = orphanages.find(o => o.id === id);
      if (foundOrphanage) {
        setOrphanage(foundOrphanage);
      }
    }
  };

  const handleInputChange = (field, value) => {
    setVisitInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitVisit = () => {
    // Validation
    const requiredFields = ['date', 'time', 'purpose', 'name', 'email', 'phone'];
    const missingFields = requiredFields.filter(field => !visitInfo[field]);

    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Save visit request to localStorage
    const visitRequest = {
      id: Date.now().toString(),
      orphanageId: id,
      orphanageName: orphanage?.name || 'Unknown',
      ...visitInfo,
      status: 'pending',
      requestDate: new Date().toISOString()
    };

    const savedVisits = localStorage.getItem('visitRequests');
    const visits = savedVisits ? JSON.parse(savedVisits) : [];
    visits.push(visitRequest);
    localStorage.setItem('visitRequests', JSON.stringify(visits));

    setStep(2);
    toast({
      title: "Visit Request Submitted! 📅",
      description: "We'll contact you within 24 hours to confirm your visit.",
    });
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (!orphanage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-8 rounded-2xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Orphanage Not Found</h2>
          <p className="text-gray-300 mb-6">The orphanage you're trying to visit doesn't exist.</p>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
            Browse All Orphanages
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Book a Visit to {orphanage.name} - Hope Bridge</title>
        <meta name="description" content={`Schedule a visit to ${orphanage.name} in ${orphanage.location}. Experience firsthand the impact of your support and connect with the children and staff.`} />
      </Helmet>

      <div className="min-h-screen pt-8 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Book a</span> Visit
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience firsthand the impact of your support. Schedule a visit to connect with the children and see how your contributions make a difference.
            </p>
          </motion.div>

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Orphanage Info */}
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center space-x-4 mb-4">
                  <img  
                    alt={`${orphanage.name} - Children's home`}
                    className="w-16 h-16 rounded-lg object-cover"
                   src="https://images.unsplash.com/photo-1620752774482-f1f2c33dafcd" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{orphanage.name}</h3>
                    <div className="flex items-center space-x-1 text-gray-300 mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>{orphanage.location}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-blue-400 mt-1">
                      <Users className="h-4 w-4" />
                      <span>{orphanage.children} children</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-blue-400" />
                    <span className="font-medium text-blue-400">Visit Guidelines</span>
                  </div>
                  <ul className="text-blue-300 text-sm space-y-1">
                    <li>• Visits are available Monday to Friday, 9 AM to 5 PM</li>
                    <li>• Please arrive 15 minutes before your scheduled time</li>
                    <li>• Bring a valid ID for security purposes</li>
                    <li>• Photography requires prior permission</li>
                  </ul>
                </div>
              </div>

              {/* Visit Details */}
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-6">Visit Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      <Calendar className="inline h-4 w-4 mr-1" />
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      value={visitInfo.date}
                      min={getMinDate()}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      <Clock className="inline h-4 w-4 mr-1" />
                      Preferred Time *
                    </label>
                    <select
                      value={visitInfo.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select time</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time} className="bg-slate-800">
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Number of Visitors */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      <Users className="inline h-4 w-4 mr-1" />
                      Number of Visitors *
                    </label>
                    <select
                      value={visitInfo.visitors}
                      onChange={(e) => handleInputChange('visitors', parseInt(e.target.value))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <option key={num} value={num} className="bg-slate-800">
                          {num} {num === 1 ? 'person' : 'people'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Purpose */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Purpose of Visit *
                    </label>
                    <select
                      value={visitInfo.purpose}
                      onChange={(e) => handleInputChange('purpose', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select purpose</option>
                      {visitPurposes.map(purpose => (
                        <option key={purpose} value={purpose} className="bg-slate-800">
                          {purpose}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-6">Your Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={visitInfo.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      <Mail className="inline h-4 w-4 mr-1" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={visitInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white mb-2">
                      <Phone className="inline h-4 w-4 mr-1" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={visitInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white mb-2">
                      Additional Message (Optional)
                    </label>
                    <textarea
                      value={visitInfo.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Any special requests or additional information..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleSubmitVisit}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-3 text-lg"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Submit Visit Request
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="glass-card p-12 rounded-3xl max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-4">
                  Visit Request Submitted! 📅
                </h2>
                
                <p className="text-xl text-gray-300 mb-6">
                  Thank you for your interest in visiting {orphanage.name}.
                </p>
                
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-6 mb-8 text-left">
                  <h3 className="font-semibold text-blue-400 mb-4">Visit Details</h3>
                  <div className="space-y-2 text-blue-300">
                    <p><strong>Date:</strong> {visitInfo.date}</p>
                    <p><strong>Time:</strong> {visitInfo.time}</p>
                    <p><strong>Visitors:</strong> {visitInfo.visitors} {visitInfo.visitors === 1 ? 'person' : 'people'}</p>
                    <p><strong>Purpose:</strong> {visitInfo.purpose}</p>
                    <p><strong>Contact:</strong> {visitInfo.email}</p>
                  </div>
                </div>

                <p className="text-gray-300 mb-8">
                  We'll contact you within 24 hours at <span className="font-medium text-white">{visitInfo.email}</span> to confirm your visit and provide additional details.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => {
                      setStep(1);
                      setVisitInfo({
                        date: '',
                        time: '',
                        visitors: 1,
                        purpose: '',
                        name: '',
                        email: '',
                        phone: '',
                        message: ''
                      });
                    }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600"
                  >
                    Book Another Visit
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = '/orphanages'}
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    Browse More Homes
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookVisitPage;