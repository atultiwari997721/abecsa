import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaBookOpen, FaShieldAlt, FaChartPie, FaTerminal, FaCheckCircle, 
    FaRocket, FaUsers, FaLightbulb, FaChevronDown, FaCode, FaMicrochip 
} from 'react-icons/fa';

const OurProgram = () => {
    const [activeFaq, setActiveFaq] = useState(null);

    const curriculum = [
        {
            stage: "Phase 1: Architectural Foundations",
            desc: "The transition from developer to architect starts here.",
            topics: ["Modern Javascript Mastery", "Responsive UI Design System", "API Design Patterns", "State Management Deep Dive"],
            icon: <FaTerminal className="text-blue-500" />
        },
        {
            stage: "Phase 2: Full-Stack Masterclass",
            desc: "Building resilient, scalable, and secure applications.",
            topics: ["Database Scaling & Optimization", "Serverless Architectures", "Security & Authentication", "Real-time Data Streams"],
            icon: <FaShieldAlt className="text-purple-500" />
        },
        {
            stage: "Phase 3: Industry Deployment",
            desc: "Final polish and professional standard delivery.",
            topics: ["CI/CD Pipelines", "Performance Audit & SEO", "Client Management", "Production Launch Strategies"],
            icon: <FaRocket className="text-emerald-500" />
        }
    ];

    const mentors = [
        { name: "Alex Rivers", role: "Lead Systems Architect", domain: "Cloud & DevSecOps", img: "https://i.pravatar.cc/150?u=alex" },
        { name: "Sarah Chen", role: "Head of Marketing", domain: "Growth & Brand Strategy", img: "https://i.pravatar.cc/150?u=sarah" },
        { name: "Marcus Thorne", role: "Principal UI/UX Designer", domain: "Design Systems", img: "https://i.pravatar.cc/150?u=marcus" }
    ];

    const faqs = [
        { q: "Do I need prior coding experience?", a: "While basic understanding helps, our program is structured to take you from foundational logic to advanced architecture." },
        { q: "Is there a certification provided?", a: "Yes, upon successful completion and project delivery, you receive an Abecsa Certified Professional Architect certificate." },
        { q: "What the duration of the masterclass?", a: "The program typically spans 12-16 weeks, depending on the intensity of your project phase." }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-[#050505] pt-24 pb-20 transition-colors duration-300 relative overflow-hidden">
            
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                
                {/* Hero section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-24"
                >
                    <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-blue-100 dark:border-blue-500/20">
                         <FaLightbulb /> New Batch Opening Soon
                    </div>
                    <h1 className="text-4xl md:text-7xl font-bold font-heading mb-6 text-slate-900 dark:text-white leading-tight">
                        Forge Your <span className="text-blue-600 dark:text-blue-500">Professional</span> Edge
                    </h1>
                    <p className="text-slate-600 dark:text-gray-400 text-lg md:text-xl max-w-3xl mx-auto font-body mb-8">
                        The Abecsa Program isn't just a course—it's an engineering incubator designed to turn developers into tech leaders and software architects.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-500/20 transition-all">Request Syllabus</button>
                    </div>
                </motion.div>

                {/* Expanded Curriculum Grid */}
                <div className="mb-32">
                    <h2 className="text-3xl font-bold font-heading mb-12 text-center text-slate-900 dark:text-white">Three Phases of <span className="text-blue-600">Mastery</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {curriculum.map((item, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gray-50 dark:bg-white/5 p-8 rounded-[35px] border border-gray-100 dark:border-white/10 hover:border-blue-500/50 transition-all group"
                            >
                                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                                <h3 className="text-xl font-black font-heading mb-3 text-slate-800 dark:text-white uppercase tracking-tight">{item.stage}</h3>
                                <p className="text-slate-500 dark:text-gray-400 text-sm mb-6 leading-relaxed italic">{item.desc}</p>
                                <ul className="space-y-3">
                                    {item.topics.map((topic, ti) => (
                                        <li key={ti} className="flex items-start gap-2 text-slate-700 dark:text-slate-300 text-xs font-bold font-body">
                                            <FaCheckCircle className="text-blue-500 mt-0.5 flex-shrink-0" />
                                            {topic}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Mentors Section */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold font-heading mb-4 text-slate-900 dark:text-white">Learn From the <span className="text-blue-600">Architects</span></h2>
                        <p className="text-slate-500 dark:text-gray-400">Our mentors bring decades of combined experience from Silicon Valley and top tech hubs.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {mentors.map((m, i) => (
                            <div key={i} className="bg-white dark:bg-white/5 rounded-[40px] p-8 border border-gray-100 dark:border-white/10 text-center hover:shadow-2xl transition-all">
                                <div className="w-24 h-24 rounded-full mx-auto mb-6 p-1 border-2 border-blue-500 overflow-hidden">
                                     <img src={m.img} alt={m.name} className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                                </div>
                                <h4 className="text-xl font-bold font-heading text-slate-900 dark:text-white">{m.name}</h4>
                                <p className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mt-1 mb-4">{m.role}</p>
                                <div className="bg-gray-100 dark:bg-white/10 py-1.5 rounded-full text-[10px] font-bold text-slate-500 dark:text-gray-400 uppercase">
                                    Specialist: {m.domain}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold font-heading mb-12 text-center text-slate-900 dark:text-white uppercase">Common <span className="text-blue-600">Questions</span></h2>
                    <div className="space-y-4">
                        {faqs.map((f, i) => (
                            <div key={i} className="bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden">
                                <button 
                                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                    className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                                >
                                    <span className="font-bold font-heading text-slate-800 dark:text-white">{f.q}</span>
                                    <FaChevronDown className={`transition-transform duration-300 ${activeFaq === i ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
                                </button>
                                <AnimatePresence>
                                    {activeFaq === i && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-6 pb-6 text-slate-600 dark:text-gray-400 text-sm font-body leading-relaxed"
                                        >
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OurProgram;
