import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaBullhorn, 
  FaVideo, 
  FaSearch, 
  FaShareAlt, 
  FaPhoneAlt, 
  FaCommentDots, 
  FaGem,
  FaCheckCircle,
  FaWhatsapp
} from 'react-icons/fa';
import { config } from '../config';

const Ad = () => {
    const packages = [
        {
            title: "Pamphlets",
            price: "299",
            icon: <FaBullhorn />,
            description: "Traditional marketing delivered digitally.",
            color: "from-blue-500 to-cyan-400"
        },
        {
            title: "Video Shoot",
            price: "599",
            icon: <FaVideo />,
            description: "Professional video shoots for your brand.",
            color: "from-purple-500 to-pink-500"
        },
        {
            title: "SEO",
            price: "2999",
            icon: <FaSearch />,
            description: "Search Engine Optimization for visibility.",
            color: "from-green-500 to-emerald-400"
        },
        {
            title: "Social Media",
            price: "2999",
            icon: <FaShareAlt />,
            description: "Strategic marketing on all social platforms.",
            color: "from-orange-500 to-yellow-500"
        },
        {
            title: "Call Marketing",
            price: "2999",
            icon: <FaPhoneAlt />,
            description: "Reach 1000 people via direct calls.",
            color: "from-red-500 to-rose-400"
        },
        {
            title: "Message Marketing",
            price: "2999",
            icon: <FaCommentDots />,
            description: "Reach 1000 people via SMS/WhatsApp.",
            color: "from-indigo-500 to-violet-500"
        }
    ];

    const handleWhatsApp = (pkgTitle) => {
        const message = `Hello! I'm interested in the ${pkgTitle} package from Adbecsa.`;
        window.open(`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0B1120] pt-20 md:pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8 md:mb-16">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4"
                    >
                        Abecsa Ad
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                    >
                        Premium marketing packages tailored for your growth. Start small or go big with our expert services.
                    </motion.p>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
                >
                    {packages.map((pkg, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -10, transition: { duration: 0.2 } }}
                            className="relative group bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-5 md:p-8 border border-gray-200 dark:border-gray-700 overflow-hidden shadow-xl hover:shadow-2xl transition-all"
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${pkg.color} opacity-10 group-hover:opacity-20 transition-opacity rounded-bl-full`} />
                            
                            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${pkg.color} flex items-center justify-center text-white text-2xl md:text-3xl mb-4 md:mb-6 shadow-lg`}>
                                {pkg.icon}
                            </div>
                            
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">{pkg.title}</h3>
                            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4 md:mb-6">{pkg.description}</p>
                            
                            <div className="flex items-baseline mb-4 md:mb-6">
                                <span className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">Starts at</span>
                                <span className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white ml-2">₹{pkg.price}</span>
                            </div>

                            <button 
                                onClick={() => handleWhatsApp(pkg.title)}
                                className={`w-full py-4 rounded-xl bg-gradient-to-r ${pkg.color} text-white font-bold text-lg shadow-lg hover:shadow-xl transform transition-all active:scale-95`}
                            >
                                Get Started
                            </button>

                        </motion.div>
                    ))}
                </motion.div>

                {/* Premium Bundle Offer */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-3xl md:rounded-[2.5rem] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-0.5 md:p-1"
                >
                    <div className="bg-white dark:bg-gray-900 rounded-[1.4rem] md:rounded-[2.4rem] p-6 md:p-12 relative overflow-hidden">
                        {/* Decorative background elements */}
                        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-64 h-64 bg-purple-500 opacity-20 blur-3xl rounded-full" />
                        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-64 h-64 bg-blue-500 opacity-20 blur-3xl rounded-full" />

                        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                            <div className="max-w-xl text-center lg:text-left">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 font-bold text-sm mb-6">
                                    <FaGem /> MOST POPULAR BUNDLE
                                </div>
                                <h2 className="text-2xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 md:mb-6">
                                    All-in-One Marketing Suite
                                </h2>
                                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                                    Get our complete marketing arsenal. Includes SEO, Social Media, Calls, and Messages at an unbeatable price.
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 mb-6 md:mb-8">
                                    {[
                                        "Complete SEO Suite",
                                        "Social Media Strategy",
                                        "Call Marketing (1000+)",
                                        "Message Marketing (1000+)",
                                        "Priority Support",
                                        "Custom Video Ad"
                                    ].map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 md:gap-3 text-gray-700 dark:text-gray-300 font-medium text-sm md:text-base">
                                            <FaCheckCircle className="text-green-500 shrink-0" /> {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="w-full lg:w-96 p-6 md:p-8 rounded-2xl md:rounded-[2rem] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-center shadow-2xl backdrop-blur-xl">
                                <div className="text-gray-500 dark:text-gray-400 font-bold mb-1 md:mb-2 text-xs md:text-base">LIMITED TIME PRICE</div>
                                <div className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-1 md:mb-2">₹5999</div>
                                <div className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8 text-xs md:text-base">One-time payment</div>
                                <button 
                                    onClick={() => handleWhatsApp("All-in-One Marketing Suite")}
                                    className="w-full py-4 md:py-5 rounded-xl md:rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg md:text-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95"
                                >
                                    Claim This Offer
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Floating WhatsApp Button */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleWhatsApp("General Inquiry")}
                className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center gap-2 font-bold hover:shadow-green-500/20 transition-all"
            >
                <FaWhatsapp className="text-3xl" />
                <span className="hidden md:inline">Contact Us</span>
            </motion.button>
        </div>

    );
};

export default Ad;
