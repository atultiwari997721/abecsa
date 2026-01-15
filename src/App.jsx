import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CursorEffect from './components/CursorEffect';
import VisitorCapture from './components/VisitorCapture';
import Loader from './components/Loader';
import { ThemeProvider } from './context/ThemeContext';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./components/Login'));
const CustomerDashboard = lazy(() => import('./pages/CustomerDashboard'));
const MarketingManagerDashboard = lazy(() => import('./pages/MarketingManagerDashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Tools = lazy(() => import('./pages/Tools'));
const Test = lazy(() => import('./pages/Test'));
const Background3D = lazy(() => import('./components/Background3D'));

const MainContent = () => {
  const location = useLocation();
  // Check if current path is a dashboard route
  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin') || location.pathname.startsWith('/tools');

  return (
    <div className="app-container">
      <Suspense fallback={<Loader />}>
        {!isDashboard && <Background3D />}
      </Suspense>
      <CursorEffect />
      <VisitorCapture />
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/manager-dashboard" element={<MarketingManagerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/test"  element={<Test/>} />
        </Routes>
      </Suspense>
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
