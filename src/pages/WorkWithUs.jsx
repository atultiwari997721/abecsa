import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaHandshake, FaGlobe, FaLightbulb, FaHeart, FaChevronRight, 
    FaCoffee, FaLaptopCode, FaUmbrellaBeach, FaMedkit, FaCalendarAlt,
    FaPlus, FaTimes, FaCloudUploadAlt, FaBriefcase, FaUserTie
} from 'react-icons/fa';
import { config } from '../config';

const WorkWithUs = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        exp: '',
        portfolio: '',
        cvName: ''
    });

    const rolesRef = useRef(null);

    const availableRoles = [
        { id: 1, title: "Full Stack Architect", type: "Full Time", location: "Remote / Hybrid", salary: "Competitive" },
        { id: 2, title: "Growth & SEO Manager", type: "Full Time", location: "Global Remote", salary: "High Commission + Base" },
        { id: 3, title: "Creative Lead (UI/UX)", type: "Contract", location: "Project Based", salary: "Premium Hourly" },
        { id: 4, title: "Client Success Associate", type: "Full Time", location: "India / Remote", salary: "Base + Performance" }
    ];

    const perks = [
        { title: "Dynamic Growth", icon: <FaLaptopCode />, desc: "Work on cutting-edge stacks like Vite, React, & Supabase." },
        { title: "Remote Options", icon: <FaUmbrellaBeach />, desc: "Balance your life with flexible workspace choices." },
        { title: "Health & Wellness", icon: <FaMedkit />, desc: "Comprehensive health coverage for you and your family." },
        { title: "Global Network", icon: <FaGlobe />, desc: "Collaborate with visionaries from across the globe." }
    ];

    const steps = [
        { title: "Application", desc: "Submit your portfolio or proposal via our portal.", icon: "01" },
        { title: "The Chat", desc: "A brief cultural and technical alignment call.", icon: "02" },
        { title: "Deep Dive", desc: "Show us your skills with a practical challenge.", icon: "03" },
        { title: "Offboarding", desc: "Finalize terms and start your Abecsa journey.", icon: "04" }
    ];

    const handleApplyClick = (role) => {
        setSelectedRole(role);
        setShowModal(true);
    };

    const handleApplyToWhatsapp = (e) => {
        e.preventDefault();
        const message = `🚀 NEW JOB APPLICATION\n--------------------------------\nRole: ${selectedRole.title}\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nExperience: ${formData.exp}\nPortfolio: ${formData.portfolio}\n*CV Uploaded: ${formData.cvName || 'No file selected'}*\n--------------------------------\nHi ABECSA Team, I'm excited to apply for this position!`;
        
        const link = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(link, '_blank');
        setShowModal(false);
        setFormData({ name: '', email: '', phone: '', exp: '', portfolio: '', cvName: '' });
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0B1120] pt-20 pb-0 transition-colors duration-300 relative overflow-hidden">
            
            {/* HERO: Full Immersive */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden mb-20 bg-slate-900">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop" 
                        alt="Office" 
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1120]/80 to-[#0B1120]"></div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                         <h1 className="text-5xl md:text-8xl font-black font-heading text-white mb-6 uppercase tracking-tighter leading-none">
                            Dream <br /><span className="text-blue-500">Fast.</span> Build <span className="text-blue-500">More.</span>
                        </h1>
                        <p className="text-slate-300 text-lg md:text-2xl mb-10 font-body max-w-2xl mx-auto">
                            Abecsa doesn't just hire talent. We invest in architects of the future. Join a culture of high speed and extreme quality.
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <button 
                                onClick={() => rolesRef.current?.scrollIntoView({ behavior: 'smooth' })}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-blue-500/20"
                            >
                                View Roles
                            </button>
                            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all">Partner Agencies</button>
                        </div>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-4">
                
                {/* Available Roles Section */}
                <div ref={rolesRef} className="mb-32">
                    <div className="text-center mb-16">
                         <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-slate-900 dark:text-white uppercase">Open <span className="text-blue-500">Board</span></h2>
                         <p className="text-slate-500 dark:text-gray-400">Join our core team and build the infra of tomorrow.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {availableRoles.map((role) => (
                            <div key={role.id} className="bg-gray-50 dark:bg-white/5 p-8 rounded-[35px] border border-gray-100 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 hover:border-blue-500/40 transition-all group">
                                <div className="text-center md:text-left">
                                    <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                                        <FaBriefcase className="text-blue-500 text-sm" />
                                        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{role.type}</span>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold font-heading text-slate-900 dark:text-white mb-2">{role.title}</h3>
                                    <p className="text-slate-500 text-xs font-bold uppercase">{role.location} • {role.salary}</p>
                                </div>
                                <button 
                                    onClick={() => handleApplyClick(role)}
                                    className="bg-white dark:bg-white/10 text-blue-600 dark:text-white px-8 py-3 rounded-2xl font-bold text-sm border border-blue-100 dark:border-white/5 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all whitespace-nowrap"
                                >
                                    Quick Apply
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Perks Grid */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-slate-900 dark:text-white uppercase">The <span className="text-blue-500">Abecsa</span> Life</h2>
                        <p className="text-slate-500 dark:text-gray-400">Exotic perks designed for high-performance individuals.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {perks.map((p, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-gray-50 dark:bg-white/5 p-8 rounded-[40px] border border-gray-100 dark:border-white/10 hover:shadow-2xl transition-all group"
                            >
                                <div className="text-4xl text-blue-500 mb-6 group-hover:scale-125 transition-transform duration-500">{p.icon}</div>
                                <h3 className="text-xl font-bold font-heading mb-3 text-slate-900 dark:text-white">{p.title}</h3>
                                <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Timeline Process */}
                <div className="mb-32 relative">
                    <div className="text-center mb-20">
                         <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-slate-900 dark:text-white">Seamless <span className="text-blue-500">Hiring</span></h2>
                         <p className="text-slate-500 dark:text-gray-400">Four simple steps to joining our ecosystem.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                        {steps.map((s, i) => (
                            <div key={i} className="relative text-center md:text-left">
                                <span className="text-7xl font-black text-blue-500/10 dark:text-blue-500/5 font-heading absolute -top-8 -left-4 z-0">{s.icon}</span>
                                <div className="relative z-10 pt-4">
                                     <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white mb-4">{s.title}</h3>
                                     <p className="text-slate-600 dark:text-gray-400 text-sm font-body leading-relaxed">{s.desc}</p>
                                </div>
                                {i < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-10 -right-4 text-gray-200 dark:text-white/10 text-xl">
                                        <FaChevronRight />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Partnership */}
                <div className="relative rounded-[50px] overflow-hidden bg-blue-600 p-8 md:p-20 text-white mb-20">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full translate-y-[-20%] translate-x-[20%]"></div>
                    <div className="relative z-10 flex flex-col items-center text-center">
                        <FaHandshake className="text-7xl mb-8 opacity-40" />
                        <h2 className="text-3xl md:text-5xl font-black font-heading mb-6 tracking-tight">Scale Your Agency <br />With Abecsa.</h2>
                        <p className="text-blue-100 text-lg max-w-2xl mb-10">
                            We partner with creative agencies, SEO firms, and freelancers to provide high-end engineering bandwidth. Let's build the extraordinary.
                        </p>
                        <button className="bg-white text-blue-600 px-12 py-4 rounded-full font-black uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl">Start Partnership</button>
                    </div>
                </div>

            </div>

            {/* Application Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white dark:bg-[#0a0f1d] w-full max-w-lg max-h-[95vh] overflow-y-auto rounded-[30px] md:rounded-[40px] p-4 md:p-10 border border-gray-100 dark:border-white/10 shadow-2xl relative z-10"
                        >
                            <button 
                                onClick={() => setShowModal(false)}
                                className="absolute top-4 right-4 md:top-6 md:right-6 text-slate-400 hover:text-red-500 transition-colors"
                            >
                                <FaTimes className="text-xl md:text-2xl" />
                            </button>

                            <div className="mb-4 md:mb-8">
                                <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                        <FaUserTie className="text-sm md:text-base" />
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900 dark:text-white">Apply Now</h2>
                                </div>
                                <p className="text-slate-500 dark:text-gray-400 text-[10px] md:text-sm uppercase tracking-wide">Position: <span className="text-blue-500 font-black">{selectedRole?.title}</span></p>
                            </div>

                            <form onSubmit={handleApplyToWhatsapp} className="space-y-2 md:space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                                    <input 
                                        type="text" placeholder="Full Name" required 
                                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 p-3 md:p-4 rounded-xl md:rounded-2xl outline-none focus:border-blue-500 transition-all text-[13px] md:text-sm"
                                    />
                                    <input 
                                        type="email" placeholder="Email Address" required 
                                        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 p-3 md:p-4 rounded-xl md:rounded-2xl outline-none focus:border-blue-500 transition-all text-[13px] md:text-sm"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                                    <input 
                                        type="tel" placeholder="Phone Number" required 
                                        value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 p-3 md:p-4 rounded-xl md:rounded-2xl outline-none focus:border-blue-500 transition-all text-[13px] md:text-sm"
                                    />
                                    <select 
                                        required 
                                        value={formData.exp} onChange={e => setFormData({...formData, exp: e.target.value})}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 p-3 md:p-4 rounded-xl md:rounded-2xl outline-none focus:border-blue-500 transition-all text-[13px] md:text-sm"
                                    >
                                        <option value="">Experience Level</option>
                                        <option value="Fresher">Fresher</option>
                                        <option value="1-2 Years">1-2 Years</option>
                                        <option value="3-5 Years">3-5 Years</option>
                                        <option value="5+ Years">5+ Years</option>
                                    </select>
                                </div>
                                <input 
                                    type="url" placeholder="Portfolio / LinkedIn Link" required 
                                    value={formData.portfolio} onChange={e => setFormData({...formData, portfolio: e.target.value})}
                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 p-3 md:p-4 rounded-xl md:rounded-2xl outline-none focus:border-blue-500 transition-all text-[13px] md:text-sm"
                                />

                                {/* CV "Upload" Visual Zone */}
                                <div className="relative group">
                                    <input 
                                        type="file" 
                                        className="absolute inset-0 opacity-0 cursor-pointer z-20"
                                        onChange={(e) => setFormData({...formData, cvName: e.target.files[0]?.name})}
                                    />
                                    <div className="border-2 border-dashed border-gray-100 dark:border-white/10 p-3 md:p-6 rounded-xl md:rounded-2xl flex flex-col items-center justify-center gap-1 md:gap-2 group-hover:border-blue-500/50 transition-all bg-gray-50/50 dark:bg-white/5">
                                        <FaCloudUploadAlt className="text-2xl md:text-3xl text-slate-300 dark:text-gray-500 group-hover:text-blue-500 transition-all" />
                                        <span className="text-[11px] md:text-xs font-bold text-slate-400 dark:text-gray-500 group-hover:text-blue-500">
                                            {formData.cvName || 'Upload CV (PDF/DOCX)'}
                                        </span>
                                    </div>
                                </div>

                                <button 
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 md:p-4 rounded-xl md:rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 text-xs md:text-sm"
                                >
                                    Submit via WhatsApp
                                </button>
                                <p className="text-center text-[10px] text-slate-500 dark:text-gray-500 uppercase tracking-widest mt-1">
                                    Redirects to WhatsApp
                                </p>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default WorkWithUs;
