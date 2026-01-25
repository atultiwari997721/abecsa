import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
    FaLightbulb, FaGlobe, FaCogs, FaGraduationCap, FaUserTie, FaIdCard, FaWhatsapp
} from 'react-icons/fa';
import { config } from '../config';

const OurProgram = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const scrollRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const services = [
        {
            title: "Internship Program",
            icon: <FaGraduationCap />,
            desc: "High-growth learning opportunities for aspiring developers and architects. Real-world project exposure guaranteed.",
            color: "#3b82f6"
        },
        {
            title: "Career Opportunities",
            icon: <FaUserTie />,
            desc: "Join our elite squad and work on international-scale software projects. High-performance culture.",
            color: "#8b5cf6"
        },
        {
            title: "Full Scale Website",
            icon: <FaGlobe />,
            desc: "Comprehensive enterprise solutions with advanced security, scalability, and premium design language.",
            color: "#06b6d4"
        },
        {
            title: "Portfolio Website",
            icon: <FaIdCard />,
            desc: "High-end personal branding for professionals. Modern glassmorphism and stunning micro-interactions.",
            color: "#10b981"
        },
        {
            title: "Software Solution",
            icon: <FaCogs />,
            desc: "Custom-engineered software tailored to solve complex business challenges with cutting-edge tech.",
            color: "#f59e0b"
        }
    ];

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            const progress = scrollLeft / (scrollWidth - clientWidth || 1);
            setScrollProgress(progress);
        }
    };

    const handleContact = (service) => {
        const message = `Hello! I am interested in ${service} from ABECSA.`;
        const link = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(link, '_blank');
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#050505] pt-24 pb-20 transition-colors duration-300 relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-blue-100 dark:border-blue-500/20">
                         <FaLightbulb /> New Opportunities
                    </div>
                    <h1 className="text-4xl md:text-7xl font-bold font-heading mb-6 text-slate-900 dark:text-white leading-tight">
                        Our <span className="text-blue-600 dark:text-blue-500">Ecosystem</span>
                    </h1>
                    <p className="text-slate-600 dark:text-gray-400 text-lg md:text-xl max-w-3xl mx-auto font-body mb-8">
                        Explore our comprehensive offerings designed for growth, innovation, and digital excellence.
                    </p>
                </motion.div>

                <div 
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex flex-nowrap md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-8 md:pb-0 scrollbar-hide snap-x snap-mandatory"
                    style={{ 
                        msOverflowStyle: 'none', 
                        scrollbarWidth: 'none',
                        WebkitOverflowScrolling: 'touch'
                    }}
                >
                    {services.map((s, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="min-w-[85vw] md:min-w-0 snap-center bg-gray-50 dark:bg-white/5 p-8 rounded-[35px] border border-gray-100 dark:border-white/10 hover:border-blue-500/40 transition-all group flex flex-col justify-between"
                        >
                            <div>
                                <div 
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform shadow-lg"
                                    style={{ 
                                        backgroundColor: `${s.color}22`,
                                        color: s.color,
                                        boxShadow: `0 10px 20px -5px ${s.color}44`
                                    }}
                                >
                                    {s.icon}
                                </div>
                                <h3 className="text-2xl font-bold font-heading mb-4 text-slate-900 dark:text-white uppercase tracking-tight">
                                    {s.title}
                                </h3>
                                <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed mb-8">
                                    {s.desc}
                                </p>
                            </div>
                            <button 
                                onClick={() => handleContact(s.title)}
                                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600"
                            >
                                Get Started <FaWhatsapp className="text-lg" />
                            </button>
                        </motion.div>
                    ))}
                </div>

                {isMobile && (
                    <div className="mt-8 flex justify-center">
                        <div className="w-[100px] h-[4px] bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-blue-600 transition-all duration-200"
                                style={{ width: `${Math.max(10, scrollProgress * 100)}%` }}
                            />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default OurProgram;
