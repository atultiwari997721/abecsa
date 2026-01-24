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
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-white dark:bg-[#0B1120] transition-colors duration-300"> 
      
      {/* Light Mode Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 opacity-100 dark:opacity-0 transition-opacity duration-300 pointer-events-none" />

      {/* Dark Mode Gradient Overlay - Mobile */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120]/90 via-transparent to-[#0B1120] opacity-0 dark:opacity-100 transition-opacity duration-300 z-0 pointer-events-none md:hidden" />
      
      {/* Dark Mode Gradient Overlay - Desktop */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/40 to-transparent opacity-0 dark:opacity-100 transition-opacity duration-300 z-0 pointer-events-none hidden md:block" />

      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center h-full pt-16 md:pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl text-center md:text-left"
        >
          {/* Headline */}
           <div className="text-5xl md:text-7xl font-bold tracking-widest mb-4 flex justify-center md:justify-start gap-1" >
               <span className="text-blue-600 dark:text-blue-500">A</span>
               <span className="text-red-600 dark:text-red-500">B</span>
               <span className="text-yellow-500 dark:text-yellow-400">E</span>
               <span className="text-blue-600 dark:text-blue-500">C</span>
               <span className="text-green-600 dark:text-green-500">S</span>
               <span className="text-red-600 dark:text-red-500">A</span>
            </div>
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold font-heading leading-snug mb-4 md:mb-6 text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-lg transition-colors">
            
            Empowering <span className="block md:inline">Innovation:</span> 
            <span className="text-blue-600 dark:text-electricBlue block mt-2 md:mt-0 text-2xl md:text-6xl lg:text-7xl transition-colors">Full-Scale Software</span> 
            <span className="block mt-2 md:mt-0">Solutions.</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-sm md:text-xl text-slate-600 dark:text-gray-300 mb-8 max-w-2xl font-body leading-relaxed drop-shadow-sm dark:drop-shadow-md mx-auto md:mx-0 transition-colors">
            From independent students to large-scale organizations. Custom web dev, social growth, and software management.
          </p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-6 w-full md:w-auto px-4 md:px-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.dispatchEvent(new Event('open-contact'))}
              className="px-6 py-3 bg-blue-600 dark:bg-electricBlue text-white rounded-lg font-bold text-sm md:text-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 dark:shadow-none w-full md:w-auto"
            >
              Get a Free Quote <FaArrowRight />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById('portfolio');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 text-slate-700 dark:text-white rounded-lg font-bold text-sm md:text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center w-full md:w-auto shadow-sm dark:shadow-md"
            >
              View Our Services
            </motion.button>
          </div>
        </motion.div>
      </div>

       {/* Scroll Indicator */}
       {!isMobile && (
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 dark:text-gray-400 flex flex-col items-center gap-2 opacity-70 transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
         
          <FaMouse size={22} />
        </motion.div>
      )}
    </div>
  );
};

export default Hero3D;
