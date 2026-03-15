import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearchLocation, FaWhatsapp, FaEnvelope, FaPhoneAlt, FaCheckCircle, FaGlobe } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { config } from '../config';

const SeoService = () => {
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
          <div className="inline-flex items-center justify-center p-3 sm:p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 mb-6">
            <FaSearchLocation className="text-3xl sm:text-4xl" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
            Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">SEO Services</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed">
            Dominate search engine rankings, drive organic traffic, and put your business right in front of the customers who are actively searching for you.
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
                <FaGlobe className="text-blue-500" />
                Why SEO Matters
              </h2>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                If your website isn't on the first page of Google, you are losing sales to competitors. Our SEO architecture is built from the ground up to ensure Google's algorithms love your site. We focus on high-intent keywords that actually convert to sales, not just empty clicks.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-2 text-emerald-600 dark:text-emerald-400">On-Page SEO</h3>
                <p className="text-sm text-slate-600 dark:text-gray-400">Content optimization, meta tags, and internal linking strategies.</p>
              </div>
              <div className="bg-slate-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-2 text-emerald-600 dark:text-emerald-400">Technical SEO</h3>
                <p className="text-sm text-slate-600 dark:text-gray-400">Site speed optimization, mobile-first indexing, and SSL security.</p>
              </div>
              <div className="bg-slate-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-2 text-emerald-600 dark:text-emerald-400">Local SEO</h3>
                <p className="text-sm text-slate-600 dark:text-gray-400">Google Maps ranking and local directory citations.</p>
              </div>
              <div className="bg-slate-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-2 text-emerald-600 dark:text-emerald-400">Off-Page SEO</h3>
                <p className="text-sm text-slate-600 dark:text-gray-400">High-authority backlink building and digital PR.</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 blur-3xl rounded-full" />
            <div className="relative bg-slate-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 p-8 rounded-3xl">
               <h3 className="text-xl font-bold mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">Our Guarantee</h3>
               <ul className="space-y-5">
                 <li className="flex items-start gap-3">
                   <FaCheckCircle className="text-emerald-500 text-xl shrink-0 mt-0.5" />
                   <span className="text-slate-700 dark:text-gray-300">Detailed initial website audit and error fixing.</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <FaCheckCircle className="text-emerald-500 text-xl shrink-0 mt-0.5" />
                   <span className="text-slate-700 dark:text-gray-300">Competitor keyword gap analysis.</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <FaCheckCircle className="text-emerald-500 text-xl shrink-0 mt-0.5" />
                   <span className="text-slate-700 dark:text-gray-300">Monthly ranking progress reports.</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <FaCheckCircle className="text-emerald-500 text-xl shrink-0 mt-0.5" />
                   <span className="text-slate-700 dark:text-gray-300">100% White-hat Google compliant strategies.</span>
                 </li>
               </ul>
            </div>
          </motion.div>
        </div>

        {/* CTA Contact Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-64 h-64 bg-emerald-400/20 rounded-full blur-[80px]" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Rank Higher Today</h2>
            <p className="text-emerald-100 mb-8 max-w-2xl mx-auto text-lg">
              Stop hiding on page 2. Get a free SEO consultation and discover exactly what your website needs to reach the top.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href={`https://wa.me/${config.whatsappNumber || '918717807190'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105 shadow-lg"
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
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-teal-700 hover:bg-gray-50 px-8 py-4 rounded-full font-bold transition-all hover:scale-105 shadow-lg"
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

export default SeoService;
