import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Support & Uptime' },
];
 const letters = [
    { char: 'A', color: '#5e96e5ff', x: -3.5 }, // Deep Cobalt Blue
    { char: 'B', color: '#df5050ff', x: -2.0 }, // Deep Bold Red
    { char: 'E', color: '#f0c800ff', x: -0.8 }, // Vivid Yellow
    { char: 'C', color: '#5e96e5ff', x: 0.5 },  // Deep Cobalt Blue
    { char: 'S', color: '#47b575ff', x: 1.7 },  // Bold Green
    { char: 'A', color: '#df5050ff', x: 3.0 }   // Deep Bold Red
  ];

const SocialProof = () => {
  return (
    <section className="py-12 pb-12 md:py-24 relative overflow-hidden bg-white dark:bg-[#0B1120] transition-colors duration-300"> 
      
      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100 dark:bg-electricBlue/5 blur-[100px] rounded-full pointer-events-none transition-colors" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 p-1 rounded-3xl shadow-xl dark:shadow-2xl transition-colors duration-300" 
        >
          <div className="bg-white dark:bg-[#1E293B] rounded-[22px] p-4 md:p-16 border border-gray-100 dark:border-gray-700 transition-colors duration-300"> 
            <h2 className="text-xl md:text-5xl font-bold font-heading mb-2 md:mb-6 text-slate-900 dark:text-white transition-colors">
              Join the <span className="text-blue-600 dark:text-electricBlue transition-colors">
                {letters.map((letter, index) => (
                  <span key={index} style={{ color: letter.color, transform: `translateX(${letter.x}rem)` }}>
                    {letter.char}
                  </span>
                ))  } Ecosystem</span>
            </h2>
            <p className="text-slate-600 dark:text-gray-300 text-sm md:text-lg mb-6 md:mb-12 max-w-2xl mx-auto font-medium transition-colors">
              Experience the power of a digital transformation partner that grows with you. From student startups to enterprise giants.
            </p>

            <div className="grid grid-cols-3 gap-2 md:gap-8 mb-6 md:mb-12 border-t border-gray-100 dark:border-gray-700 pt-6 md:pt-12 transition-colors">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-2xl md:text-5xl font-bold text-slate-900 dark:text-white mb-1 md:mb-2 transition-colors">{stat.value}</div>
                  <div className="text-slate-500 dark:text-gray-400 uppercase tracking-wider text-[10px] md:text-sm font-semibold transition-colors">{stat.label}</div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => window.dispatchEvent(new Event('open-contact'))}
              className="px-6 py-3 md:px-10 md:py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-sm md:text-lg hover:bg-slate-700 dark:hover:bg-gray-200 transition-colors shadow-lg"
            >
              Start Your Journey
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
