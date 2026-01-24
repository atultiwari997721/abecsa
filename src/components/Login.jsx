import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaArrowLeft, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';
import { supabase } from '../supabaseClient';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let loginEmail = formData.email;
      // Support "Student ID" login by appending domain if no @ found
      if (!loginEmail.includes('@')) {
          loginEmail = `${loginEmail}@abecsa.edu`;
      }

      const { data: { user }, error } = await supabase.auth.signInWithPassword({
          email: loginEmail,
          password: formData.password,
      });

      if (error) throw error;

      const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

      if (profileError) throw profileError;

      handleNavigation(profile.role);

    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (role) => {
    if (role === 'admin') navigate('/admin');
    else if (role === 'marketing_manager') navigate('/manager-dashboard');
    else if (role === 'student_ambassador') navigate('/student-ambassador-dashboard');
    else navigate('/dashboard');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center font-body bg-gray-50 dark:bg-[#0B1120] text-slate-900 dark:text-white transition-colors duration-300">
      
      {/* Light Mode Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 opacity-100 dark:opacity-0 pointer-events-none transition-opacity duration-300" />
      
      {/* Dark Mode Gradient */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,_var(--tw-gradient-stops)] from-[#1a2333] to-[#0B1120] opacity-0 dark:opacity-100 pointer-events-none transition-opacity duration-300" />

      {/* Back Button - Bottom on Mobile, Top-Left on Desktop */}
      <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => navigate('/')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 md:bottom-auto md:top-12 md:left-12 md:translate-x-0 z-10 flex items-center gap-2 px-5 py-3 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm dark:backdrop-blur-md text-slate-600 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300 font-heading whitespace-nowrap"
          whileHover={{ scale: 1.05 }}
      >
          <FaArrowLeft /> Back to Home
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10 p-8 md:p-12 rounded-2xl w-[90%] max-w-[400px] shadow-2xl shadow-blue-500/10 dark:shadow-black/50 mb-16 md:mb-0" // mb-16 to make room for bottom button on mobile
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2 tracking-widest flex justify-center gap-0.5">
            <span className="text-blue-600 dark:text-[#2b7de9]">A</span>
            <span className="text-red-600 dark:text-[#e93e3a]">B</span>
            <span className="text-yellow-500 dark:text-[#f5b700]">E</span>
            <span className="text-blue-600 dark:text-[#2b7de9]">C</span>
            <span className="text-green-600 dark:text-[#4caf50]">S</span>
            <span className="text-red-600 dark:text-[#e93e3a]">A</span>
          </h2>
          <p className="text-slate-500 dark:text-white/60 text-sm tracking-widest uppercase font-semibold">SECURE ACCESS</p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="relative">
            <FaEnvelope className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 dark:text-blue-400" />
            <input
              type="text" name="email" placeholder="Email or Student ID"
              value={formData.email} onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/40 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-white/10 transition-all font-body text-base"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 dark:text-blue-400" />
            <input
              type="password" name="password" placeholder="Password"
              value={formData.password} onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/40 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-white/10 transition-all font-body text-base"
            />
          </div>

          <motion.button 
            type="submit" 
            disabled={loading}
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3.5 rounded-xl font-bold text-base uppercase tracking-wider shadow-lg transition-all mt-4 ${
                loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30'
            }`}
          >
            {loading ? 'Authenticating...' : 'Enter System'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
