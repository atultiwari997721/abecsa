import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { config } from '../config';

const packages = [
  {
    title: "Student/College Project",
    price: "₹699",
    features: ["Basic HTML/CSS/JS", "Project Report Help", "Source Code Included", "Fast Delivery"],
    color: "#00b6c0ff", // Cyan
    previewImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
    demoUrl: "https://startbootstrap.com/previews/resume"
  },
  {
    title: "Basic Portfolio / Resume",
    price: "₹799",
    features: ["Responsive Design", "Contact Form", "Social Media Links", "1 Month Support"],
    color: "#00a2ff", // Bright Blue
    previewImage: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=1000&auto=format&fit=crop",
    demoUrl: "https://startbootstrap.com/previews/freelancer"
  },
  {
    title: "Small Shop / Local Business",
    price: "₹1,799",
    features: ["Google Maps Integration", "Product Gallery", "WhatsApp Order", "SEO Basics"],
    color: "#0066ff", // Deep Neon Blue
    previewImage: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1000&auto=format&fit=crop",
    demoUrl: "https://startbootstrap.com/previews/business-casual"
  },
  {
    title: "Professional Business Website",
    price: "₹2,799",
    features: ["5-7 Pages", "Advanced SEO", "Admin Dashboard", "3 Months Support"],
    color: "#4400b9ff", // Sky Blue
    previewImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    demoUrl: "https://startbootstrap.com/previews/agency"
  },
  {
    title: "E-commerce Store",
    price: "₹3,199",
    features: ["Product Management", "Payment Gateway", "User Auth", "6 Months Support"],
    color: "#2E9AFE", // Soft Blue
    previewImage: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1000&auto=format&fit=crop",
    demoUrl: "https://startbootstrap.com/previews/shop-homepage"
  },
  {
    title: "Custom Software / App",
    price: "Custom",
    features: ["Tailored Requirements", "Scalable Architecture", "Cloud Integration", "Priority Support"],
    color: "#00ffcc", // Teal/Cyan Mix
    previewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    demoUrl: "https://startbootstrap.com/previews/sb-admin-2"
  }
];

const Packages = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBuy = (pkgTitle) => {
    const message = `Hello! I am interested in buying the ${pkgTitle} package from ABECSA.`;
    const link = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(link, '_blank');
  };

  return (
    <section id="services" style={{ padding: isMobile ? '6rem 1rem' : '6rem 2rem', position: 'relative', overflow: 'hidden' }}>
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
        fontFamily: 'var(--font-heading)',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        position: 'relative',
        zIndex: 1
      }}
      className="text-slate-900 dark:text-white"
      >
        Our <span className="text-blue-600 dark:text-cyan-400">Packages</span>
      </h2>
      
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

      <div className="hide-scrollbar" style={{ 
        display: isMobile ? 'flex' : 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: isMobile ? '1rem' : '2.5rem',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
        overflowX: isMobile ? 'auto' : 'visible',
        padding: isMobile ? '0 1rem 2rem 1rem' : '0', // Side padding for mobile scroll
        scrollSnapType: isMobile ? 'x mandatory' : 'none'
      }}>
        {packages.map((pkg, index) => (
          <motion.div 
            key={index}
            className="group bg-white dark:bg-[#0f172a] text-slate-900 dark:text-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            style={{
              // Removed inline background color to allow theme toggling via classes
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderTop: `1px solid ${pkg.color}`,
              borderRadius: '20px',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'default',
              position: 'relative',
              overflow: 'hidden',
              minWidth: isMobile ? '85vw' : 'auto', // Mobile card width
              scrollSnapAlign: 'center', // Snap to center
              boxShadow: isMobile ? '0 5px 20px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.05)'
            }}
            whileHover={!isMobile ? { 
              y: -10, 
              boxShadow: `0 10px 40px -10px ${pkg.color}66`,
              borderColor: pkg.color
            } : {}} // Disable hover motion effects on touch/mobile
          >
            {/* Hover Gradient Overlay - CSS controlled via group-hover */}
            <div 
              className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: `radial-gradient(circle at top right, ${pkg.color}22, transparent 50%)`
              }} 
            />

            <h3 style={{ 
              marginBottom: '1rem', 
              textAlign: 'center',
              fontFamily: 'var(--font-heading)',
              fontSize: '1.2rem',
              letterSpacing: '1px'
            }}
            className="text-slate-900 dark:text-white font-bold"
            >{pkg.title}</h3>
            
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
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
                className="text-slate-700 dark:text-slate-300 font-semibold"
                >
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
              
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
};

export default Packages;
