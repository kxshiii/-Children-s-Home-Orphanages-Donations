
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Heart, CreditCard, Shield, Users, Target, CheckCircle, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const DonationPage = () => {
  const { id } = useParams();
  const [orphanage, setOrphanage] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    message: '',
    anonymous: false
  });
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const predefinedAmounts = [25, 50, 100, 250, 500, 1000];

  useEffect(() => {
    if (id) {
      loadOrphanageDetails();
    }
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

  const handleAmountSelect = (amount) => {
    setDonationAmount(amount.toString());
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value) => {
    setCustomAmount(value);
    setDonationAmount(value);
  };

  const handleDonorInfoChange = (field, value) => {
    setDonorInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitDonation = () => {
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount.",
        variant: "destructive"
      });
      return;
    }

    if (!donorInfo.name || !donorInfo.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Save donation to localStorage
    const donation = {
      id: Date.now().toString(),
      orphanageId: id,
      orphanageName: orphanage?.name || 'General Fund',
      amount: parseFloat(donationAmount),
      type: donationType,
      donor: donorInfo,
      date: new Date().toISOString(),
      status: 'completed'
    };

    const savedDonations = localStorage.getItem('donations');
    const donations = savedDonations ? JSON.parse(savedDonations) : [];
    donations.push(donation);
    localStorage.setItem('donations', JSON.stringify(donations));

    // Update orphanage total donations
    if (orphanage) {
      const savedOrphanages = localStorage.getItem('orphanages');
      if (savedOrphanages) {
        const orphanages = JSON.parse(savedOrphanages);
        const updatedOrphanages = orphanages.map(o => 
          o.id === id 
            ? { ...o, totalDonations: o.totalDonations + parseFloat(donationAmount) }
            : o
        );
        localStorage.setItem('orphanages', JSON.stringify(updatedOrphanages));
      }
    }

    setStep(3);
    toast({
      title: "Donation Successful! 🎉",
      description: `Thank you for your generous donation of $${donationAmount}!`,
    });
  };

  const getImpactMessage = (amount) => {
    const value = parseFloat(amount);
    if (value >= 1000) return "Can provide comprehensive care for a child for 2 months";
    if (value >= 500) return "Can provide educational materials for 10 children";
    if (value >= 250) return "Can provide nutritious meals for a child for 1 month";
    if (value >= 100) return "Can provide school supplies for 5 children";
    if (value >= 50) return "Can provide medical care for 2 children";
    if (value >= 25) return "Can provide nutritious meals for a child for 1 week";
    return "Every dollar makes a difference in a child's life";
  };

  return (
    <>
      <Helmet>
        <title>{orphanage ? `Donate to ${orphanage.name}` : 'Make a Donation'} - Hope Bridge</title>
        <meta name="description" content={`Make a secure donation to ${orphanage?.name || 'children in need'}. Your contribution directly supports education, healthcare, and emotional support for vulnerable children.`} />
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
              <span className="gradient-text">Make a</span> Difference
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {orphanage 
                ? `Support ${orphanage.name} and help transform the lives of ${orphanage.children} children.`
                : 'Your donation helps provide education, healthcare, and hope to children in need worldwide.'
              }
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
              {orphanage && (
                <div className="glass-card p-6 rounded-2xl">
                  <div className="flex items-center space-x-4 mb-4">
                    <img  
                      alt={`${orphanage.name} - Children's home`}
                      className="w-16 h-16 rounded-lg object-cover"
                     src="https://images.unsplash.com/photo-1620752774482-f1f2c33dafcd" />
                    <div>
                      <h3 className="text-xl font-bold text-white">{orphanage.name}</h3>
                      <p className="text-gray-300">{orphanage.location}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1 text-blue-400">
                          <Users className="h-4 w-4" />
                          <span className="text-sm">{orphanage.children} children</span>
                        </div>
                        <div className="flex items-center space-x-1 text-green-400">
                          <Heart className="h-4 w-4" />
                          <span className="text-sm">${orphanage.totalDonations.toLocaleString()} raised</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {orphanage.urgentNeeds && orphanage.urgentNeeds.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Current urgent needs:</p>
                      <div className="flex flex-wrap gap-2">
                        {orphanage.urgentNeeds.map((need, index) => (
                          <span key={index} className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm">
                            {need}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Donation Type */}
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4">Donation Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setDonationType('one-time')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      donationType === 'one-time'
                        ? 'border-blue-500 bg-blue-500/20'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <Gift className="h-6 w-6 text-blue-400 mb-2" />
                    <h4 className="font-semibold text-white">One-time Donation</h4>
                    <p className="text-gray-300 text-sm">Make a single donation</p>
                  </button>
                  
                  <button
                    onClick={() => setDonationType('monthly')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      donationType === 'monthly'
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <Heart className="h-6 w-6 text-purple-400 mb-2" />
                    <h4 className="font-semibold text-white">Monthly Giving</h4>
                    <p className="text-gray-300 text-sm">Ongoing monthly support</p>
                  </button>
                </div>
              </div>

              {/* Amount Selection */}
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4">Choose Amount</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleAmountSelect(amount)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        donationAmount === amount.toString()
                          ? 'border-blue-500 bg-blue-500/20'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <div className="text-2xl font-bold text-white">${amount}</div>
                      <div className="text-xs text-gray-300 mt-1">
                        {getImpactMessage(amount.toString()).split(' ').slice(0, 4).join(' ')}...
                      </div>
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Custom Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                      <input
                        type="number"
                        value={customAmount}
                        onChange={(e) => handleCustomAmountChange(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full pl-8 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {donationAmount && (
                    <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="h-5 w-5 text-green-400" />
                        <span className="font-medium text-green-400">Your Impact</span>
                      </div>
                      <p className="text-green-300 text-sm">
                        ${donationAmount} {getImpactMessage(donationAmount)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!donationAmount || parseFloat(donationAmount) <= 0}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-3 text-lg"
                >
                  Continue to Details
                  <Heart className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Donation Summary */}
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4">Donation Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Amount:</span>
                    <span className="text-white font-semibold">${donationAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Type:</span>
                    <span className="text-white font-semibold capitalize">{donationType.replace('-', ' ')}</span>
                  </div>
                  {orphanage && (
                    <div className="flex justify-between">
                      <span className="text-gray-300">Beneficiary:</span>
                      <span className="text-white font-semibold">{orphanage.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Donor Information */}
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4">Your Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={donorInfo.name}
                      onChange={(e) => handleDonorInfoChange('name', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={donorInfo.email}
                      onChange={(e) => handleDonorInfoChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      value={donorInfo.message}
                      onChange={(e) => handleDonorInfoChange('message', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Leave a message of support..."
                    />
                  </div>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={donorInfo.anonymous}
                      onChange={(e) => handleDonorInfoChange('anonymous', e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                    />
                    <span className="text-white">Make this donation anonymous</span>
                  </label>
                </div>
              </div>

              {/* Security Notice */}
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center space-x-3 mb-3">
                  <Shield className="h-6 w-6 text-green-400" />
                  <h3 className="text-lg font-semibold text-white">Secure Donation</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Your donation is processed securely. We use industry-standard encryption to protect your information and ensure 100% of your donation reaches the intended recipients.
                </p>
              </div>

              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 border-white/30 text-white hover:bg-white/10"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmitDonation}
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Complete Donation
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
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
                  Thank You for Your Generosity! 🎉
                </h2>
                
                <p className="text-xl text-gray-300 mb-6">
                  Your donation of <span className="font-bold text-green-400">${donationAmount}</span> has been successfully processed.
                </p>
                
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-6 mb-8">
                  <h3 className="font-semibold text-green-400 mb-2">Your Impact</h3>
                  <p className="text-green-300">
                    {getImpactMessage(donationAmount)}
                  </p>
                </div>

                <p className="text-gray-300 mb-8">
                  A confirmation email has been sent to <span className="font-medium text-white">{donorInfo.email}</span>. 
                  You'll receive updates on how your donation is making a difference.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => {
                      setStep(1);
                      setDonationAmount('');
                      setCustomAmount('');
                      setDonorInfo({ name: '', email: '', message: '', anonymous: false });
                    }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600"
                  >
                    Make Another Donation
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

export default DonationPage;