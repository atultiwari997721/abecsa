import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCode, FaRocket, FaUsers, FaArrowRight } from 'react-icons/fa';

const Internship = () => {
    const domains = [
        {
            title: "Web Development",
            icon: <FaCode />,
            color: "blue",
            desc: "Master modern frameworks like React, Vite, and Supabase while building real-world enterprise tools."
        },
        {
            title: "Digital Marketing",
            icon: <FaRocket />,
            color: "purple",
            desc: "Learn the art of growth hacking, SEO, and social proof strategies used by top-tier tech firms."
        },
        {
            title: "UI/UX Design",
            icon: <FaUsers />,
            color: "emerald",
            desc: "Design premium interfaces that wow users, focusing on glassmorphism and modern aesthetics."
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-[#0B1120] pt-24 pb-12 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4">
                
                {/* Hero Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
                        Launch Your <span className="text-blue-600 dark:text-electricBlue">Career</span>
                    </h1>
                    <p className="text-slate-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-body">
                        Join Abecsa's elite internship program. Build products that matter, learn from experts, and transform your skills into a professional edge.
                    </p>
                </motion.div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {domains.map((domain, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gray-50 dark:bg-white/5 p-8 rounded-[30px] border border-gray-100 dark:border-white/10 hover:border-blue-500/50 transition-all duration-300 group"
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 bg-${domain.color}-100 dark:bg-${domain.color}-500/10 text-${domain.color}-600 dark:text-${domain.color}-400`}>
                                {domain.icon}
                            </div>
                            <h3 className="text-xl font-bold font-heading mb-4 text-slate-900 dark:text-white">{domain.title}</h3>
                            <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                                {domain.desc}
                            </p>
                            <button className="flex items-center gap-2 text-blue-600 dark:text-electricBlue font-bold text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
                                Apply Now <FaArrowRight />
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Cultural Section */}
                <div className="bg-blue-600 dark:bg-blue-600 rounded-[40px] p-8 md:p-16 text-white relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="max-w-xl">
                            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">More Than Just Code.</h2>
                            <p className="text-blue-100 text-lg mb-8">
                                At Abecsa, we don't just give you tasks. We give you ownership. You'll be part of a team that values creativity, speed, and uncompromising quality.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold border border-white/20">Remote Friendly</div>
                                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold border border-white/20">Mentorship</div>
                                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold border border-white/20">Certification</div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3">
                             <div className="aspect-square bg-white/10 backdrop-blur-3xl rounded-[30px] border border-white/20 flex items-center justify-center p-8 text-center">
                                <div>
                                    <FaGraduationCap className="text-6xl mb-4 mx-auto" />
                                    <p className="text-2xl font-bold font-heading">Summer '26 Batch</p>
                                    <p className="text-blue-100 mt-2">Open for Applications</p>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Internship;
