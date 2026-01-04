import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaEye, FaTimes } from 'react-icons/fa';
import { config } from '../config';

const packages = [
  {
    title: "Student/College Project",
    price: "₹699",
    features: ["Basic HTML/CSS/JS", "Project Report Help", "Source Code Included", "Fast Delivery"],
    color: "#00ff88", // Neon Green
    previewImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
    demoUrl: "https://startbootstrap.com/previews/resume"
  },
  {
    title: "Basic Portfolio / Resume",
    price: "₹799",
    features: ["Responsive Design", "Contact Form", "Social Media Links", "1 Month Support"],
    color: "#00f3ff", // Neon Cyan
    previewImage: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=1000&auto=format&fit=crop",
    demoUrl: "https://startbootstrap.com/previews/freelancer"
  },
  {
    title: "Small Shop / Local Business",
    price: "₹1,799",
    features: ["Google Maps Integration", "Product Gallery", "WhatsApp Order", "SEO Basics"],
    color: "#ffaa00", // Neon Orange
    previewImage: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1000&auto=format&fit=crop",
    demoUrl: "https://startbootstrap.com/previews/business-casual"
  },
  {
    title: "Professional Business Website",
    price: "₹2,799",
    features: ["5-7 Pages", "Advanced SEO", "Admin Dashboard", "3 Months Support"],
    color: "#bc13fe", // Neon Purple
    previewImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    demoUrl: "https://startbootstrap.com/previews/agency"
  },
  {
    title: "E-commerce Store",
    price: "₹3,199",
    features: ["Product Management", "Payment Gateway", "User Auth", "6 Months Support"],
    color: "#ff0055", // Neon Red
    previewImage: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1000&auto=format&fit=crop",
    demoUrl: "https://startbootstrap.com/previews/shop-homepage"
  },
  {
    title: "Custom Software / App",
    price: "Custom",
    features: ["Tailored Requirements", "Scalable Architecture", "Cloud Integration", "Priority Support"],
    color: "#ffff00", // Neon Yellow
    previewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    demoUrl: "https://startbootstrap.com/previews/sb-admin-2"
  }
];

const Packages = () => {
  const [selectedPreview, setSelectedPreview] = useState(null);

  const handleBuy = (pkgTitle) => {
    const message = `Hello! I am interested in buying the ${pkgTitle} package from ABECSA.`;
    const link = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(link, '_blank');
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <section id="services" style={{ padding: isMobile ? '2rem 1rem' : '6rem 2rem', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient background glow */}
      <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0, 243, 255, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
      }} />

      <h2 style={{ 
        textAlign: 'center', 
        fontSize: isMobile ? '2.5rem' : '3.5rem', 
        marginBottom: isMobile ? '2rem' : '4rem', 
        color: '#fff',
        fontFamily: 'var(--font-heading)',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        position: 'relative',
        zIndex: 1
      }}>
        Our <span style={{ 
          color: 'transparent', 
          WebkitTextStroke: '1px var(--primary-color)',
          textShadow: '0 0 20px rgba(0, 243, 255, 0.5)' 
        }}>Packages</span>
      </h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: isMobile ? '1.5rem' : '2.5rem',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {packages.map((pkg, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderTop: `1px solid ${pkg.color}`,
              borderRadius: '20px',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            whileHover={{ 
              y: -10, 
              boxShadow: `0 10px 40px -10px ${pkg.color}66`,
              borderColor: pkg.color
            }}
            onClick={() => setSelectedPreview(pkg)}
          >
            {/* Hover Gradient Overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `radial-gradient(circle at top right, ${pkg.color}22, transparent 50%)`,
              opacity: 0,
              transition: 'opacity 0.3s'
            }} 
            className="card-glow"
            />
            <style>{`.card-glow:hover { opacity: 1; }`}</style>

            <h3 style={{ 
              color: '#fff', 
              marginBottom: '1rem', 
              textAlign: 'center',
              fontFamily: 'var(--font-heading)',
              fontSize: '1.2rem',
              letterSpacing: '1px'
            }}>{pkg.title}</h3>
            
            <div style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              marginBottom: '2rem', 
              color: pkg.color,
              fontFamily: 'var(--font-display)',
              textShadow: `0 0 20px ${pkg.color}44`
            }}>{pkg.price}</div>
            
            <ul style={{ marginBottom: '2.5rem', width: '100%', paddingLeft: 0 }}>
              {pkg.features.map((feature, i) => (
                <li key={i} style={{ 
                  marginBottom: '0.8rem', 
                  textAlign: 'center', 
                  color: 'rgba(255,255,255,0.7)', 
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ color: pkg.color }}>▹</span> {feature}
                </li>
              ))}
            </ul>
            
            <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center' }}>
              <button 
                onClick={(e) => { e.stopPropagation(); handleBuy(pkg.title); }}
                style={{
                  background: 'transparent',
                  color: pkg.color,
                  border: `1px solid ${pkg.color}`,
                  padding: '0.8rem 1.5rem',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-heading)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = pkg.color;
                  e.currentTarget.style.color = '#000';
                  e.currentTarget.style.boxShadow = `0 0 20px ${pkg.color}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = pkg.color;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Buy Now
              </button>
              
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedPreview(pkg); }}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  border: 'none',
                  width: '45px',
                  height: '45px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              >
                <FaEye size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPreview && (
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
              background: 'rgba(0,0,0,0.9)',
              zIndex: 3000,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem'
            }}
            onClick={() => setSelectedPreview(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={{
                background: 'var(--bg-color)',
                border: `2px solid ${selectedPreview.color}`,
                borderRadius: '15px',
                overflow: 'hidden',
                maxWidth: '800px',
                width: '100%',
                maxHeight: '90vh',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPreview(null)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(0,0,0,0.5)',
                  border: 'none',
                  color: '#fff',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  zIndex: 10,
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <FaTimes />
              </button>
              
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <img 
                  src={selectedPreview.previewImage} 
                  alt={selectedPreview.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                />
              </div>

              <div style={{
                background: 'rgba(0,0,0,0.9)',
                padding: '1.5rem',
                textAlign: 'center',
                borderTop: `1px solid ${selectedPreview.color}`
              }}>
                <h3 style={{ color: selectedPreview.color, marginBottom: '0.5rem' }}>{selectedPreview.title} Preview</h3>
                <p style={{ color: '#ccc', marginBottom: '1rem' }}>Sample layout representation</p>
                <a 
                  href={selectedPreview.demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    background: selectedPreview.color,
                    color: '#000',
                    padding: '0.8rem 2rem',
                    borderRadius: '25px',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    transition: 'transform 0.2s'
                  }}
                >
                  Visit Live Preview
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Packages;
