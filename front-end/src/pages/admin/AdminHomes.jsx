import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import HomesManagement from '@/components/admin/HomesManagement';

const AdminHomes = () => {
  return (
    <>
      <Helmet>
        <title>Manage Homes - CareConnect Admin</title>
        <meta name="description" content="Manage children's homes on the CareConnect platform. Add, edit, and monitor all registered homes." />
      </Helmet>

      <div className="min-h-screen pt-20">
        {/* Header */}
        <section className="py-8 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <Link to="/admin">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Dashboard
                    </Button>
                  </Link>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2 flex items-center">
                      <Home className="h-8 w-8 mr-3 text-blue-400" />
                      Manage Homes
                    </h1>
                    <p className="text-gray-300">
                      Add, edit, and manage children's homes on the platform
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Homes Management Content */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <HomesManagement />
          </div>
        </section>
      </div>
    </>
  );
};

export default AdminHomes;