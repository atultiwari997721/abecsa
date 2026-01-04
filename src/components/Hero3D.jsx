import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaMouse } from 'react-icons/fa';

const Hero3D = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ width: '100%', height: isMobile ? '40vh' : '100vh', position: 'relative', overflow: isMobile ? 'visible' : 'hidden' }}>
      {/* 3D Scene is now in Background3D component */}

      {/* HTML Overlay Content */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 1,
        pointerEvents: 'none' 
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: isMobile ? '0' : '0 2rem', // ZERO padding on mobile
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: isMobile ? 'flex-start' : 'center', // Start from top on mobile to control position better
          paddingTop: isMobile ? '60vh' : '0' // Adjusted to 60vh to push buttons below 3D logo
        }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ 
              pointerEvents: 'auto', 
              width: '100%'
            }}
          >
            {/* Desktop alignment container */}
            <div 
              style={{ textAlign: isMobile ? 'center' : 'left' }}
            >
            

            
            {!isMobile && (
            <div style={{ 
              display: 'flex', 
              gap: isMobile ? '0.2rem' : '1.5rem', 
              flexWrap: isMobile ? 'nowrap' : 'wrap', 
              justifyContent: isMobile ? 'center' : 'flex-start', 
              width: '100%',
              padding: '0',
              marginTop: isMobile ? '0' : '45vh', // Push far down to bottom
              paddingBottom: isMobile ? '0' : '8vh' // Add spacing from very bottom edge
            }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const element = document.getElementById('packages');
                  if (element) {
                    const yOffset = -50; 
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({top: y, behavior: 'smooth'});
                  }
                }}
                style={{
                  flex: isMobile ? 1 : 'initial', 
                  padding: isMobile ? '1rem 0' : '1rem 2rem', 
                  background: 'var(--accent-color)',
                  color: '#050511', // Dark text on bright button
                  border: 'none',
                  fontSize: isMobile ? '0.9rem' : '1.1rem', 
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  // Use PX values for clip path to prevent distortion on wide buttons
                  clipPath: 'polygon(20px 0, 100% 0, 100% 70%, calc(100% - 20px) 100%, 0 100%, 0 20px)',
                  textTransform: 'uppercase',
                  letterSpacing: isMobile ? '0px' : '1px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.2rem',
                  whiteSpace: 'nowrap',
                  minWidth: 0,
                  position: 'relative',
                  zIndex: 2,
                  overflow: 'visible'
                }}
              >
                {isMobile ? 'PROJECTS' : 'Explore Projects'} {!isMobile && <FaArrowRight />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, background: 'rgba(255, 255, 255, 0.1)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.dispatchEvent(new Event('open-contact'))}
                style={{
                  flex: isMobile ? 1 : 'initial', 
                  padding: isMobile ? '1rem 0' : '1rem 2rem',
                  background: 'transparent',
                  color: 'var(--accent-color)',
                  border: '1px solid var(--accent-color)',
                  fontSize: isMobile ? '0.9rem' : '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  borderRadius: '10px', // Slightly larger radius
                  textTransform: 'uppercase',
                  letterSpacing: isMobile ? '0px' : '1px',
                   whiteSpace: 'nowrap',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   minWidth: 0,
                   position: 'relative',
                   zIndex: 2
                }}
              >
                {isMobile ? 'CONTACT' : 'Contact Us'}
              </motion.button>
            </div>
            )}
          </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        {!isMobile && (
          <motion.div 
            style={{ 
              position: 'absolute', 
              bottom: '2rem', 
              left: '50%', 
              transform: 'translateX(-50%)',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              opacity: 0.7
            }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span style={{ fontSize: '1rem', letterSpacing: '1px', fontWeight: '400' }}>Scroll to explore</span>
            <FaMouse size={20} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Hero3D;
