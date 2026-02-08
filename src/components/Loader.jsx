import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-[#0B1120] transition-colors duration-300">
      <div className="relative flex items-center justify-center">
        {/* Animated 'ABECSA' Text - Google Style Colors */}
        <div className="flex gap-0.5 md:gap-1 text-6xl md:text-8xl font-black font-sans animate-pulse duration-1000 tracking-wider">
           <span className="text-[#4285F4]">A</span>
           <span className="text-[#EA4335]">B</span>
           <span className="text-[#FBBC05]">E</span>
           <span className="text-[#4285F4]">C</span>
           <span className="text-[#34A853]">S</span>
           <span className="text-[#EA4335]">A</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
