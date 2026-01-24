import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CursorEffect from './components/CursorEffect';
import VisitorCapture from './components/VisitorCapture';
import Loader from './components/Loader';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { useAuth } from './contexts/AuthContext';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./components/Login'));
const CustomerDashboard = lazy(() => import('./pages/CustomerDashboard'));
const MarketingManagerDashboard = lazy(() => import('./pages/MarketingManagerDashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Tools = lazy(() => import('./pages/Tools'));
const Test = lazy(() => import('./pages/Test')); // Keeping Test as it was, checking if needs change
const LernWithAbecsa = lazy(() => import('./pages/LernWithAbecsa'));
const Background3D = lazy(() => import('./components/Background3D'));

const MainContent = () => {
  const location = useLocation();
  const { theme } = useTheme();
  
  // Check if currentpath is a dashboard route
  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin') || location.pathname.startsWith('/tools');

  return (
    <div className={`app-container ${theme} bg-white dark:bg-[#0B1120] text-slate-900 dark:text-white transition-colors duration-300 min-h-screen`}>
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
         
          <Route path="/lern_with_abecsa" element={
            <ProtectedRoute>
              <LernWithAbecsa />
            </ProtectedRoute>
          } />
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
