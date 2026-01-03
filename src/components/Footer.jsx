import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{
      background: 'var(--glass-bg)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid var(--glass-border)',
      padding: '2rem',
      textAlign: 'center',
      marginTop: 'auto'
    }}>
      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
        <FaFacebook size={24} style={{ cursor: 'pointer', color: 'var(--text-color)' }} />
        <FaTwitter size={24} style={{ cursor: 'pointer', color: 'var(--text-color)' }} />
        <FaInstagram size={24} style={{ cursor: 'pointer', color: 'var(--text-color)' }} />
        <FaLinkedin size={24} style={{ cursor: 'pointer', color: 'var(--text-color)' }} />
      </div>
      <p style={{ color: '#888', fontSize: '0.9rem' }}>
        &copy; 2024 ABECSA Software Solution. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
