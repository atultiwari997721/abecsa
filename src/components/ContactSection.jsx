import React from 'react';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { config } from '../config';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 relative bg-slate-50 dark:bg-[#0B1120] transition-colors duration-300 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
         <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Contact</span> Us
          </h2>
          <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Have questions or want to collaborate? Reach out to us through WhatsApp or Email. We're always ready to help!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto">
          {/* WhatsApp Card */}
          <a
            href={`https://wa.me/${config.whatsappNumber || '919589993279'}`} 
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-3xl bg-white dark:bg-gray-900 shadow-xl shadow-blue-900/5 hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center relative overflow-hidden"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 via-green-400/0 to-green-400/5 group-hover:to-green-400/20 transition-all duration-500" />
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-green-500/30">
              <FaWhatsapp className="text-3xl text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2">WhatsApp</h3>
            <p className="text-slate-600 dark:text-gray-400 text-sm mb-4">Chat with our team directly.</p>
            <span className="mt-auto inline-flex items-center justify-center px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 font-semibold text-xs transition-colors duration-300 w-full group-hover:bg-green-600 group-hover:text-white">
              <span className="hidden sm:inline">Message Us</span> <FaWhatsapp className="sm:hidden text-lg" />
            </span>
          </a>

          {/* Email Card */}
          <a
            href="mailto:Abecsa.in@gmail.com"
            className="group p-6 rounded-3xl bg-white dark:bg-gray-900 shadow-xl shadow-blue-900/5 hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center relative overflow-hidden"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 via-blue-400/0 to-blue-400/5 group-hover:to-blue-400/20 transition-all duration-500" />
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 shadow-lg shadow-blue-500/30">
              <FaEnvelope className="text-3xl text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2">Email</h3>
            <p className="text-slate-600 dark:text-gray-400 text-sm mb-4 font-mono truncate w-full">Abecsa.in@gmail.com</p>
            <span className="mt-auto inline-flex items-center justify-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold text-xs transition-colors duration-300 w-full group-hover:bg-blue-600 group-hover:text-white">
              <span className="hidden sm:inline">Send Email</span> <FaEnvelope className="sm:hidden text-lg" />
            </span>
          </a>

          {/* Phone Card */}
          <a
            href="tel:+918717807190"
            className="group p-6 rounded-3xl bg-white dark:bg-gray-900 shadow-xl shadow-blue-900/5 hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center relative overflow-hidden"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-pink-400/0 via-pink-400/0 to-pink-400/5 group-hover:to-pink-400/20 transition-all duration-500" />
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-pink-500/30">
              <FaPhoneAlt className="text-3xl text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2">Phone</h3>
            <p className="text-slate-600 dark:text-gray-400 text-sm mb-4 font-mono truncate w-full">+91 8717807190</p>
            <span className="mt-auto inline-flex items-center justify-center px-4 py-2 rounded-full bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 font-semibold text-xs transition-colors duration-300 w-full group-hover:bg-pink-600 group-hover:text-white">
               <span className="hidden sm:inline">Call Us</span> <FaPhoneAlt className="sm:hidden text-lg" />
            </span>
          </a>

          {/* Address Card */}
          <div
            className="group p-6 rounded-3xl bg-white dark:bg-gray-900 shadow-xl shadow-blue-900/5 hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center relative overflow-hidden"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-amber-400/0 to-amber-400/5 group-hover:to-amber-400/20 transition-all duration-500" />
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 shadow-lg shadow-amber-500/30">
              <FaMapMarkerAlt className="text-3xl text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2">Location</h3>
            <p className="text-slate-600 dark:text-gray-400 text-xs sm:text-sm mb-4">India, Madhya Pradesh</p>
            <span className="mt-auto inline-flex items-center justify-center px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 font-semibold text-xs transition-colors duration-300 w-full group-hover:bg-amber-500 group-hover:text-white">
               <span className="hidden sm:inline">Find Us</span> <FaMapMarkerAlt className="sm:hidden text-lg" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
