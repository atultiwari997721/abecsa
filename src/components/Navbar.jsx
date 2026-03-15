import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaSun, FaMoon, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import ContactPopup from './ContactPopup'; 
import { useTheme } from '../context/ThemeContext'; 
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [welfareMessage, setWelfareMessage] = useState(''); // State for welfare theme alert message
    const { toggleTheme, theme, setTheme } = useTheme(); 
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Listen for global contact open event
    useEffect(() => {
        const handleOpenContact = () => setIsContactOpen(true);
        window.addEventListener('open-contact', handleOpenContact);
        return () => window.removeEventListener('open-contact', handleOpenContact);
    }, []);

    // Force Light Mode on Welfare Page
    useEffect(() => {
        if (location.pathname.startsWith('/welfare')) {
            setTheme('light');
        }
    }, [location.pathname, setTheme]);

    const navLinks = [
        { name: 'Services', href: '/#services' },
        { name: 'Abecsa Ad', href: '/ad' },
        { name: 'Case Studies', href: '/#portfolio' }, 
        { name: 'Contact Us', href: '/#contact' },
        { name: 'Courses', href: '/courses' },
        { name: 'Certificates', href: '/certificate' },
        { name: 'Apps', href: '/apps' },
        { name: 'Welfare', href: '/welfare' },
        { name: 'MPOnline', href: '/mpOnline' },
        { name: 'Websites', href: '/websites' },
    ];

    const handleLogout = async () => {
        await signOut();
        navigate('/login');
        setIsMenuOpen(false);
    };

    const handleThemeToggle = () => {
        if (location.pathname.startsWith('/welfare')) {
            const messages = [
                "Welfare Is to Bright The Future not in Dark",
                "Let the light of opportunity guide your way.",
                "Our mission brings light to every path, leaving no room for darkness.",
                "The bright future of students begins here, in the light."
            ];
            const randomMsg = messages[Math.floor(Math.random() * messages.length)];
            setWelfareMessage(randomMsg);
            
            // Auto close after 3 seconds
            setTimeout(() => setWelfareMessage(''), 3000);
        } else {
            toggleTheme();
        }
    };

    const isDashboard = location.pathname.includes('/dashboard') || location.pathname.includes('/admin');
    const isExamPortal = location.pathname.includes('/exam/');
    const isAdminExamCenter = location.pathname.includes('/exam-admin');

    if (isExamPortal) return null;

    if (isAdminExamCenter) {
        return (
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-[#0B1120]/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
                    <div 
                        className="text-xl font-bold tracking-widest cursor-pointer flex gap-0.5" 
                        onClick={() => navigate('/admin')}
                    >
                       <span className="text-blue-600 dark:text-blue-500">A</span>
                       <span className="text-red-600 dark:text-red-600">B</span>
                       <span className="text-yellow-500 dark:text-yellow-400">E</span>
                       <span className="text-blue-600 dark:text-blue-500">C</span>
                       <span className="text-green-600 dark:text-green-500">S</span>
                       <span className="text-red-600 dark:text-red-500">A</span>
                    </div>
                    <button 
                        onClick={handleThemeToggle}
                        className="p-2 rounded-full text-slate-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700"
                    >
                        {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
                    </button>
                </div>
            </nav>
        );
    }

    if (isDashboard) return null; 

    return (
        <>
        {/* Welfare Alert - Centered Flash Message */}
        {welfareMessage && (
            <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-red-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-4 animate-bounce">
                <span className="font-bold text-sm whitespace-nowrap">{welfareMessage}</span>
                <button onClick={() => setWelfareMessage('')} className="hover:bg-white/20 rounded-full p-1 transition-colors">
                    <FaTimes />
                </button>
            </div>
        )}

        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            isScrolled || isMenuOpen
                ? 'bg-white/90 dark:bg-[#0B1120]/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm'
                : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
            {/* Logo */}
            <div 
                className="text-xl font-bold tracking-widest cursor-pointer flex gap-0.5" 
                onClick={() => navigate('/')}
            >
               <span className="text-blue-600 dark:text-blue-500">A</span>
               <span className="text-red-600 dark:text-red-600">B</span>
               <span className="text-yellow-500 dark:text-yellow-400">E</span>
               <span className="text-blue-600 dark:text-blue-500">C</span>
               <span className="text-green-600 dark:text-green-500">S</span>
               <span className="text-red-600 dark:text-red-500">A</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center flex-1 min-w-0 ml-8 justify-end">
                <style>{`
                    .hide-scroll::-webkit-scrollbar { display: none; }
                `}</style>
                
                {/* Simple Scrollable Links */}
                <div 
                    className="flex items-center gap-6 overflow-x-auto hide-scroll py-2 px-2 flex-1 justify-start mr-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        className="text-slate-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors text-xs font-bold tracking-wide uppercase whitespace-nowrap shrink-0"
                    >
                        {link.name}
                    </a>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-5 shrink-0 border-l border-gray-300 dark:border-gray-700 pl-5">
                    {/* Theme Toggle */}
                    <button 
                        onClick={handleThemeToggle}
                        className="p-1.5 rounded-full text-slate-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        {theme === 'light' ? <FaMoon size={16} /> : <FaSun size={16} />}
                    </button>

                    {user ? (
                        <div className="flex items-center gap-3 shrink-0">
                            <button 
                                onClick={() => navigate('/dashboard')}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-slate-700 dark:text-white rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-xs font-bold whitespace-nowrap"
                            >
                                <FaUserCircle /> Dashboard
                            </button>
                            <button 
                                onClick={handleLogout}
                                className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors shrink-0"
                                title="Sign Out"
                            >
                                <FaSignOutAlt size={16} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 shrink-0">
                            <button 
                                onClick={() => navigate('/login')}
                                className="text-slate-600 dark:text-white text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
                            >
                                Login
                            </button>
                            <button 
                                onClick={() => setIsContactOpen(true)}
                                className="px-4 py-1.5 bg-blue-600 dark:bg-electricBlue text-white text-sm rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 font-semibold shadow-md shadow-blue-500/20 whitespace-nowrap"
                            >
                                Hire Us
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Controls */}
            <div className="md:hidden flex items-center gap-3">
                 {/* Theme Toggle Mobile */}
                 <button 
                    onClick={handleThemeToggle}
                    className="p-1.5 rounded-full text-slate-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    {theme === 'light' ? <FaMoon size={16} /> : <FaSun size={16} />}
                </button>

                <button
                    className="text-slate-900 dark:text-gray-200 text-xl p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
            className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#0B1120] border-b border-gray-200 dark:border-gray-800 transition-all duration-300 ${
                isMenuOpen ? 'max-h-[85vh] opacity-100 py-6 overflow-y-auto' : 'max-h-0 opacity-0 py-0 overflow-hidden'
            }`}
            >
            <div className="flex flex-col items-center gap-4 px-6 pb-4">
                {navLinks.map((link) => (
                <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white text-lg font-medium w-full text-center py-2 border-b border-gray-100 dark:border-gray-800/50"
                >
                    {link.name}
                </a>
                ))}

                {user ? (
                    <>
                        <button 
                            onClick={() => { navigate('/dashboard'); setIsMenuOpen(false); }}
                            className="w-full py-3 bg-gray-100 dark:bg-gray-800 text-slate-700 dark:text-white rounded-lg font-bold flex items-center justify-center gap-2"
                        >
                            <FaUserCircle /> Dashboard
                        </button>
                         <button 
                            onClick={handleLogout}
                            className="w-full py-3 text-red-500 font-bold flex items-center justify-center gap-2"
                        >
                            <FaSignOutAlt /> Sign Out
                        </button>
                    </>
                ) : (
                    <>
                         <button 
                            onClick={() => { navigate('/login'); setIsMenuOpen(false); }}
                            className="w-full py-3 text-slate-700 dark:text-white font-bold border border-gray-200 dark:border-gray-700 rounded-lg"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => {
                                setIsContactOpen(true);
                                setIsMenuOpen(false);
                            }}
                            className="w-full py-3 bg-blue-600 dark:bg-electricBlue text-white rounded-lg font-bold shadow-md"
                        >
                        Hire Us
                        </button>
                    </>
                )}
            </div>
            </div>
        </nav>

        <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </>
    );
};

export default Navbar;
