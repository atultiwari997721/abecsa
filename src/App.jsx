import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import CursorEffect from './components/CursorEffect';

import Login from './components/Login';
import CustomerDashboard from './pages/CustomerDashboard';
import MarketingManagerDashboard from './pages/MarketingManagerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { ThemeProvider } from './context/ThemeContext';

const MainContent = () => {
  const location = useLocation();
  // Check if current path is a dashboard route
  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin');

  return (
    <div className="app-container">
      <CursorEffect />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<CustomerDashboard />} />
        <Route path="/manager-dashboard" element={<MarketingManagerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      {!isDashboard && <Footer />}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <MainContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
