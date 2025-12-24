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
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
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
    else navigate('/dashboard');
  };

  return (
    <div style={{ 
      position: 'relative', 
      width: '100vw', 
      height: '100vh', 
      overflow: 'hidden',
      background: '#050505',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Exo 2', sans-serif"
    }}>
      
      {/* Abstract Background Elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          zIndex: 0
        }}
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          x: [0, 50, 0],
          opacity: [0.2, 0.4, 0.2] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(138, 43, 226, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          zIndex: 0
        }}
      />

      <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          style={{
              position: 'absolute', top: '2rem', left: '2rem',
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff', padding: '0.8rem 1.2rem', borderRadius: '30px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
              zIndex: 10, backdropFilter: 'blur(10px)',
              transition: 'all 0.3s'
          }}
          whileHover={{ background: 'rgba(255,255,255,0.1)', scale: 1.05 }}
      >
          <FaArrowLeft /> Back to Home
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          background: 'rgba(20, 20, 20, 0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(212, 175, 55, 0.2)',
          padding: '3rem',
          borderRadius: '20px',
          width: '90%',
          maxWidth: '400px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          zIndex: 2,
          position: 'relative'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: '700', 
            margin: '0 0 0.5rem 0',
            letterSpacing: '2px',
            display: 'flex',
            justifyContent: 'center',
            gap: '2px'
          }}>
            <span style={{ color: '#2b7de9' }}>A</span>
            <span style={{ color: '#e93e3a' }}>B</span>
            <span style={{ color: '#f5b700' }}>E</span>
            <span style={{ color: '#2b7de9' }}>C</span>
            <span style={{ color: '#4caf50' }}>S</span>
            <span style={{ color: '#e93e3a' }}>A</span>
          </h2>
          <p style={{ color: '#888', fontSize: '0.9rem', margin: 0 }}>Secure Personnel Access</p>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ position: 'relative' }}>
            <FaEnvelope style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)', color: '#D4AF37' }} />
            <input
              type="email" name="email" placeholder="Email Address"
              value={formData.email} onChange={handleChange}
              required
              className="login-input"
            />
          </div>

          <div style={{ position: 'relative' }}>
            <FaLock style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)', color: '#D4AF37' }} />
            <input
              type="password" name="password" placeholder="Password"
              value={formData.password} onChange={handleChange}
              required
              className="login-input"
            />
          </div>

          <motion.button 
            type="submit" 
            disabled={loading}
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
            style={{
              background: 'linear-gradient(45deg, #D4AF37, #F5B700)',
              color: '#000', 
              border: 'none', 
              padding: '14px', 
              borderRadius: '10px',
              fontSize: '1rem', 
              fontWeight: 'bold', 
              cursor: 'pointer', 
              marginTop: '1rem',
              boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
            }}
          >
            {loading ? 'Authenticating...' : 'Secure Login'}
          </motion.button>
        </form>
      </motion.div>

      <style>{`
        .login-input {
          width: 100%;
          padding: 14px 14px 14px 45px;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: #fff;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s;
          box-sizing: border-box;
        }
        .login-input:focus {
          border-color: #D4AF37;
          background: rgba(0, 0, 0, 0.6);
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.1);
        }
        .login-input::placeholder {
          color: #666;
        }
      `}</style>
    </div>
  );
};

export default Login;
