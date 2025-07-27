import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Users, MapPin, Star, ArrowRight, Shield, Globe, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useChildrensHomes } from '@/hooks/useChildrensHomes';

const Home = () => {
  const { homes, loading } = useChildrensHomes();

  const stats = [
    { icon: Heart, label: 'Children Helped', value: '500+', color: 'text-pink-500' },
    { icon: Users, label: 'Active Homes', value: homes.length.toString(), color: 'text-blue-500' },
    { icon: MapPin, label: 'Locations', value: '15+', color: 'text-green-500' },
    { icon: Star, label: 'Success Stories', value: '200+', color: 'text-yellow-500' }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Secure Donations',
      description: 'Your donations are processed securely and reach the children who need them most.'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Connect with children\'s homes across different regions and make a worldwide difference.'
    },
    {
      icon: Zap,
      title: 'Instant Updates',
      description: 'Get real-time updates on how your contributions are making a difference.'
    }
  ];

  const featuredHomes = homes.slice(0, 3);

  return (
    <>
      <Helmet>
        <title>CareConnect - Connecting Hearts to Children's Homes</title>
        <meta name="description" content="Join CareConnect to support children's homes and orphanages. Make donations, schedule visits, and help create brighter futures for children in need." />
      </Helmet>

      <div className="min-h-screen">
        
        <section className="relative min-h-screen flex items-center justify-center hero-pattern">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold hero-title">
                <span className="gradient-text">Connecting Hearts</span>
                <br />
                <span className="text-white">to Children's Homes</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto hero-subtitle">
                Join our mission to support vulnerable children by connecting with children's homes, 
                making donations, and creating lasting positive impact.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/homes">
                  <Button className="btn-primary text-lg px-8 py-4">
                    Explore Homes
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="btn-secondary text-lg px-8 py-4">
                    Join Our Mission
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="stats-card"
                >
                  <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-4`} />
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                Why Choose CareConnect?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We provide a secure, transparent, and impactful way to support children's homes worldwide.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="floating-card p-8 text-center"
                >
                  <feature.icon className="h-12 w-12 text-purple-400 mx-auto mb-6" />
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                Featured Children's Homes
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Discover some of the amazing children's homes making a difference in their communities.
              </p>
            </motion.div>

            {loading ? (
              <div className="flex justify-center">
                <div className="loading-spinner"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredHomes.map((home, index) => (
                  <motion.div
                    key={home.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Card className="donation-card">
                      <div className="relative h-48 overflow-hidden">
                        <img  className="w-full h-full object-cover" alt={`${home.name} - Children's home in ${home.location}`} src="https://images.unsplash.com/photo-1501729208101-cf4389dfe233" />
                        <div className="absolute top-4 right-4 glass-effect rounded-full px-3 py-1">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{home.rating}</span>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-white mb-2">{home.name}</h3>
                        <p className="text-gray-300 text-sm mb-4 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {home.location}
                        </p>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{home.description}</p>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">Children: {home.children}</span>
                            <span className="text-gray-300">Visits: {home.visits}</span>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-300">Donations</span>
                              <span className="text-white font-medium">
                                ${home.donationsReceived.toLocaleString()} / ${home.donationGoal.toLocaleString()}
                              </span>
                            </div>
                            <div className="progress-bar">
                              <div 
                                className="progress-fill"
                                style={{ width: `${(home.donationsReceived / home.donationGoal) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <Link to={`/homes/${home.id}`} className="block mt-6">
                          <Button className="w-full btn-primary">
                            Learn More
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link to="/homes">
                <Button className="btn-primary text-lg px-8 py-4">
                  View All Homes
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        
        <section className="py-20 relative">
          <div className="absolute inset-0 hero-pattern opacity-50"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="floating-card p-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of caring individuals who are already making a positive impact 
                in the lives of vulnerable children.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button className="btn-primary text-lg px-8 py-4">
                    Get Started Today
                  </Button>
                </Link>
                <Link to="/homes">
                  <Button className="btn-secondary text-lg px-8 py-4">
                    Browse Homes
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;