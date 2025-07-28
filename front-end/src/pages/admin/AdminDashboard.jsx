import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Users, Home, Heart, TrendingUp, Calendar, 
  DollarSign, MapPin, Star, Award, Activity, Settings 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useChildrensHomes } from '@/hooks/useChildrensHomes';
import HomesManagement from '@/components/admin/HomesManagement';

const AdminDashboard = () => {
  const { homes, loading } = useChildrensHomes();
  const [activeTab, setActiveTab] = useState('dashboard');

  const totalChildren = homes.reduce((sum, home) => sum + home.children, 0);
  const totalDonations = homes.reduce((sum, home) => sum + home.donationsReceived, 0);
  const totalVisits = homes.reduce((sum, home) => sum + home.visits, 0);
  const averageRating = homes.length > 0 
    ? homes.reduce((sum, home) => sum + home.rating, 0) / homes.length 
    : 0;

  const topPerformingHomes = [...homes]
    .sort((a, b) => b.donationsReceived - a.donationsReceived)
    .slice(0, 5);

  const mostVisitedHomes = [...homes]
    .sort((a, b) => b.visits - a.visits)
    .slice(0, 5);

  const urgentNeedsHomes = homes.filter(home => 
    home.donationsReceived < home.donationGoal * 0.5
  );

  const stats = [
    {
      title: 'Total Children',
      value: totalChildren.toString(),
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Active Homes',
      value: homes.length.toString(),
      icon: Home,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Total Donations',
      value: `$${totalDonations.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      title: 'Total Visits',
      value: totalVisits.toString(),
      icon: Calendar,
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10'
    },
    {
      title: 'Average Rating',
      value: averageRating.toFixed(1),
      icon: Star,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      title: 'Urgent Needs',
      value: urgentNeedsHomes.length.toString(),
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - CareConnect</title>
        <meta name="description" content="Admin dashboard for managing children's homes, viewing analytics, and monitoring platform performance." />
      </Helmet>

      <div className="min-h-screen">
        
        <section className="py-8 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                    Admin Dashboard
                  </h1>
                  <p className="text-gray-300">
                    Monitor and manage the CareConnect platform
                  </p>
                </div>
                
                {/* Navigation Tabs */}
                <div className="flex space-x-2">
                  <Button
                    onClick={() => setActiveTab('dashboard')}
                    variant={activeTab === 'dashboard' ? 'default' : 'outline'}
                    className={activeTab === 'dashboard' ? 'btn-primary' : ''}
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button
                    onClick={() => setActiveTab('homes')}
                    variant={activeTab === 'homes' ? 'default' : 'outline'}
                    className={activeTab === 'homes' ? 'btn-primary' : ''}
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Manage Homes
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content based on active tab */}
        {activeTab === 'dashboard' && (
          <>
            {/* Stats Grid */}
            <section className="py-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.title}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="admin-card">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-full ${stat.bgColor}`}>
                              <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            
            <section className="py-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <Card className="admin-card h-full">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                          Top Performing Homes (Donations)
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {topPerformingHomes.map((home, index) => (
                          <div key={home.id} className="flex items-center justify-between p-3 glass-effect rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full text-white text-sm font-bold">
                                {index + 1}
                              </div>
                              <div>
                                <p className="text-white font-medium">{home.name}</p>
                                <p className="text-gray-400 text-sm flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {home.location}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-white font-semibold">KES {home.donationsReceived.toLocaleString()}</p>
                              <p className="text-gray-400 text-sm">
                                {Math.round((home.donationsReceived / home.donationGoal) * 100)}% of goal
                              </p>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>

                  
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <Card className="admin-card h-full">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <Activity className="h-5 w-5 mr-2 text-blue-500" />
                          Most Visited Homes
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {mostVisitedHomes.map((home, index) => (
                          <div key={home.id} className="flex items-center justify-between p-3 glass-effect rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white text-sm font-bold">
                                {index + 1}
                              </div>
                              <div>
                                <p className="text-white font-medium">{home.name}</p>
                                <p className="text-gray-400 text-sm flex items-center">
                                  <Star className="h-3 w-3 mr-1 text-yellow-400" />
                                  {home.rating} rating
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-white font-semibold">{home.visits} visits</p>
                              <p className="text-gray-400 text-sm">{home.children} children</p>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Homes Management Tab */}
        {activeTab === 'homes' && (
          <section className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <HomesManagement />
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;