import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomeListPage from "./pages/HomeListPage";
import HomeDetailPage from "./pages/HomeDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import VisitBookingPage from "./pages/VisitBookingPage";
import ReviewPage from "./pages/ReviewPage";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomeListPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/homes/:id" element={<HomeDetailPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/visit" element={<VisitBookingPage />} />
          <Route path="/review" element={<ReviewPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

