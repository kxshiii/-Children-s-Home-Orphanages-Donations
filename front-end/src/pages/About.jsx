import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Heart, Users, Target, Award, Star, 
  MapPin, Phone, Mail, Globe, Shield,
  Lightbulb, Gift, Home, Users2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  const stats = [
    { icon: Users, value: '500+', label: 'Children Helped', color: 'text-blue-500' },
    { icon: Home, value: '15+', label: 'Children\'s Homes', color: 'text-green-500' },
    { icon: Gift, value: 'KES 2M+', label: 'Total Donations', color: 'text-purple-500' },
    { icon: Star, value: '200+', label: 'Success Stories', color: 'text-yellow-500' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We believe every child deserves love, care, and support regardless of their circumstances.',
      color: 'text-pink-500'
    },
    {
      icon: Shield,
      title: 'Transparency',
      description: 'We ensure complete transparency in how donations are used and impact achieved.',
      color: 'text-blue-500'
    },
    {
      icon: Users2,
      title: 'Community',
      description: 'Building strong partnerships between donors, volunteers, and children\'s homes.',
      color: 'text-green-500'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Using technology to create meaningful connections and maximize impact.',
      color: 'text-purple-500'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: '/team/sarah.jpg',
      bio: 'Former social worker with 15+ years experience in child welfare. Passionate about creating lasting change.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: '/team/michael.jpg',
      bio: 'Technology expert focused on building platforms that connect people and create positive impact.'
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Head of Programs',
      image: '/team/emily.jpg',
      bio: 'Child psychologist with expertise in trauma-informed care and program development.'
    },
    {
      name: 'David Ochieng',
      role: 'Community Outreach',
      image: '/team/david.jpg',
      bio: 'Local community leader with deep connections to children\'s homes across Kenya.'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Foundation',
      description: 'CareConnect was founded with a vision to bridge the gap between donors and children\'s homes.'
    },
    {
      year: '2021',
      title: 'First 100 Children',
      description: 'Reached our first milestone of helping 100 children across 5 homes.'
    },
    {
      year: '2022',
      title: 'Technology Platform',
      description: 'Launched our digital platform to streamline donations and improve transparency.'
    },
    {
      year: '2023',
      title: 'Expansion',
      description: 'Expanded to 15+ homes and helped over 500 children with KES 2M+ in donations.'
    },
    {
      year: '2024',
      title: 'Future Vision',
      description: 'Aiming to reach 1000+ children and establish partnerships across East Africa.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - CareConnect</title>
        <meta name="description" content="Learn about CareConnect's mission to support children's homes and create lasting positive impact in communities." />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-pink-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
                About CareConnect
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                We're on a mission to create a world where every child has access to love, 
                care, and opportunities to thrive. Through technology and community, 
                we're building bridges between generous donors and children's homes.
              </p>
              <div className="flex items-center justify-center space-x-8">
                <div className="flex items-center space-x-2">
                  <Heart className="h-6 w-6 text-pink-500" />
                  <span className="text-gray-600">Founded 2020</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-6 w-6 text-blue-500" />
                  <span className="text-gray-600">Nairobi, Kenya</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-6 w-6 text-green-500" />
                  <span className="text-gray-600">15+ Locations</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className={`${stat.color} mb-2`}>
                    <stat.icon className="h-12 w-12 mx-auto" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="glass-effect h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                      <Target className="h-6 w-6 mr-3 text-blue-500" />
                      Our Mission
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">
                      To connect compassionate donors with children's homes, ensuring that every child 
                      receives the care, education, and opportunities they deserve. We believe in 
                      transparency, accountability, and the power of community to create lasting change.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="glass-effect h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                      <Award className="h-6 w-6 mr-3 text-green-500" />
                      Our Vision
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">
                      A world where no child is left behind, where every children's home has the 
                      resources it needs, and where communities come together to support the most 
                      vulnerable among us. We envision a future of hope, opportunity, and dignity for all.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These core values guide everything we do and shape our approach to creating positive change.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="glass-effect text-center h-full">
                    <CardContent className="p-6">
                      <div className={`${value.color} mb-4`}>
                        <value.icon className="h-12 w-12 mx-auto" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Meet the passionate individuals dedicated to making a difference in children's lives.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="glass-effect text-center h-full">
                    <CardContent className="p-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                      <p className="text-gray-600 text-sm">{member.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                From humble beginnings to creating meaningful impact across Kenya.
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative mb-8 ${index % 2 === 0 ? 'left-timeline' : 'right-timeline'}`}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}>
                    <Card className="glass-effect">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-semibold text-gray-900">{milestone.title}</h3>
                          <span className="text-2xl font-bold text-blue-500">{milestone.year}</span>
                        </div>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Ready to make a difference? We'd love to hear from you and discuss how you can help.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center"
              >
                <Card className="glass-effect">
                  <CardContent className="p-6">
                    <Mail className="h-8 w-8 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                    <p className="text-gray-600">hello@careconnect.org</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <Card className="glass-effect">
                  <CardContent className="p-6">
                    <Phone className="h-8 w-8 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                    <p className="text-gray-600">+254 700 000 000</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center"
              >
                <Card className="glass-effect">
                  <CardContent className="p-6">
                    <MapPin className="h-8 w-8 text-purple-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
                    <p className="text-gray-600">Nairobi, Kenya</p>
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

export default About;