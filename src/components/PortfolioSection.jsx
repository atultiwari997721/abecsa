import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaStore, FaBuilding, FaShoppingCart } from 'react-icons/fa';

const portfolioItems = [
  {
    sector: 'Students',
    icon: <FaGraduationCap />,
    title: 'Academic Hubs',
    project: 'Student Hub',
    description: 'Notes & Collab Platform',
    color: 'border-l-2 md:border-l-4 border-blue-500'
  },
  {
    sector: 'Businesses',
    icon: <FaShoppingCart />,
    title: 'E-commerce',
    project: 'Sawariya Shop',
    description: 'Inventory & Branding',
    color: 'border-l-2 md:border-l-4 border-purple-500'
  },
  {
    sector: 'Shops',
    icon: <FaStore />,
    title: 'Operations',
    project: 'QuickBill',
    description: 'Shop Tools & QR',
    color: 'border-l-2 md:border-l-4 border-emerald-500'
  },
  {
    sector: 'Organizations',
    icon: <FaBuilding />,
    title: 'Enterprise',
    project: 'Abecsa ERP',
    description: 'Full Management Suite',
    color: 'border-l-2 md:border-l-4 border-orange-500'
  }
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-4 pb-16 md:py-24 relative z-10 bg-slate-50 dark:bg-[#0F172A] transition-colors duration-300"> 
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4 md:mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold font-heading mb-2 text-slate-900 dark:text-white transition-colors">Who We Serve</h2>
          <p className="text-slate-500 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto transition-colors">Tailored digital infrastructures for everyone.</p>
        </motion.div>

        {/* 2-Column Grid on Mobile (Grid of 4) */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-8">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 5 }}
              className={`bg-white dark:bg-[#1E293B] rounded-lg md:rounded-r-xl shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col md:flex-row overflow-hidden ${item.color}`}
            >
              
              <div className="p-3 md:p-8 flex-1 flex flex-col justify-between h-full">
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                  <div className="p-1.5 md:p-2 rounded bg-gray-100 dark:bg-gray-800 text-slate-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-white transition-colors text-sm md:text-base">
                    {item.icon}
                  </div>
                   <div className="min-w-0"> 
                    <h3 className="text-xs md:text-lg font-bold text-slate-800 dark:text-white font-heading truncate transition-colors">{item.sector}</h3>
                    <p className="text-[10px] md:text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wide truncate transition-colors">{item.title}</p>
                   </div>
                </div>
                
                <div>
                    <h4 className="text-sm md:text-xl font-bold text-blue-600 dark:text-electricBlue mb-1 truncate transition-colors">{item.project}</h4>
                    <p className="text-slate-500 dark:text-gray-400 text-[10px] md:text-sm leading-tight line-clamp-2 md:line-clamp-none transition-colors">
                    {item.description}
                    </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
