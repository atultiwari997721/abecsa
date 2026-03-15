import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaWhatsapp, FaEnvelope, FaPhoneAlt, FaGoogle, FaShieldAlt, FaComments } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { config } from '../config';

const RatingService = () => {
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
          <div className="inline-flex items-center justify-center p-3 sm:p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/20 text-amber-500 mb-6">
            <FaStar className="text-3xl sm:text-4xl" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
            5-Star <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Reputation Management</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed">
            Protect your brand image. We help you systematically generate positive reviews, manage negative feedback, and build a trustworthy online presence.
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
                <FaGoogle className="text-blue-500" />
                Google My Business Mastery
              </h2>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                87% of consumers read online reviews for local businesses. A few bad reviews can destroy your conversion rates. We set up automated pipelines to encourage your happy customers to leave 5-star ratings on Google, Trustpilot, and Facebook.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0">
                  <FaShieldAlt className="text-xl text-orange-500" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Defense Against Negativity</h3>
                  <p className="text-slate-600 dark:text-gray-400 text-sm">We monitor citations and provide professional, de-escalating responses to unfair negative reviews.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl border border-gray-100 dark:border-gray-700 flex items-center justify-center shrink-0">
                  <FaStar className="text-xl text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Automated Review Generation</h3>
                  <p className="text-slate-600 dark:text-gray-400 text-sm">Post-purchase SMS and Email drips designed specifically to capture positive sentiment.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl border border-gray-100 dark:border-gray-700 flex items-center justify-center shrink-0">
                  <FaComments className="text-xl text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Brand Authority Building</h3>
                  <p className="text-slate-600 dark:text-gray-400 text-sm">Leveraging your best reviews to create strong social proof marketing assets.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-orange-500/20 blur-3xl rounded-full" />
            <div className="relative bg-slate-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 p-8 rounded-3xl">
               <h3 className="text-xl font-bold mb-4 border-b border-gray-200 dark:border-gray-700 pb-4 text-center">The Rating Impact</h3>
               
               {/* Mock Review Card */}
               <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 mb-4">
                 <div className="flex justify-between items-start mb-3">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">A</div>
                     <div>
                       <div className="font-bold text-sm">Abecsa Client</div>
                       <div className="text-xs text-gray-400">1 day ago</div>
                     </div>
                   </div>
                   <div className="flex text-amber-400 text-sm">
                     <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                   </div>
                 </div>
                 <p className="text-sm text-slate-600 dark:text-gray-300 italic">
                   "Since implementing their reputation strategy, our Google rating went from 3.8 to 4.8 in just two months. Client leads have doubled!"
                 </p>
               </div>

               {/* Stats */}
               <div className="flex justify-around mt-8 text-center border-t border-gray-200 dark:border-gray-700 pt-6">
                 <div>
                   <div className="text-3xl font-black text-amber-500">200%</div>
                   <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-bold">More Trust</div>
                 </div>
                 <div>
                   <div className="text-3xl font-black text-orange-500">5x</div>
                   <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-bold">Conversion</div>
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
          className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-white/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-64 h-64 bg-yellow-300/20 rounded-full blur-[80px]" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 drop-shadow-md">Fix Your Ratings Today</h2>
            <p className="text-orange-50 mb-8 max-w-2xl mx-auto text-lg drop-shadow-sm">
              Don't let a few unhappy customers define your entire brand online. Contact us immediately to deploy a reputation rescue strategy.
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
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-full font-bold transition-all hover:scale-105"
              >
                <FaEnvelope className="text-xl" /> Email Us
              </a>
              <a 
                href="tel:+918717807190"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-orange-600 hover:bg-gray-50 px-8 py-4 rounded-full font-bold transition-all hover:scale-105 shadow-lg"
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

export default RatingService;
