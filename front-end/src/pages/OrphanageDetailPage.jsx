
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { 
  MapPin, Users, Heart, Star, Shield, Calendar, 
  Phone, Mail, Globe, ArrowLeft, Camera, Award,
  Target, BookOpen, Stethoscope, Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const OrphanageDetailPage = () => {
  const { id } = useParams();
  const [orphanage, setOrphanage] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  useEffect(() => {
    loadOrphanageDetails();
    loadReviews();
  }, [id]);

  const loadOrphanageDetails = () => {
    const savedOrphanages = localStorage.getItem('orphanages');
    if (savedOrphanages) {
      const orphanages = JSON.parse(savedOrphanages);
      const foundOrphanage = orphanages.find(o => o.id === id);
      if (foundOrphanage) {
        setOrphanage({
          ...foundOrphanage,
          fullDescription: `${foundOrphanage.description} Our mission is to provide a safe, nurturing environment where children can grow, learn, and develop into confident, capable individuals. We believe every child deserves love, education, and the opportunity to reach their full potential.`,
          established: '2010',
          contact: {
            phone: '+1 (555) 123-4567',
            email: 'info@orphanage.org',
            website: 'www.orphanage.org'
          },
          programs: [
            'Primary & Secondary Education',
            'Vocational Training',
            'Healthcare Services',
            'Psychological Support',
            'Sports & Recreation',
            'Life Skills Training'
          ],
          achievements: [
            '95% school completion rate',
            '50+ children successfully integrated into families',
            'Award for Excellence in Child Care 2023',
            'ISO 9001 Quality Management Certification'
          ]
        });
      }
    }
  };

  const loadReviews = () => {
    const savedReviews = localStorage.getItem(`reviews_${id}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      // Sample reviews
      const sampleReviews = [
        {
          id: '1',
          author: 'Sarah Johnson',
          rating: 5,
          date: '2024-01-15',
          comment: 'Amazing organization! I visited last month and was impressed by the care and dedication of the staff. The children are happy and well-cared for.',
          verified: true
        },
        {
          id: '2',
          author: 'Michael Chen',
          rating: 5,
          date: '2024-01-10',
          comment: 'Transparent use of donations and excellent communication. I\'ve been supporting this home for 2 years and have seen real impact.',
          verified: true
        },
        {
          id: '3',
          author: 'Emma Rodriguez',
          rating: 4,
          date: '2024-01-05',
          comment: 'Great work being done here. The educational programs are particularly impressive. Would love to see more recreational activities.',
          verified: false
        }
      ];
      localStorage.setItem(`reviews_${id}`, JSON.stringify(sampleReviews));
      setReviews(sampleReviews);
    }
  };

  const handleBookVisit = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  if (!orphanage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-8 rounded-2xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Orphanage Not Found</h2>
          <p className="text-gray-300 mb-6">The orphanage you're looking for doesn't exist.</p>
          <Link to="/orphanages">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
              Browse All Orphanages
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'programs', label: 'Programs', icon: BookOpen },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'contact', label: 'Contact', icon: Phone }
  ];

  return (
    <>
      <Helmet>
        <title>{orphanage.name} - Children's Home Details | Hope Bridge</title>
        <meta name="description" content={`Learn about ${orphanage.name} in ${orphanage.location}. Supporting ${orphanage.children} children with education, healthcare, and emotional support. Make a donation or book a visit.`} />
      </Helmet>

      <div className="min-h-screen pt-8">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <Link to="/orphanages">
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orphanages
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="relative mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card rounded-3xl overflow-hidden">
              <div className="relative h-64 md:h-80">
                <img  
                  alt={`${orphanage.name} - Main building and grounds`}
                  className="w-full h-full object-cover"
                 src="https://images.unsplash.com/photo-1620125597736-b5ca56f540a3" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {orphanage.verified && (
                  <div className="absolute top-6 left-6 bg-green-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <span>Verified Organization</span>
                  </div>
                )}
                
                <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{orphanage.rating} ({reviews.length} reviews)</span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      {orphanage.name}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <div className="flex items-center space-x-2 text-gray-300">
                        <MapPin className="h-5 w-5" />
                        <span>{orphanage.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-blue-400">
                        <Users className="h-5 w-5" />
                        <span>{orphanage.children} children</span>
                      </div>
                      <div className="flex items-center space-x-2 text-green-400">
                        <Heart className="h-5 w-5" />
                        <span>${orphanage.totalDonations.toLocaleString()} raised</span>
                      </div>
                      <div className="flex items-center space-x-2 text-purple-400">
                        <Calendar className="h-5 w-5" />
                        <span>Est. {orphanage.established}</span>
                      </div>
                    </div>

                    <p className="text-gray-300 leading-relaxed mb-6">
                      {orphanage.fullDescription}
                    </p>
                  </div>

                  <div className="lg:w-80">
                    <div className="glass-card p-6 rounded-2xl space-y-4">
                      <h3 className="text-lg font-semibold text-white mb-4">Take Action</h3>
                      
                      <Link to={`/donate/${orphanage.id}`} className="block">
                        <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 mb-3">
                          <Heart className="mr-2 h-4 w-4" />
                          Make a Donation
                        </Button>
                      </Link>
                      
                      <Button 
                        variant="outline" 
                        className="w-full border-white/30 text-white hover:bg-white/10"
                        onClick={handleBookVisit}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Book a Visit
                      </Button>
                    </div>

                    {orphanage.urgentNeeds && orphanage.urgentNeeds.length > 0 && (
                      <div className="glass-card p-6 rounded-2xl mt-4">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                          <Target className="mr-2 h-5 w-5 text-red-400" />
                          Urgent Needs
                        </h3>
                        <div className="space-y-2">
                          {orphanage.urgentNeeds.map((need, index) => (
                            <div key={index} className="bg-red-500/20 text-red-300 px-3 py-2 rounded-lg text-sm">
                              {need}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card rounded-2xl overflow-hidden">
              {/* Tab Navigation */}
              <div className="border-b border-white/20">
                <div className="flex overflow-x-auto scrollbar-hide">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                        activeTab === tab.id
                          ? 'text-blue-400 border-b-2 border-blue-400'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">About Our Mission</h3>
                      <p className="text-gray-300 leading-relaxed">
                        {orphanage.fullDescription}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                        <Award className="mr-2 h-5 w-5 text-yellow-400" />
                        Achievements & Recognition
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {orphanage.achievements.map((achievement, index) => (
                          <div key={index} className="bg-white/5 p-4 rounded-lg">
                            <p className="text-gray-300">{achievement}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'programs' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-semibold text-white mb-6">Our Programs & Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {orphanage.programs.map((program, index) => (
                        <div key={index} className="bg-white/5 p-6 rounded-lg hover:bg-white/10 transition-colors">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                              <BookOpen className="h-5 w-5 text-white" />
                            </div>
                            <h4 className="font-semibold text-white">{program}</h4>
                          </div>
                          <p className="text-gray-300 text-sm">
                            Comprehensive program designed to support children's development and future success.
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'reviews' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-white">Reviews & Testimonials</h3>
                      <div className="flex items-center space-x-2">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-white font-medium">{orphanage.rating}</span>
                        <span className="text-gray-300">({reviews.length} reviews)</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div key={review.id} className="bg-white/5 p-6 rounded-lg">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-medium text-white">{review.author}</h4>
                                {review.verified && (
                                  <Shield className="h-4 w-4 text-green-400" />
                                )}
                              </div>
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-400'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-gray-400 text-sm">{review.date}</span>
                          </div>
                          <p className="text-gray-300">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'contact' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Phone className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-medium">Phone</p>
                            <p className="text-gray-300">{orphanage.contact.phone}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <Mail className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-medium">Email</p>
                            <p className="text-gray-300">{orphanage.contact.email}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                            <Globe className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-medium">Website</p>
                            <p className="text-gray-300">{orphanage.contact.website}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
                            <MapPin className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-medium">Address</p>
                            <p className="text-gray-300">{orphanage.location}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/5 p-6 rounded-lg">
                        <h4 className="text-lg font-semibold text-white mb-4">Visit Us</h4>
                        <p className="text-gray-300 mb-4">
                          We welcome visitors who want to learn more about our work and see the impact of their support firsthand.
                        </p>
                        <Button 
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
                          onClick={handleBookVisit}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule a Visit
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default OrphanageDetailPage;