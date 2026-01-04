import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" style={{ padding: '2rem 1rem', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ 
          maxWidth: '600px', 
          margin: '0 auto', 
          textAlign: 'center',
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--glass-border)',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 0 30px rgba(0, 0, 0, 0.5)'
        }}
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          style={{ 
            fontSize: '1.8rem', 
            marginBottom: '1rem', 
            color: 'var(--primary-color)',
            fontFamily: 'var(--font-heading)',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
        >
          About ABECSA
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.8)' }}
        >
          ABECSA Software Solution is a premier web development agency dedicated to crafting stunning, high-performance websites. 
          We specialize in 3D web experiences, modern UI/UX design, and robust software solutions. 
          Our mission is to elevate your brand with digital experiences that leave a lasting impression.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ fontSize: '0.85rem', marginTop: '1.5rem', color: 'rgba(255, 255, 255, 0.6)', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1rem' }}
        >
          You can also visit our sites: <a href="https://abecsa.in" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'none', transition: 'color 0.3s' }}>Abecsa.in</a>, <a href="https://abecsa.site" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'none', transition: 'color 0.3s' }}>Abecsa.site</a>
        </motion.p>
      </motion.div>
    </section>
  );
};

export default About;
