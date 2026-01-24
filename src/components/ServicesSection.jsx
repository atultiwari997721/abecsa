import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaBullhorn, FaCogs } from 'react-icons/fa';

const services = [
  {
    icon: <FaCode />,
    title: 'Web Dev',
    description: 'MERN, 3D Landing Pages, Firebase.',
    colorLight: 'text-blue-600 bg-blue-50',
    colorDark: 'text-blue-500 bg-gray-800/50'
  },
  {
    icon: <FaBullhorn />,
    title: 'Social Media',
    description: 'Brand Identity & Strategy Growth.',
    colorLight: 'text-purple-600 bg-purple-50',
    colorDark: 'text-purple-500 bg-gray-800/50'
  },
  {
    icon: <FaCogs />,
    title: 'Software',
    description: 'Stock Predictors, Finance Tools, APIs.',
    colorLight: 'text-emerald-600 bg-emerald-50',
    colorDark: 'text-emerald-500 bg-gray-800/50'
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-4 pb-12 md:py-24 relative z-10 bg-white dark:bg-[#0B1120] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4 md:mb-16"
        >
          <h2 className="text-xl md:text-4xl font-bold font-heading mb-1 text-slate-900 dark:text-white transition-colors">Our Core Services</h2>
          <p className="text-slate-500 dark:text-gray-400 text-xs md:text-base max-w-2xl mx-auto transition-colors">Comprehensive digital solutions.</p>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 p-2 md:p-8 rounded-xl shadow-lg shadow-gray-200/50 dark:shadow-none hover:shadow-xl dark:hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300 group flex flex-col md:flex-col items-center md:items-start gap-2 md:gap-4"
            >
              <div className={`shrink-0 transition-transform duration-300 p-2 md:p-3 rounded-lg text-lg md:text-3xl dark:bg-gray-800/50 ${service.colorLight.split(' ')[0]} bg-gray-50 dark:bg-transparent`}>
                 {/* Note: Logic for icon color switching handled via classes, simplified here to use just text color logic roughly or specific classes */}
                 <span className="block dark:hidden text-xl md:text-3xl">{service.icon}</span>
                 <span className={`hidden dark:block text-xl md:text-3xl ${service.colorDark.split(' ')[0]}`}>{service.icon}</span>
              </div>
              
              <div className="text-center md:text-left w-full">
                <h3 className="text-[10px] md:text-xl font-bold text-slate-900 dark:text-white mb-0.5 md:mb-4 font-heading transition-colors truncate">{service.title}</h3>
                <p className="text-slate-600 dark:text-gray-400 text-[8px] md:text-base leading-tight font-body transition-colors md:line-clamp-none line-clamp-2">
                    {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
