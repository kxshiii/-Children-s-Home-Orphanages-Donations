import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Heart, DollarSign, User, Mail, Briefcase, Calendar, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { useChildrensHomes } from '@/hooks/useChildrensHomes'; 

const GetInvolved = () => {
  const [donationAmount, setDonationAmount] = useState('');
  const [selectedHomeId, setSelectedHomeId] = useState('');
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    skills: '',
    availability: ''
  });

  const { homes, loading } = useChildrensHomes();

  const handleDonation = (e) => {
    e.preventDefault();

    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      toast({ title: "Invalid Amount", description: "Please enter a valid donation amount.", variant: "destructive" });
      return;
    }

    if (!selectedHomeId) {
      toast({ title: "No Home Selected", description: "Please select a children's home to donate to.", variant: "destructive" });
      return;
    }

    const selectedHome = homes.find(home => home.id === selectedHomeId);

    toast({
      title: "Thank You!",
      description: `Your generous donation of $${donationAmount} to ${selectedHome?.name || 'a selected home'} is greatly appreciated.`,
    });

    setDonationAmount('');
    setSelectedHomeId('');
  };

  const handleVolunteerFormChange = (e) => {
    const { name, value } = e.target;
    setVolunteerForm(prev => ({ ...prev, [name]: value }));
  };

  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    if (!volunteerForm.name || !volunteerForm.email || !volunteerForm.skills || !volunteerForm.availability) {
      toast({ title: "Incomplete Form", description: "Please fill out all fields to volunteer.", variant: "destructive" });
      return;
    }

    toast({
      title: "Application Received!",
      description: "Thank you for your interest in volunteering. We will be in touch soon!"
    });

    setVolunteerForm({ name: '', email: '', skills: '', availability: '' });
  };

  return (
    <>
      <Helmet>
        <title>Get Involved - CareConnect</title>
        <meta name="description" content="Support children in need by making a donation or volunteering your time and skills with CareConnect." />
      </Helmet>

      <div className="min-h-screen">
        <section className="py-16 hero-pattern">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                Get Involved
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Your support can change lives. Choose how you want to make a difference today.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Donation Section */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="floating-card h-full">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center text-2xl">
                      <Heart className="h-6 w-6 mr-3 text-pink-400" />
                      Make a General Donation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-300">
                      Your one-time or recurring donation helps us provide essential resources, education, and support to children's homes across our network. Every contribution, big or small, makes a significant impact.
                    </p>
                    <form onSubmit={handleDonation} className="space-y-4">
                      
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          value={donationAmount}
                          onChange={(e) => setDonationAmount(e.target.value)}
                          className="input-field pl-10"
                        />
                      </div>

                      
                      <div className="grid grid-cols-3 gap-2">
                        {[25, 50, 100].map((amount) => (
                          <button key={amount} type="button" onClick={() => setDonationAmount(amount.toString())} className="glass-effect rounded-lg py-2 text-sm hover:bg-white/20 transition-colors">${amount}</button>
                        ))}
                      </div>

                      
                      <div>
                        <select
                          name="homeId"
                          value={selectedHomeId}
                          onChange={(e) => setSelectedHomeId(e.target.value)}
                          className="input-field w-full bg-black/30 text-white border border-gray-600 rounded-lg px-3 py-2"
                        >
                          <option value="">Select a Children’s Home</option>
                          {homes.map(home => (
                            <option className="h-6 w-6 mr-3 text-gray-400" key={home.id} value={home.id}>
                              {home.name} — {home.location}
                            </option>
                          ))}
                        </select>
                      </div>

                      <Button type="submit" className="w-full btn-primary text-lg py-3">
                        Donate Now
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="floating-card h-full">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center text-2xl">
                      <User className="h-6 w-6 mr-3 text-blue-400" />
                      Volunteer With Us
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-300">
                      Share your time and skills to directly impact the lives of children. We have various opportunities, from tutoring and mentoring to helping with events and administrative tasks.
                    </p>
                    <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input name="name" value={volunteerForm.name} onChange={handleVolunteerFormChange} placeholder="Full Name" className="input-field pl-10" />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input name="email" type="email" value={volunteerForm.email} onChange={handleVolunteerFormChange} placeholder="Email Address" className="input-field pl-10" />
                      </div>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input name="skills" value={volunteerForm.skills} onChange={handleVolunteerFormChange} placeholder="Skills (e.g., Teaching, Art, Sports)" className="input-field pl-10" />
                      </div>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input name="availability" value={volunteerForm.availability} onChange={handleVolunteerFormChange} placeholder="Availability (e.g., Weekends, Weekdays)" className="input-field pl-10" />
                      </div>
                      <Button type="submit" className="w-full btn-secondary text-lg py-3">
                        Submit Application <Send className="ml-2 h-5 w-5" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default GetInvolved;
