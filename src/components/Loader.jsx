import React from 'react';

const GoogleStyleA = () => (
  <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 90 L50 20" stroke="#4285F4" strokeWidth="14" strokeLinecap="round" />
    <path d="M50 20 L65 55" stroke="#EA4335" strokeWidth="14" strokeLinecap="round" />
    <path d="M32 58 L72 58" stroke="#FBBC05" strokeWidth="12" strokeLinecap="round" />
    <path d="M65 55 L80 90" stroke="#34A853" strokeWidth="14" strokeLinecap="round" />
  </svg>
);

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-300">
      <div className="animate-pulse mb-8 scale-110">
        <GoogleStyleA />
      </div>
      
      <div className="w-40 h-1 bg-gray-100 rounded-full overflow-hidden relative">
        <div 
          className="absolute inset-y-0 bg-[#4285F4] rounded-full" 
          style={{ 
            width: '30%', 
            animation: 'loaderMove 1.5s infinite linear' 
          }} 
        />
      </div>

      <style>{`
        @keyframes loaderMove {
          0% { left: -30%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Loader;
