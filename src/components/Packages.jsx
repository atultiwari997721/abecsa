import React, { useState, useEffect, useRef } from 'react';
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
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = scrollLeft / (scrollWidth - clientWidth || 1);
      setScrollProgress(progress);
    }
  };

  // Color mapping function
  const getProgressColor = (p) => {
    if (p <= 0.2) return '#3b82f6'; // Blue
    if (p <= 0.4) return '#ef4444'; // Red
    if (p <= 0.6) return '#22c55e'; // Green
    if (p <= 0.8) return '#eab308'; // Yellow
    if (p <= 0.9) return '#ef4444'; // Red again
    return '#3b82f6'; // Back to Blue
  };

  const handleBuy = (pkgTitle) => {
    const message = `Hello! I am interested in buying the ${pkgTitle} package from ABECSA.`;
    const link = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(link, '_blank');
  };

  return (
    <section id="services" style={{ padding: isMobile ? '4rem 0' : '6rem 2rem', position: 'relative', overflow: 'hidden' }}>
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
          .manual-scrollbar::-webkit-scrollbar {
            display: none; /* Hide standard bar as we have custom indicator */
          }
          .manual-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="manual-scrollbar" 
        style={{ 
          display: isMobile ? 'flex' : 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          flexWrap: isMobile ? 'nowrap' : 'wrap', 
          justifyContent: isMobile ? 'flex-start' : 'center', 
          gap: '1.5rem',
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          overflowX: isMobile ? 'auto' : 'visible',
          padding: isMobile ? '10px 20px 20px 20px' : '20px', 
          WebkitOverflowScrolling: 'touch', 
          scrollSnapType: isMobile ? 'x proximity' : 'none',
          touchAction: 'pan-x pan-y',
          width: '100%', 
          alignItems: 'stretch', 
        }}
      >
        {packages.map((pkg, index) => (
          <motion.div 
            key={index}
            className="group bg-white dark:bg-[#0f172a] text-slate-900 dark:text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            style={{
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderTop: `2px solid ${pkg.color}`,
              borderRadius: '20px',
              padding: '2rem', 
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'default',
              position: 'relative',
              overflow: 'hidden',
              minWidth: isMobile ? '75vw' : 'auto',
              maxWidth: isMobile ? '320px' : 'none',
              height: 'auto',
              flexShrink: 0, 
              scrollSnapAlign: 'center', 
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
              margin: '0',
            }}
            whileHover={!isMobile ? { 
              scale: 1.02,
              boxShadow: `0 10px 40px -10px ${pkg.color}66`,
              borderColor: pkg.color
            } : {}}
          >
            {/* Hover Gradient Overlay */}
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
                  background: pkg.color,
                  color: '#000',
                  border: 'none',
                  padding: '0.8rem 1.5rem',
                  borderRadius: '10px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-heading)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  transition: 'all 0.3s',
                  boxShadow: `0 4px 15px ${pkg.color}66`
                }}
              >
                Buy Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress Indicator - Changing Color */}
      {isMobile && (
        <div style={{ 
          width: '60%', 
          height: '4px', 
          background: 'rgba(0,0,0,0.05)', 
          margin: '20px auto 0',
          borderRadius: '10px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${scrollProgress * 100}%`,
            background: getProgressColor(scrollProgress),
            transition: 'background-color 0.5s ease, width 0.1s linear',
            borderRadius: '10px'
          }} />
        </div>
      )}

    </section>
  );
};

export default Packages;
