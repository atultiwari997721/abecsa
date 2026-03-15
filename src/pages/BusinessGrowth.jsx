import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaWhatsapp, FaEnvelope, FaPhoneAlt, FaArrowRight, FaBullseye, FaLightbulb } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { config } from '../config';

const BusinessGrowth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B1120] text-slate-900 dark:text-white pt-24 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 sm:p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mb-6">
            <FaChartLine className="text-3xl sm:text-4xl" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
            Business <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Growth Strategy</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed">
            Scale your business with data-driven insights and actionable roadmaps tailored specifically to your industry and goals.
          </p>
        </motion.div>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <FaLightbulb className="text-amber-500" />
                How Abecsa Helps
              </h2>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                At Abecsa, we don't just give you theories. We analyze your market position, identify untapped revenue streams, and build a localized strategy to ensure sustainable long-term scaling. 
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <FaBullseye className="text-rose-500" />
                How It Works
              </h2>
              <ul className="space-y-4 text-slate-600 dark:text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  <span><strong>Audit:</strong> We assess your current operations, margins, and market reach.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  <span><strong>Roadmap:</strong> We deliver a 90-day execution plan highlighting quick wins.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  <span><strong>Execution:</strong> We help integrate new digital tools to fully automate processes.</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl rounded-full" />
            <div className="relative bg-slate-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 p-8 rounded-3xl">
               <h3 className="text-xl font-bold mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">Key Deliverables</h3>
               <div className="space-y-4">
                 <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                   <span className="font-medium">Market Analysis Report</span>
                   <FaArrowRight className="text-blue-500" />
                 </div>
                 <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                   <span className="font-medium">Revenue Optimization Strategy</span>
                   <FaArrowRight className="text-blue-500" />
                 </div>
                 <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                   <span className="font-medium">Competitor Benchmarking</span>
                   <FaArrowRight className="text-blue-500" />
                 </div>
                 <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                   <span className="font-medium">1-on-1 Consultation Call</span>
                   <FaArrowRight className="text-blue-500" />
                 </div>
               </div>
            </div>
          </motion.div>
        </div>

        {/* CTA Contact Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-64 h-64 bg-blue-400/20 rounded-full blur-[80px]" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Scale?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
              Don't leave your business growth to chance. Contact our strategy experts today and let's build something massive together.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href={`https://wa.me/${config.whatsappNumber || '918717807190'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105 shadow-lg shadow-green-500/30"
              >
                <FaWhatsapp className="text-xl" /> WhatsApp Us
              </a>
              <a 
                href="mailto:Abecsa.in@gmail.com"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-bold transition-all hover:scale-105"
              >
                <FaEnvelope className="text-xl" /> Email Us
              </a>
              <a 
                href="tel:+918717807190"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-full font-bold transition-all hover:scale-105 shadow-lg"
              >
                <FaPhoneAlt className="text-xl" /> Call Now
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default BusinessGrowth;
