import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { config } from '../config';

const ContactPopup = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.8)',
            zIndex: 2000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem' // Add padding to prevent edge touching
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            style={{
              background: 'var(--bg-color)',
              border: '1px solid var(--primary-color)',
              padding: '2.5rem 2rem 2rem', // Increased top padding for close button space
              borderRadius: '15px',
              maxWidth: '400px',
              width: '100%',
              maxHeight: '90vh', // Limit height
              overflowY: 'auto', // Scroll internal content if needed
              position: 'relative',
              boxShadow: '0 0 20px rgba(0, 243, 255, 0.3)',
              margin: 'auto' // Ensure centering
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '10px', // Inside the box
                right: '10px', // Inside the box
                background: '#ff0055',
                border: 'none',
                color: '#fff',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: '0 2px 5px rgba(255, 0, 85, 0.4)',
                zIndex: 10
              }}
            >
              <FaTimes />
            </button>
            
            <h2 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem', textAlign: 'center', marginTop: '0.5rem' }}>Contact Us</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a 
                href={`https://wa.me/${config.whatsappNumber}`} 
                target="_blank" 
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '10px',
                  color: '#fff',
                  textDecoration: 'none',
                  transition: 'background 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              >
                <FaWhatsapp size={24} color="#25D366" />
                <span>Chat on WhatsApp</span>
              </a>
              
              <a 
                href="mailto:akanksha.tripathi770@gmail.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '10px',
                  color: '#fff',
                  textDecoration: 'none',
                  transition: 'background 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              >
                <FaEnvelope size={24} color="#EA4335" />
                <span>akanksha.tripathi770@gmail.com</span>
              </a>

              <button
                onClick={onClose}
                style={{
                  marginTop: '1rem',
                  padding: '0.8rem',
                  background: 'transparent',
                  border: '1px solid #ff0055',
                  borderRadius: '25px',
                  color: '#ff0055',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s',
                  width: '100%' // Full width button
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#ff0055';
                  e.target.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#ff0055';
                }}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactPopup;
