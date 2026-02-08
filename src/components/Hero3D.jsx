import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaMouse, FaPlay } from 'react-icons/fa';

const Hero3D = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const floatingVariant = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative w-full min-h-[50vh] md:h-screen overflow-hidden flex items-center justify-center bg-white dark:bg-[#0B1120] transition-colors duration-300"> 
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob" />
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-pink-400/20 dark:bg-pink-600/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between h-full pt-16 md:pt-0">
        
        {/* Text Content - Centered */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full text-center z-20 flex flex-col items-center justify-center h-full"
        >
          {/* Headline */}
           <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading leading-tight mb-6 text-slate-900 dark:text-white">
             Building the Future with{' '}
             <span className="font-sans font-black tracking-wider flex items-center justify-center gap-0.5 md:gap-1 mt-2 md:mt-0">
               <span className="text-[#4285F4]">A</span>
               <span className="text-[#EA4335]">B</span>
               <span className="text-[#FBBC05]">E</span>
               <span className="text-[#4285F4]">C</span>
               <span className="text-[#34A853]">S</span>
               <span className="text-[#EA4335]">A</span>
             </span>
           </h1>

          {/* Sub-headline */}
          <p className="hidden md:block text-base md:text-lg text-slate-600 dark:text-gray-300 mb-8 max-w-xl mx-auto leading-relaxed">
            From independent students to large-scale organizations. We deliver custom web development, social growth strategies, and comprehensive software management solutions tailored to your success.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.dispatchEvent(new Event('open-contact'))}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 group"
            >
              Get a Free Quote 
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const element = document.getElementById('portfolio');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-white rounded-xl font-semibold text-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <FaPlay className="text-xs" /> View Our Work
            </motion.button>
          </div>
          
          <div className="mt-10 flex items-center justify-center gap-6 text-slate-400 dark:text-gray-500 text-sm font-medium">
             <div className="flex -space-x-4">
                {[
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64",
                  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64"
                ].map((src, i) => (
                    <img 
                      key={i} 
                      src={src} 
                      alt={`Client ${i+1}`}
                      className="w-10 h-10 rounded-full border-2 border-white dark:border-[#0B1120] object-cover"
                    />
                ))}
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-[#0B1120] flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">
                  +500
                </div>
             </div>
             <p className="text-slate-600 dark:text-slate-400">Trusted by 500+ Clients</p>
          </div>
        </motion.div>

      </div>

       {/* Scroll Indicator */}
       {!isMobile && (
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 dark:text-gray-500 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs uppercase tracking-widest font-medium opacity-60">Scroll</span>
          <FaMouse size={20} className="opacity-60" />
        </motion.div>
      )}
    </div>
  );
};

export default Hero3D;
