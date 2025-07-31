import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, DollarSign, Users, Home, 
  Calendar, Star, Heart, Activity, MapPin, BarChart3,
  PieChart, LineChart, Target, Award, AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useChildrensHomes } from '@/hooks/useChildrensHomes';

const Analytics = () => {
  const { homes, loading } = useChildrensHomes();
  const [timeRange, setTimeRange] = useState('month');

  // Calculate analytics data
  const totalChildren = homes.reduce((sum, home) => sum + home.children, 0);
  const totalDonations = homes.reduce((sum, home) => sum + home.donationsReceived, 0);
  const totalGoal = homes.reduce((sum, home) => sum + home.donationGoal, 0);
  const totalVisits = homes.reduce((sum, home) => sum + home.visits, 0);
  const averageRating = homes.length > 0 
    ? homes.reduce((sum, home) => sum + home.rating, 0) / homes.length 
    : 0;

  // Growth calculations (simulated data)
  const monthlyGrowth = 12.5;
  const donationGrowth = 8.3;
  const visitGrowth = 15.2;
  const ratingGrowth = 2.1;

  // Top performing homes
  const topPerformingHomes = [...homes]
    .sort((a, b) => b.donationsReceived - a.donationsReceived)
    .slice(0, 5);

  // Homes needing urgent attention
  const urgentNeedsHomes = homes.filter(home => 
    home.donationsReceived < home.donationGoal * 0.3
  );

  // Regional distribution
  const regionalData = homes.reduce((acc, home) => {
    const region = home.location.split(',')[0].trim();
    acc[region] = (acc[region] || 0) + 1;
    return acc;
  }, {});

  // Monthly trends (simulated data)
  const monthlyTrends = [
    { month: 'Jan', donations: 45000, visits: 120, children: 180 },
    { month: 'Feb', donations: 52000, visits: 135, children: 195 },
    { month: 'Mar', donations: 48000, visits: 110, children: 175 },
    { month: 'Apr', donations: 61000, visits: 150, children: 220 },
    { month: 'May', donations: 58000, visits: 140, children: 210 },
    { month: 'Jun', donations: 67000, visits: 165, children: 240 }
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
        <title>Analytics - CareConnect Admin</title>
        <meta name="description" content="Comprehensive analytics and insights for the CareConnect platform." />
      </Helmet>

      <div className="min-h-screen">
        {/* Header */}
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
                    Analytics Dashboard
                  </h1>
                  <p className="text-gray-300">
                    Comprehensive insights and performance metrics
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    onClick={() => setTimeRange('week')}
                    variant={timeRange === 'week' ? 'default' : 'outline'}
                    size="sm"
                  >
                    Week
                  </Button>
                  <Button
                    onClick={() => setTimeRange('month')}
                    variant={timeRange === 'month' ? 'default' : 'outline'}
                    size="sm"
                  >
                    Month
                  </Button>
                  <Button
                    onClick={() => setTimeRange('year')}
                    variant={timeRange === 'year' ? 'default' : 'outline'}
                    size="sm"
                  >
                    Year
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="admin-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm font-medium">Total Donations</p>
                        <p className="text-2xl font-bold text-white mt-1">
                          KES {totalDonations.toLocaleString()}
                        </p>
                        <div className="flex items-center mt-2">
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-green-500 text-sm">+{donationGrowth}%</span>
                        </div>
                      </div>
                      <div className="p-3 rounded-full bg-green-500/10">
                        <DollarSign className="h-6 w-6 text-green-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="admin-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm font-medium">Total Children</p>
                        <p className="text-2xl font-bold text-white mt-1">{totalChildren}</p>
                        <div className="flex items-center mt-2">
                          <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
                          <span className="text-blue-500 text-sm">+{monthlyGrowth}%</span>
                        </div>
                      </div>
                      <div className="p-3 rounded-full bg-blue-500/10">
                        <Users className="h-6 w-6 text-blue-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="admin-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm font-medium">Total Visits</p>
                        <p className="text-2xl font-bold text-white mt-1">{totalVisits}</p>
                        <div className="flex items-center mt-2">
                          <TrendingUp className="h-4 w-4 text-purple-500 mr-1" />
                          <span className="text-purple-500 text-sm">+{visitGrowth}%</span>
                        </div>
                      </div>
                      <div className="p-3 rounded-full bg-purple-500/10">
                        <Calendar className="h-6 w-6 text-purple-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="admin-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm font-medium">Avg Rating</p>
                        <p className="text-2xl font-bold text-white mt-1">{averageRating.toFixed(1)}</p>
                        <div className="flex items-center mt-2">
                          <TrendingUp className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-yellow-500 text-sm">+{ratingGrowth}%</span>
                        </div>
                      </div>
                      <div className="p-3 rounded-full bg-yellow-500/10">
                        <Star className="h-6 w-6 text-yellow-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Charts and Insights */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Monthly Trends Chart */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="admin-card h-full">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <LineChart className="h-5 w-5 mr-2 text-blue-500" />
                      Monthly Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {monthlyTrends.map((trend, index) => (
                        <div key={trend.month} className="flex items-center justify-between p-3 glass-effect rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 text-center">
                              <p className="text-white font-medium">{trend.month}</p>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">Donations: KES {trend.donations.toLocaleString()}</span>
                                <span className="text-gray-400">Visits: {trend.visits}</span>
                              </div>
                              <div className="mt-1 bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                                  style={{ width: `${(trend.donations / 70000) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Regional Distribution */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card className="admin-card h-full">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <PieChart className="h-5 w-5 mr-2 text-green-500" />
                      Regional Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(regionalData).map(([region, count], index) => (
                        <div key={region} className="flex items-center justify-between p-3 glass-effect rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full text-white text-sm font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <p className="text-white font-medium">{region}</p>
                              <p className="text-gray-400 text-sm">{count} homes</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-semibold">{count}</p>
                            <p className="text-gray-400 text-sm">
                              {Math.round((count / homes.length) * 100)}%
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Performance Insights */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Top Performing Homes */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Card className="admin-card h-full">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Award className="h-5 w-5 mr-2 text-yellow-500" />
                      Top Performing Homes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {topPerformingHomes.map((home, index) => (
                      <div key={home.id} className="flex items-center justify-between p-3 glass-effect rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-white text-sm font-bold">
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

              {/* Urgent Needs */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Card className="admin-card h-full">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                      Homes Needing Attention
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {urgentNeedsHomes.map((home, index) => (
                      <div key={home.id} className="flex items-center justify-between p-3 glass-effect rounded-lg border border-red-500/20">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-white text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="text-white font-medium">{home.name}</p>
                            <p className="text-gray-400 text-sm flex items-center">
                              <Target className="h-3 w-3 mr-1" />
                              Goal: KES {home.donationGoal.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-red-400 font-semibold">KES {home.donationsReceived.toLocaleString()}</p>
                          <p className="text-gray-400 text-sm">
                            {Math.round((home.donationsReceived / home.donationGoal) * 100)}% of goal
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Goal Progress */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Card className="admin-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Target className="h-5 w-5 mr-2 text-green-500" />
                    Overall Donation Goal Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Total Goal</span>
                      <span className="text-white font-semibold">KES {totalGoal.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Total Raised</span>
                      <span className="text-white font-semibold">KES {totalDonations.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-4">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((totalDonations / totalGoal) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-white">
                        {Math.round((totalDonations / totalGoal) * 100)}%
                      </span>
                      <p className="text-gray-400 text-sm">of total goal achieved</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Analytics;