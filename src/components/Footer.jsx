import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    // Compact button style with FIXED WIDTH for consistency
    const buttonClass = "px-1 py-1.5 bg-blue-50 dark:bg-blue-900/50 hover:bg-blue-100 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-full text-[11px] font-semibold transition-colors border border-blue-100 dark:border-blue-500/20 w-[140px] text-center truncate";

    const leftButtons = [
        { label: "Lern With Abecsa", path: "/lern_with_abecsa" },
        { label: "Our Program", path: "/our_program" },
        { label: "Internship", path: "/internship" },
        { label: "Work With Us", path: "/work_with_us" },
    ];

    const rightButtons = [
        { label: "Business Login", path: "/business_login" },
        { label: "Manager Login", path: "/manager_login" },
        { label: "Client Login", path: "/client_login" },
    ];

  return (
    <footer className="relative z-10 bg-white dark:bg-[#0B1120] border-t border-gray-500 dark:border-white/10 pt-6 pb-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-4">
        
        {/* -- Green Box Area: Logo & Tagline -- */}
        <div className="text-center flex flex-col items-center gap-1">
            <div className="text-2xl font-bold tracking-widest flex justify-center gap-0.5" >
               <span className="text-blue-600 dark:text-blue-500">A</span>
               <span className="text-red-600 dark:text-red-500">B</span>
               <span className="text-yellow-500 dark:text-yellow-400">E</span>
               <span className="text-blue-600 dark:text-blue-500">C</span>
               <span className="text-green-600 dark:text-green-500">S</span>
               <span className="text-red-600 dark:text-red-500">A</span>
            </div>
            <p className="text-slate-500 dark:text-gray-400 text-[10px] whitespace-nowrap">
                Building the digital infrastructure for the next generation.
            </p>
        </div>

        {/* -- Yellow Box Areas: Split Section (Buttons Only) -- */}
        <div className="w-full grid grid-cols-2 gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
             {/* Left Column Buttons (Align Right towards center) */}
             <div className="flex flex-col items-end gap-2 pr-2 border-r border-gray-100 dark:border-gray-800/50">
                {leftButtons.map((btn, idx) => (
                    <button key={idx} onClick={() => navigate(btn.path)} className={buttonClass}>
                        {btn.label}
                    </button>
                ))}
             </div>

             {/* Right Column Buttons (Align Left towards center) */}
             <div className="flex flex-col items-start gap-2 pl-2">
                {rightButtons.map((btn, idx) => (
                    <button key={idx} onClick={() => navigate(btn.path)} className={buttonClass}>
                        {btn.label}
                    </button>
                ))}
             </div>
        </div>
      
        {/* -- Blue Box Area: Socials -- */}
        <div className="flex gap-6">
          {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
            <a key={i} href="#" className="text-slate-400 dark:text-gray-400 hover:text-blue-600 dark:hover:text-electricBlue transition-colors text-lg">
              <Icon />
            </a>
          ))}
        </div>

        {/* -- Red Box Area: Copyright -- */}
        <div className="w-full text-center">
            <p className="text-slate-500 dark:text-gray-400 text-[10px]">
                &copy; {new Date().getFullYear()} ABECSA. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
