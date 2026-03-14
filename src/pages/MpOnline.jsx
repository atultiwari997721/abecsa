import React from 'react';
import { FaLaptopCode, FaMobileAlt, FaFileAlt, FaIdCard, FaPassport, FaMoneyCheckAlt, FaGraduationCap, FaArrowRight, FaDesktop, FaPrint, FaAppStoreIos } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const mpOnlineServices = [
    { title: 'Aadhaar Services', icon: <FaIdCard />, desc: 'Aadhaar card download, print, and demographic updates securely.' },
    { title: 'PAN Card Services', icon: <FaIdCard />, desc: 'Apply for a new PAN card, corrections, or reprint existing PAN cards.' },
    { title: 'Passport Seva', icon: <FaPassport />, desc: 'Assistance with Passport application, renewal, and appointment scheduling.' },
    { title: 'Govt Certificates', icon: <FaFileAlt />, desc: 'Fast processing for Income, Caste, Domicile, and other essential certificates.' },
    { title: 'Bill Payments', icon: <FaMoneyCheckAlt />, desc: 'Pay your Electricity, Water, Gas, and other utility bills instantly.' },
    { title: 'Online Forms', icon: <FaGraduationCap />, desc: 'Fill out school, college, university admissions, and competitive exam forms.' },
    { title: 'Printing & Scan', icon: <FaPrint />, desc: 'High-quality color, black & white printing, and document scanning services.' },
    { title: 'Digital Solutions', icon: <FaDesktop />, desc: 'Cyber cafe internet surfing, resume making, and general online tasks.' },
];

const appShopFeatures = [
    { title: 'Custom App Development', icon: <FaLaptopCode />, desc: 'Tailor-made Android & iOS applications to scale your business.' },
    { title: 'UI/UX App Design', icon: <FaMobileAlt />, desc: 'Modern, highly intuitive, and user-friendly mobile app interfaces.' },
    { title: 'App Maintenance', icon: <FaAppStoreIos />, desc: 'Regular updates, bug fixes, and performance optimization for your apps.' },
];

const MpOnline = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white dark:bg-[#050510] transition-colors duration-300">
            {/* ── Hero Section ── */}
            <div className="relative overflow-hidden pt-28 pb-20 px-4">
                {/* Animated background elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-blue-200 dark:border-blue-500/30">
                        <FaDesktop />
                        Digital Services Hub
                    </div>

                    <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight">
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                            MPOnline 
                        </span>
                        <br />
                        <span className="text-slate-800 dark:text-white">& App Solutions</span>
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10">
                        Your one-stop destination for all government digital services, online form filling, and premium custom application development by ABECSA.
                    </p>
                </div>
            </div>

            {/* ── Works Done on MPOnline Shop ── */}
            <div className="max-w-6xl mx-auto px-4 pb-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
                        All Works Done on <span className="text-blue-600 dark:text-blue-400">MPOnline Shop</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400">
                        Fast, reliable, and secure assistance for all your online documentation and digital needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {mpOnlineServices.map((service, index) => (
                        <div 
                            key={index} 
                            onClick={() => {
                                const message = `Hello! I need assistance with ${service.title} from the ABECSA MPOnline portal.`;
                                window.open(`https://wa.me/919039821252?text=${encodeURIComponent(message)}`, '_blank');
                            }}
                            className="group relative bg-gray-50 dark:bg-[#111827] border border-gray-100 dark:border-white/10 rounded-3xl p-6 flex flex-col hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5 transition-all duration-300 overflow-hidden cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500 pointer-events-none" />
                            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center text-2xl mb-5 shadow-sm">
                                {service.icon}
                            </div>
                            <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-2">
                                {service.title}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1">
                                {service.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Full App Shop Section ── */}
            <div className="bg-gray-50 dark:bg-white/[0.02] border-y border-gray-100 dark:border-white/5 py-24 px-4 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-50">
                     <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                     <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Text Content */}
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-indigo-200 dark:border-indigo-500/30">
                                <FaMobileAlt />
                                Premium Development
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-white mb-6 leading-tight">
                                Explore Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Full App Shop</span>
                            </h2>
                            <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto lg:mx-0">
                                Beyond regular digital services, we provide enterprise-grade mobile application development. Discover the apps built by ABECSA or get a custom one developed for your brand.
                            </p>
                            
                            <button 
                                onClick={() => navigate('/apps')}
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-300"
                            >
                                Visit ABECSA App Store <FaArrowRight />
                            </button>
                        </div>

                        {/* App Shop Features Grid */}
                        <div className="flex-1 w-full max-w-xl">
                            <div className="grid grid-cols-1 gap-4">
                                {appShopFeatures.map((feature, idx) => (
                                    <div 
                                        key={idx} 
                                        onClick={() => {
                                            const message = `Hello! I'm interested in ${feature.title} from ABECSA App Solutions.`;
                                            window.open(`https://wa.me/919039821252?text=${encodeURIComponent(message)}`, '_blank');
                                        }}
                                        className="bg-white dark:bg-[#0B1120] border border-gray-100 dark:border-white/10 p-5 rounded-3xl flex items-start gap-4 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-colors cursor-pointer"
                                    >
                                        <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center shrink-0 text-xl">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800 dark:text-white text-base mb-1">{feature.title}</h4>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Footer / CTA ── */}
            <div className="py-20 text-center px-4">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Need Help with MPOnline Services?</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8">Visit our digital hub or contact us directly on WhatsApp for immediate assistance.</p>
                <div className="flex justify-center gap-4">
                    <button 
                         onClick={() => {
                             const message = "Hello! I need assistance with MPOnline services / App development.";
                             window.open(`https://wa.me/919039821252?text=${encodeURIComponent(message)}`, '_blank');
                         }}
                         className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-green-500/20 transition-all hover:scale-105"
                    >
                        WhatsApp Us
                    </button>
                    <button 
                         onClick={() => navigate('/contact')} // if contact exists, or just open modal
                         className="bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-slate-800 dark:text-white px-8 py-3 rounded-full font-bold transition-all"
                    >
                        Find Us on Map
                    </button>
                </div>
            </div>
            
        </div>
    );
};

export default MpOnline;
