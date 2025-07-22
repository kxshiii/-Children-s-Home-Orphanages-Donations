<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomeListPage from './pages/HomeListPage';
import HomeDetailPage from './pages/HomeDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import VisitBookingPage from './pages/VisitBookingPage';
import ReviewPage from './pages/ReviewPage'; // Optional if added

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/homes/:id" element={<HomeDetailPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/visit" element={<VisitBookingPage />} />
        <Route path="/review" element={<ReviewPage />} /> {/* Optional */}
      </Routes>
    </Router>
  );
}
=======
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar"; // FIX: match exact export name
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
};
>>>>>>> d6f341b9e0e34970ef97fa1fb73f878ccf34f3c0

export default App;

