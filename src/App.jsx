import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import CursorEffect from './components/CursorEffect';
import VisitorCapture from './components/VisitorCapture';

import Background3D from './components/Background3D';

import Login from './components/Login';
import CustomerDashboard from './pages/CustomerDashboard';
import MarketingManagerDashboard from './pages/MarketingManagerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Tools from './pages/Tools';
import { ThemeProvider } from './context/ThemeContext';

const MainContent = () => {
  const location = useLocation();
  // Check if current path is a dashboard route
  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin') || location.pathname.startsWith('/tools');

  return (
    <div className="app-container">
      {!isDashboard && <Background3D />}
      <CursorEffect />
      <VisitorCapture />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<CustomerDashboard />} />
        <Route path="/manager-dashboard" element={<MarketingManagerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/tools" element={<Tools />} />
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
