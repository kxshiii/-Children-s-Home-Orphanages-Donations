import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import OrphanagesPage from '@/pages/OrphanagesPage';
import OrphanageDetailPage from '@/pages/OrphanageDetailPage';
import DonationPage from '@/pages/DonationPage';
import BookVisitPage from '@/pages/BookVisitPage';
import AdminDashboard from '@/pages/AdminDashboard';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import { AuthProvider, useAuth } from '@/context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-500"></div>
      </div>
    );
  }

  if (user?.role === 'admin') {
    return children;
  }

  return <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen pattern-bg flex flex-col">
          <Helmet>
            <title>Hope Bridge - Children's Home Donations Platform</title>
            <meta
              name="description"
              content="Connect with children's homes and orphanages worldwide. Make donations, book visits, and help vulnerable children build brighter futures."
            />
          </Helmet>

          <Navbar />

          <main className="pt-20 flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/orphanages" element={<OrphanagesPage />} />
              <Route path="/orphanage/:id" element={<OrphanageDetailPage />} />
              <Route path="/donate" element={<DonationPage />} />
              <Route path="/donate/:id" element={<DonationPage />} />
              <Route path="/book-visit/:id" element={<BookVisitPage />} />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>

          <Footer />
          <Toaster />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;