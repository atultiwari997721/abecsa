import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

  return (
    <footer className="relative z-10 bg-white dark:bg-[#0B1120] border-t border-gray-500 dark:border-white/10 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-1">
        {/* Brand & Quote */}
         <div className="text-center mb-1">
            <div className="text-3xl font-bold tracking-widest mb-4 flex justify-center gap-0.5" >
               <span className="text-blue-600 dark:text-blue-500">A</span>
               <span className="text-red-600 dark:text-red-500">B</span>
               <span className="text-yellow-500 dark:text-yellow-400">E</span>
               <span className="text-blue-600 dark:text-blue-500">C</span>
               <span className="text-green-600 dark:text-green-500">S</span>
               <span className="text-red-600 dark:text-red-500">A</span>
            </div>
            <p className="text-slate-500 dark:text-gray-400 max-w-md mx-auto transition-colors">
                Building the digital infrastructure for the next generation of innovators.
            </p>
         </div>

         {/* Quick Links */}
         <div className="flex gap-4">
             <button onClick={() => navigate('/lern_with_abecsa')} className="px-6 py-2 bg-blue-50 dark:bg-blue-900/50 hover:bg-blue-100 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-full text-sm font-semibold transition-colors border border-blue-100 dark:border-blue-500/20">
                 Lern With Abecsa
             </button>
         </div>
      
        {/* Socials */}
        <div className="flex gap-6">
          {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
            <a key={i} href="#" className="text-slate-400 dark:text-gray-400 hover:text-blue-600 dark:hover:text-electricBlue transition-colors text-2xl">
              <Icon />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="w-full border-t border-gray-100 dark:border-white/4 pt-5 text-center transition-colors">
            <p className="text-slate-500 dark:text-gray-400 text-xs">
                &copy; {new Date().getFullYear()} ABECSA Software Solution. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
