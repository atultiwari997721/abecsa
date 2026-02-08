import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CursorEffect from './components/CursorEffect';
import Loader from './components/Loader';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { useAuth, AuthProvider } from './contexts/AuthContext'; // Import AuthProvider
import { FaExclamationTriangle } from 'react-icons/fa';

// ProtectedRoute: Handles authentication and role-based access
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader />;

  // 1. Not logged in -> Redirect to Login
  if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Lock Check (Students only)
  if (profile?.is_locked && profile?.role === 'student') {
      if (location.pathname.startsWith('/exam/')) {
          return children; // Let ExamPortal handle the locked UI for consistency
      }
      return <Navigate to="/locked" replace />;
  }

  // 3. Role Check (if roles specified)
  if (allowedRoles.length > 0 && profile) {
      if (!allowedRoles.includes(profile.role)) {
          // If role doesn't match, send to their appropriate dashboard to avoid 404/Access Denied loop
          if (profile.role === 'admin') return <Navigate to="/admin" replace />;
          if (profile.role === 'marketing_manager') return <Navigate to="/manager-dashboard" replace />;
          if (profile.role === 'student_ambassador') return <Navigate to="/student-ambassador-dashboard" replace />;
          if (profile.role === 'student') return <Navigate to="/dashboard" replace />;
          return <Navigate to="/dashboard" replace />;
      }
  }

  return children;
};

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./components/Login'));
const CustomerDashboard = lazy(() => import('./pages/CustomerDashboard'));
const MarketingManagerDashboard = lazy(() => import('./pages/MarketingManagerDashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Tools = lazy(() => import('./pages/Tools'));
const StudentAmbassadorDashboard = lazy(() => import('./pages/StudentAmbassadorDashboard'));
const ExamAdminDashboard = lazy(() => import('./pages/ExamAdminDashboard'));
const ExamPortal = lazy(() => import('./pages/ExamPortal'));
const Test = lazy(() => import('./pages/Test')); 
const LernWithAbecsa = lazy(() => import('./pages/LernWithAbecsa'));
const Internship = lazy(() => import('./pages/Internship'));
const OurProgram = lazy(() => import('./pages/OurProgram'));
const WorkWithUs = lazy(() => import('./pages/WorkWithUs'));
const Welfare = lazy(() => import('./pages/Welfare'));
const Courses = lazy(() => import('./pages/Courses'));
const Certificates = lazy(() => import('./pages/Certificates'));
const AbecsaAbc = lazy(() => import('./pages/AbecsaAbc'));
const Background3D = lazy(() => import('./components/Background3D'));

const MainContent = () => {
  const location = useLocation();
  const { theme } = useTheme();
  
  // Custom logic to hide background/footer on specific routes
  const isDashboard = location.pathname.startsWith('/dashboard') || 
                      location.pathname.startsWith('/admin') || 
                      location.pathname.startsWith('/tools') || 
                      location.pathname.startsWith('/manager-dashboard') || 
                      location.pathname.startsWith('/student-ambassador-dashboard') ||
                      location.pathname.startsWith('/exam-admin') ||
                      location.pathname.startsWith('/exam-admin') ||
                      location.pathname.startsWith('/exam/') ||
                      location.pathname.startsWith('/certificate') ||
                      location.pathname.startsWith('/courses');

  return (
    <div className={`app-container ${theme} bg-white dark:bg-[#0B1120] text-slate-900 dark:text-white transition-colors duration-300 min-h-screen`}>
      <Suspense fallback={<Loader />}>
        {!isDashboard && <Background3D />}
      </Suspense>
      <CursorEffect />
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={['customer', 'student']}>
              <CustomerDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/manager-dashboard" element={
            <ProtectedRoute allowedRoles={['marketing_manager']}>
              <MarketingManagerDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="/student-ambassador-dashboard" element={
             <ProtectedRoute allowedRoles={['student_ambassador']}>
                <StudentAmbassadorDashboard />
             </ProtectedRoute>
          } />

           <Route path="/tools" element={<Tools />} />
          <Route path="/internship" element={<Internship />} />
          <Route path="/our_program" element={<OurProgram />} />
          <Route path="/work_with_us" element={<WorkWithUs />} />
          <Route path="/welfare" element={<Welfare />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/certificate" element={<Certificates />} />
          <Route path="/abc" element={<AbecsaAbc />} />
          <Route path="/test"  element={<Test/>} />
         
           <Route path="/lern_with_abecsa" element={
            <ProtectedRoute>
              <LernWithAbecsa />
            </ProtectedRoute>
          } />

          {/* Exam Routes */}
          <Route path="/exam-admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ExamAdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="/exam/:id" element={
            <ProtectedRoute>
              <ExamPortal />
            </ProtectedRoute>
          } />

          <Route path="/locked" element={
            <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-4">
               <div className="bg-gray-900 border border-red-500/50 p-8 rounded-3xl max-w-md text-center">
                  <FaExclamationTriangle className="text-red-500 text-5xl mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">Account Locked</h2>
                  <p className="text-gray-400 mb-6">Your account has been locked due to a security violation during an exam. Please contact ABECSA Admin to regain access.</p>
                  <button onClick={() => window.location.href='/'} className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl transition-colors">Return Home</button>
               </div>
            </div>
          } />
          
          {/* Catch-all redirect to Home or Login */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Suspense>
      {!isDashboard && <Footer />}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider> 
        <Router>
          <ScrollToTop />
          <MainContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
