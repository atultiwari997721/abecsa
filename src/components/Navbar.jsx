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
    const { toggleTheme, theme } = useTheme(); 
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

    const navLinks = [
        { name: 'Services', href: '#services' },
        { name: 'Solutions', href: '#solutions' },
        { name: 'Case Studies', href: '#portfolio' }, 
    ];

    const handleLogout = async () => {
        await signOut();
        navigate('/login');
        setIsMenuOpen(false);
    };

    const isDashboard = location.pathname.includes('/dashboard') || location.pathname.includes('/admin');

    if (isDashboard) return null; 

    return (
        <>
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            isScrolled || isMenuOpen
                ? 'bg-white/90 dark:bg-[#0B1120]/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm'
                : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            {/* Logo */}
            <div 
                className="text-2xl font-bold tracking-widest cursor-pointer flex gap-0.5" 
                onClick={() => navigate('/')}
            >
               <span className="text-blue-600 dark:text-blue-500">A</span>
               <span className="text-red-600 dark:text-white">B</span>
               <span className="text-yellow-500 dark:text-yellow-400">E</span>
               <span className="text-blue-600 dark:text-blue-500">C</span>
               <span className="text-green-600 dark:text-green-500">S</span>
               <span className="text-red-600 dark:text-red-500">A</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                <a
                    key={link.name}
                    href={link.href}
                    className="text-slate-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors text-sm font-medium tracking-wide uppercase"
                >
                    {link.name}
                </a>
                ))}

                {/* Theme Toggle */}
                <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-full text-slate-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    {theme === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
                </button>

                {user ? (
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate('/dashboard')}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-slate-700 dark:text-white rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-bold"
                        >
                            <FaUserCircle /> Dashboard
                        </button>
                        <button 
                            onClick={handleLogout}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                            title="Sign Out"
                        >
                            <FaSignOutAlt size={18} />
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate('/login')}
                            className="text-slate-600 dark:text-white font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            Login
                        </button>
                        <button 
                            onClick={() => setIsContactOpen(true)}
                            className="px-6 py-2 bg-blue-600 dark:bg-electricBlue text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 font-semibold shadow-md shadow-blue-500/20"
                        >
                            Hire Us
                        </button>
                    </div>
                )}
            </div>

            {/* Mobile Controls */}
            <div className="md:hidden flex items-center gap-4">
                 {/* Theme Toggle Mobile */}
                 <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-full text-slate-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    {theme === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
                </button>

                <button
                    className="text-slate-900 dark:text-gray-200 text-2xl p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
            className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#0B1120] border-b border-gray-200 dark:border-gray-800 transition-all duration-300 overflow-hidden ${
                isMenuOpen ? 'max-h-[500px] opacity-100 py-6' : 'max-h-0 opacity-0 py-0'
            }`}
            >
            <div className="flex flex-col items-center gap-6 px-6">
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
