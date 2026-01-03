import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" style={{ padding: '1rem 0.5rem', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          style={{ fontSize: '2rem', marginBottom: '0.8rem', color: 'var(--primary-color)' }}
        >
          About ABECSA
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: '0.9rem', lineHeight: '1.4', color: '#ccc' }}
        >
          ABECSA Software Solution is a premier web development agency dedicated to crafting stunning, high-performance websites. 
          We specialize in 3D web experiences, modern UI/UX design, and robust software solutions. 
          Our mission is to elevate your brand with digital experiences that leave a lasting impression.
        </motion.p>
      </div>
    </section>
  );
};

export default About;
