import React from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaGraduationCap, FaFileInvoice, FaStore, FaBuilding, FaMicrochip, FaBook, FaChartLine, FaCar } from 'react-icons/fa';

const partners = [
  { name: "Sawariya Shop", icon: <FaShoppingCart className="text-pink-500" /> },
  { name: "Student Hub", icon: <FaGraduationCap className="text-blue-500" /> },
  { name: "QuickBill", icon: <FaFileInvoice className="text-green-500" /> },
 
  { name: "BikeRentals", icon: <FaShoppingCart className="text-orange-600" /> }, // Fallback icon
  { name: "CarGo", icon: <FaStore className="text-red-600" /> }, // Fallback icon
  { name: "LibManage", icon: <FaBook className="text-indigo-500" /> },
  { name: "FoodieExpress", icon: <FaStore className="text-yellow-500" /> }, // Fallback icon
  { name: "Abecsa ERP", icon: <FaBuilding className="text-orange-500" /> },
  { name: "TechFlow", icon: <FaMicrochip className="text-cyan-500" /> },
  { name: "EduCare", icon: <FaBook className="text-red-500" /> },
  { name: "FinTrack", icon: <FaChartLine className="text-emerald-500" /> },
  
];

const PartnersMarquee = () => {
  return (
    <div className="w-full py-8 overflow-hidden bg-white dark:bg-[#0B1120] relative z-20 border-t border-gray-100 dark:border-white/5">
      {/* Gradient Fog for Smooth Edges */}
      <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-white dark:from-[#0B1120] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-white dark:from-[#0B1120] to-transparent z-10 pointer-events-none" />
      
      <div className="flex">
        <motion.div 
          className="flex whitespace-nowrap gap-12 md:gap-24 pl-6"
          animate={{ x: "-50%" }}
          transition={{ 
            ease: "linear", 
            duration: 30, // Slower for readability
            repeat: Infinity 
          }}
        >
          {/* Tripled list for seamless infinite loop on wide screens */}
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <div key={index} className="flex items-center gap-3 transition-opacity duration-300 group cursor-default">
              <span className="text-2xl md:text-3xl transition-all duration-300">
                {partner.icon}
              </span>
              <span className="text-base md:text-lg font-bold font-heading text-slate-500 dark:text-gray-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                {partner.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PartnersMarquee;
