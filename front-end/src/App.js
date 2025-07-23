import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomeListPage from './pages/HomeListPage';
import HomeDetailPage from './pages/HomeDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VisitBookingPage from './pages/VisitBookingPage';
import ReviewPage from './pages/ReviewPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomeListPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/homes/:id" element={<HomeDetailPage />} />
          <Route path="/visit" element={<VisitBookingPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
