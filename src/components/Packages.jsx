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
    <section id="services" style={{ padding: isMobile ? '2rem 1rem' : '4rem 2rem', position: 'relative' }}>
      <h2 style={{ 
        textAlign: 'center', 
        fontSize: isMobile ? '2rem' : '2.5rem', 
        marginBottom: isMobile ? '1.5rem' : '3rem', 
        color: 'var(--text-color)' 
      }}>
        Our <span style={{ color: 'var(--primary-color)' }}>Packages</span>
      </h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: isMobile ? '1rem' : '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {packages.map((pkg, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--glass-border)',
              borderRadius: '15px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'transform 0.3s',
              cursor: 'pointer',
              boxShadow: isMobile ? `0 0 20px ${pkg.color}` : 'none'
            }}
            whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${pkg.color}` }}
            onClick={() => setSelectedPreview(pkg)}
          >
            <h3 style={{ color: pkg.color, marginBottom: '1rem', textAlign: 'center' }}>{pkg.title}</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text-color)' }}>{pkg.price}</div>
            <ul style={{ marginBottom: '2rem', width: '100%' }}>
              {pkg.features.map((feature, i) => (
                <li key={i} style={{ marginBottom: '0.5rem', textAlign: 'center', color: 'var(--text-color)', opacity: 0.8 }}>• {feature}</li>
              ))}
            </ul>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={(e) => { e.stopPropagation(); handleBuy(pkg.title); }}
                style={{
                  background: pkg.color,
                  color: '#000',
                  border: 'none',
                  padding: '0.8rem 1.5rem',
                  borderRadius: '25px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '1rem'
                }}
              >
                <FaWhatsapp size={20} /> Buy Now
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedPreview(pkg); }}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '0.8rem',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <FaEye size={20} />
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
