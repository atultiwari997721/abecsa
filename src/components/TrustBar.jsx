import React from 'react';
import { FaUniversity, FaShoppingBag, FaChartLine, FaHeartbeat, FaMicrochip } from 'react-icons/fa';

const sectors = [
  { icon: <FaShoppingBag />, name: 'Retail' },
  { icon: <FaUniversity />, name: 'Education' },
  { icon: <FaChartLine />, name: 'Finance' },
  { icon: <FaMicrochip />, name: 'Tech' },
];

const TrustBar = () => {
  return (
    <div className="py-6 md:py-10 bg-white dark:bg-[#020617] border-y border-gray-100 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 overflow-hidden">
        <p className="text-center text-slate-700 dark:text-gray-300 text-xs md:text-sm tracking-widest uppercase mb-4 md:mb-8 font-semibold transition-colors">Trusted by innovators in</p>
        <div className="flex flex-nowrap justify-between md:justify-center gap-2 md:gap-20 opacity-90 transition-all duration-500 w-full px-2 md:px-0">
          {sectors.map((sector, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center gap-1 md:gap-3 group min-w-0">
              <span className="text-xl md:text-3xl text-slate-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-electricBlue transition-colors">{sector.icon}</span>
              <span className="text-[10px] md:text-xl font-bold text-slate-700 dark:text-gray-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors whitespace-nowrap">{sector.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
