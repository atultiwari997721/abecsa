import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { config } from '../config';

const ContactPopup = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="contact-popup-overlay"
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
            padding: '1rem'
          }}
          onClick={onClose}
        >
          <motion.div
            className="contact-popup-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            style={{
              background: 'var(--bg-color)',
              border: '1px solid var(--primary-color)',
              // padding is handled in CSS for responsiveness
              borderRadius: '15px',
              maxWidth: '400px',
              width: 'min(90vw, 400px)', // Stricter width constraint
              maxHeight: '85vh', // Slightly reduced height to be safe
              overflowY: 'auto',
              position: 'relative',
              left: '-12px', // Shift slightly left as requested
              boxShadow: '0 0 20px rgba(0, 243, 255, 0.3)',
              margin: 'auto',
              boxSizing: 'border-box' // Ensure padding doesn't add to width
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
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
                <FaWhatsapp size={24} color="#25D366" style={{ flexShrink: 0 }} />
                <span>Chat on WhatsApp</span>
              </a>
              
              <a 
                href="mailto:abecsaindia@gmail.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '10px',
                  color: '#fff',
                  textDecoration: 'none',
                  transition: 'background 0.3s',
                  wordBreak: 'break-all' // Ensure long emails break
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              >
                <FaEnvelope size={24} color="#EA4335" style={{ flexShrink: 0 }} />
                <span>abecsaindia@gmail.com</span>
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
                  width: '100%'
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
            
            <style>{`
              .contact-popup-content {
                padding: 2.5rem 2rem 2rem;
              }
              @media (max-width: 480px) {
                .contact-popup-content {
                  padding: 2rem 1rem 1.5rem !important;
                  width: 95% !important;
                }
                .contact-popup-content h2 {
                  font-size: 1.5rem;
                }
              }
            `}</style>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactPopup;
