import React from 'react';
import { motion } from 'framer-motion';

const AbecsaAbc = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 via-blue-800 to-gray-900 text-white p-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
        className="z-10 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-yellow-300 mb-4 tracking-widest uppercase drop-shadow-md">
          ABC = AAP BANEGE CrorPati
        </h2>
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 drop-shadow-lg mb-6">
          Abecsa Abc for Students
        </h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
        >
          Welcome to the game where your knowledge pays off!
        </motion.p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transition-all"
        >
          Start Game
        </motion.button>
      </motion.div>
      
      {/* Decorative Elements */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-20 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-30"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 right-20 w-48 h-48 bg-blue-500 rounded-full blur-3xl opacity-30"
      />
    </div>
  );
};

export default AbecsaAbc;
