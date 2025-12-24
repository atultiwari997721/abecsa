import React, { useState } from 'react';
import { FaBars, FaTimes, FaCube, FaLaptop } from 'react-icons/fa';
import ContactPopup from './ContactPopup';
import '../styles/global.css';
import { useNavigate, useLocation } from 'react-router-dom';

import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { is3DMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isDashboard = location.pathname.includes('/dashboard') || location.pathname.includes('/admin');

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
      background: 'var(--glass-bg)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--glass-border)',
      padding: isMobile ? '1rem 1rem' : '1rem 5%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxSizing: 'border-box' // Ensure padding doesn't cause overflow
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '2px', display: 'flex', gap: '2px', cursor: 'pointer' }} onClick={() => navigate('/')}>
        <span style={{ color: '#2b7de9' }}>A</span>
        <span style={{ color: '#e93e3a' }}>B</span>
        <span style={{ color: '#f5b700' }}>E</span>
        <span style={{ color: '#2b7de9' }}>C</span>
        <span style={{ color: '#4caf50' }}>S</span>
        <span style={{ color: '#e93e3a' }}>A</span>
      </div>

      {/* Desktop Menu */}
      <div className="desktop-menu" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        {['Home', 'About', 'Services'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} style={{
            color: 'var(--text-color)',
            fontSize: '1rem',
            transition: 'color 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.color = 'var(--primary-color)'}
          onMouseLeave={(e) => e.target.style.color = 'var(--text-color)'}
          >
            {item}
          </a>
        ))}
        <button onClick={() => setIsContactOpen(true)} style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-color)',
          fontSize: '1rem',
          cursor: 'pointer',
          transition: 'color 0.3s'
        }}
        onMouseEnter={(e) => e.target.style.color = 'var(--primary-color)'}
        onMouseLeave={(e) => e.target.style.color = 'var(--text-color)'}
        >
          Contact
        </button>

        <button onClick={() => navigate('/login')} style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-color)',
          fontSize: '1rem',
          cursor: 'pointer',
          transition: 'color 0.3s'
        }}
        onMouseEnter={(e) => e.target.style.color = 'var(--primary-color)'}
        onMouseLeave={(e) => e.target.style.color = 'var(--text-color)'}
        >
          Customer Login
        </button>
        
        
        <button onClick={toggleTheme} style={{
          background: 'var(--primary-color)',
          border: 'none',
          color: is3DMode ? '#000' : '#fff',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'all 0.3s',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          {is3DMode ? <><FaLaptop /> Simple</> : <><FaCube /> 3D</>}
        </button>
      </div>

      {/* Mobile Controls (Right Side) */}
      <div className="mobile-controls" style={{ display: 'none', alignItems: 'center', gap: '1rem' }}>
        <button onClick={toggleTheme} style={{
          background: 'var(--primary-color)',
          border: 'none',
          color: is3DMode ? '#000' : '#fff',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '1.2rem'
        }}>
          {is3DMode ? <FaLaptop /> : <FaCube />}
        </button>
        
        <div onClick={toggleMenu} style={{ cursor: 'pointer', fontSize: '1.5rem', color: 'var(--text-color)' }}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          width: '100%',
          background: 'var(--nav-bg)',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          alignItems: 'center',
          borderBottom: '1px solid var(--glass-border)'
        }}>
          {['Home', 'About', 'Services'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={toggleMenu} style={{ fontSize: '1.2rem', color: 'var(--text-color)' }}>
              {item}
            </a>
          ))}
          <button onClick={() => { setIsContactOpen(true); setIsMenuOpen(false); }} style={{ fontSize: '1.2rem', background: 'transparent', border: 'none', color: 'var(--text-color)' }}>
            Contact
          </button>
          <button onClick={() => { navigate('/login'); setIsMenuOpen(false); }} style={{ fontSize: '1.2rem', background: 'transparent', border: 'none', color: 'var(--text-color)' }}>
            Customer Login
          </button>
        </div>
      )}

      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-controls { display: flex !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
