import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaGraduationCap, FaCode, FaRocket, FaUsers, FaArrowRight,
    FaTimes, FaCloudUploadAlt, FaUserTie
} from 'react-icons/fa';
import { config } from '../config';

const Internship = () => {
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

    const handleApplyClick = (domain) => {
        setSelectedRole({ title: `Internship: ${domain.title}` });
        setShowModal(true);
    };

    const handleApplyToWhatsapp = (e) => {
        e.preventDefault();
        const message = `🚀 NEW INTERNSHIP APPLICATION\n--------------------------------\nDomain: ${selectedRole.title}\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nExperience: ${formData.exp}\nPortfolio: ${formData.portfolio}\n*CV Uploaded: ${formData.cvName || 'No file selected'}*\n--------------------------------\nHi ABECSA Team, I'm excited to join the internship program!`;
        
        const link = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(link, '_blank');
        setShowModal(false);
        setFormData({ name: '', email: '', phone: '', exp: '', portfolio: '', cvName: '' });
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0B1120] pt-24 pb-12 transition-colors duration-300 relative">
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
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 
                                ${domain.color === 'blue' ? 'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 
                                  domain.color === 'purple' ? 'bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400' : 
                                  'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'}`}
                            >
                                {domain.icon}
                            </div>
                            <h3 className="text-xl font-bold font-heading mb-4 text-slate-900 dark:text-white">{domain.title}</h3>
                            <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                                {domain.desc}
                            </p>
                            <button 
                                onClick={() => handleApplyClick(domain)}
                                className="flex items-center gap-2 text-blue-600 dark:text-electricBlue font-bold text-sm uppercase tracking-wider group-hover:gap-4 transition-all"
                            >
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
                            className="bg-white dark:bg-[#0a0f1d] w-full max-w-lg rounded-[40px] p-8 md:p-10 border border-gray-100 dark:border-white/10 shadow-2xl relative z-10 overflow-hidden"
                        >
                            <button 
                                onClick={() => setShowModal(false)}
                                className="absolute top-6 right-6 text-slate-400 hover:text-red-500 transition-colors"
                            >
                                <FaTimes className="text-2xl" />
                            </button>

                            <div className="mb-8">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                        <FaUserTie />
                                    </div>
                                    <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">Internship Application</h2>
                                </div>
                                <p className="text-slate-500 dark:text-gray-400 text-sm">Target Domain: <span className="text-blue-500 font-bold">{selectedRole?.title}</span></p>
                            </div>

                            <form onSubmit={handleApplyToWhatsapp} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input 
                                        type="text" placeholder="Full Name" required 
                                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all text-sm"
                                    />
                                    <input 
                                        type="email" placeholder="Email Address" required 
                                        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all text-sm"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input 
                                        type="tel" placeholder="Phone Number" required 
                                        value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all text-sm"
                                    />
                                    <select 
                                        required 
                                        value={formData.exp} onChange={e => setFormData({...formData, exp: e.target.value})}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all text-sm"
                                    >
                                        <option value="">Status / Education</option>
                                        <option value="Final Year Student">Final Year Student</option>
                                        <option value="Pre-Final Year">Pre-Final Year</option>
                                        <option value="Recent Graduate">Recent Graduate</option>
                                        <option value="Self Taught">Self Taught</option>
                                    </select>
                                </div>
                                <input 
                                    type="url" placeholder="Portfolio / LinkedIn / GitHub Link" required 
                                    value={formData.portfolio} onChange={e => setFormData({...formData, portfolio: e.target.value})}
                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all text-sm"
                                />

                                {/* CV "Upload" Visual Zone */}
                                <div className="relative group">
                                    <input 
                                        type="file" 
                                        className="absolute inset-0 opacity-0 cursor-pointer z-20"
                                        onChange={(e) => setFormData({...formData, cvName: e.target.files[0]?.name})}
                                    />
                                    <div className="border-2 border-dashed border-gray-100 dark:border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center gap-2 group-hover:border-blue-500/50 transition-all bg-gray-50/50 dark:bg-white/5">
                                        <FaCloudUploadAlt className="text-3xl text-slate-300 dark:text-gray-500 group-hover:text-blue-500 transition-all" />
                                        <span className="text-xs font-bold text-slate-400 dark:text-gray-500 group-hover:text-blue-500">
                                            {formData.cvName || 'Upload Resume (PDF)'}
                                        </span>
                                    </div>
                                </div>

                                <button 
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20 mt-4 flex items-center justify-center gap-2"
                                >
                                    Apply on WhatsApp
                                </button>
                                <p className="text-center text-[10px] text-slate-500 dark:text-gray-500 uppercase tracking-widest">
                                    Final step: Redirects to WhatsApp
                                </p>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Internship;
