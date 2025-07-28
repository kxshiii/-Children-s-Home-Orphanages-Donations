import React from 'react';
    import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
    import { AuthProvider, useAuth } from '@/hooks/useAuth.jsx';
    import { Toaster } from '@/components/ui/toaster';
    import Navbar from '@/components/Layout/Navbar';
    import Footer from '@/components/Layout/Footer';
    import AdminFloatingActions from '@/components/admin/AdminFloatingActions';
    import Home from '@/pages/Home';
    import ChildrensHomes from '@/pages/ChildrensHomes';
    import HomeDetails from '@/pages/HomeDetails';
    import GetInvolved from '@/pages/GetInvolved';
    import Login from '@/pages/Login';
    import Register from '@/pages/Register';
    import AdminDashboard from '@/pages/admin/AdminDashboard';
    import AdminHomes from '@/pages/admin/AdminHomes';

    const ProtectedRoute = ({ children, adminOnly = false }) => {
      const { user, loading } = useAuth();

      if (loading) {
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="loading-spinner"></div>
          </div>
        );
      }

      if (!user) {
        return <Navigate to="/login" replace />;
      }

      if (adminOnly && user.role !== 'admin') {
        return <Navigate to="/" replace />;
      }

      return children;
    };

    const PublicRoute = ({ children }) => {
      const { user, loading } = useAuth();

      if (loading) {
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="loading-spinner"></div>
          </div>
        );
      }

      if (user) {
        return <Navigate to="/" replace />;
      }

      return children;
    };

    function AppContent() {
      return (
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/homes" element={<ChildrensHomes />} />
                <Route path="/homes/:id" element={<HomeDetails />} />
                <Route path="/get-involved" element={<GetInvolved />} />
                
                <Route 
                  path="/login" 
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  } 
                />
                <Route 
                  path="/register" 
                  element={
                    <PublicRoute>
                      <Register />
                    </PublicRoute>
                  } 
                />

                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />

                <Route 
                  path="/admin/homes" 
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminHomes />
                    </ProtectedRoute>
                  } 
                />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
            <AdminFloatingActions />
            <Toaster />
          </div>
        </Router>
      );
    }

    function App() {
      return (
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      );
    }

    export default App;