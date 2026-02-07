import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaGraduationCap, FaBriefcase, FaCertificate, FaUserTie } from 'react-icons/fa';
import '../styles/global.css'; // Assuming global styles are here
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';

const StudentAmbassadorDashboard = ({ ambassadorId }) => {
    const navigate = useNavigate();
    const { user, profile, signOut, loading } = useAuth();
    const [ambassadorName, setAmbassadorName] = useState('');
    
    // For admin viewing
    const targetId = ambassadorId || user?.id;



    useEffect(() => {
        const fetchName = async () => {
             if (ambassadorId) {
                 const { data } = await supabase.from('profiles').select('full_name').eq('id', ambassadorId).single();
                 if (data) setAmbassadorName(data.full_name);
             } else if (profile && profile.full_name) {
                 setAmbassadorName(profile.full_name);
             }
        };
        fetchName();
    }, [profile, ambassadorId]);


    const handleLogout = async () => {
        await signOut();
        navigate('/login');
    };

    const handleLearn = () => {
        navigate('/lern_with_abecsa');
    };

    if (loading || !profile) return <div style={{ color: '#fff', padding: '2rem' }}>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#050505] text-slate-900 dark:text-white transition-colors duration-300 pt-[100px] px-4 md:px-[5%] pb-8 font-body">

            {/* Header */}
            <div className="flex justify-between items-center mb-12 border-b border-gray-200 dark:border-white/10 pb-4">
                <div>
                    <h1 className="text-3xl font-bold m-0 text-blue-600 dark:text-[#00d2ff]">Student Ambassador Dashboard</h1>
                    <span className="text-sm text-slate-500 dark:text-gray-400">
                        {ambassadorId ? 'Viewing Dashboard (Admin View)' : `Welcome back, ${ambassadorName}`}
                    </span>
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-transparent border border-red-500 text-red-500 dark:text-[#ff0055] dark:border-[#ff0055] px-3 py-1 text-sm rounded-md cursor-pointer flex items-center gap-2 transition-all duration-300 hover:bg-red-500 hover:text-white"
                >
                    <FaSignOutAlt /> Logout
                </button>
            </div>

            {/* Actions Grid */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 mt-8">
                
                {/* Learn Card */}
                <div 
                    onClick={handleLearn}
                    className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-green-400 dark:hover:border-[#00ff88] shadow-sm hover:shadow-md text-center group"
                >
                    <div className="bg-green-100 dark:bg-[#00ff88]/10 p-6 rounded-full">
                        <FaGraduationCap size={40} className="text-green-500 dark:text-[#00ff88]" />
                    </div>
                    <div>
                        <h3 className="m-0 mb-2 text-slate-800 dark:text-white font-bold text-lg">Abecsa Learn</h3>
                        <p className="m-0 text-slate-500 dark:text-gray-400 text-sm">Access premium courses and learning materials.</p>
                    </div>
                </div>

                {/* Internship Card */}
                <div 
                    className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-purple-500 dark:hover:border-[#bc13fe] shadow-sm hover:shadow-md text-center group"
                     onClick={() => navigate('/internship')}
                >
                    <div className="bg-purple-100 dark:bg-[#bc13fe]/10 p-6 rounded-full">
                        <FaUserTie size={40} className="text-purple-500 dark:text-[#bc13fe]" />
                    </div>
                     <div>
                        <h3 className="m-0 mb-2 text-slate-800 dark:text-white font-bold text-lg">Apply for Internship</h3>
                        <p className="m-0 text-slate-500 dark:text-gray-400 text-sm">Join our team and gain real-world experience.</p>
                    </div>
                </div>

                {/* Job Card */}
                <div 
                     className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 dark:hover:border-[#00d2ff] shadow-sm hover:shadow-md text-center group"
                      onClick={() => navigate('/work_with_us')}
                >
                    <div className="bg-blue-100 dark:bg-[#00d2ff]/10 p-6 rounded-full">
                        <FaBriefcase size={40} className="text-blue-500 dark:text-[#00d2ff]" />
                    </div>
                     <div>
                        <h3 className="m-0 mb-2 text-slate-800 dark:text-white font-bold text-lg">Apply for Job</h3>
                        <p className="m-0 text-slate-500 dark:text-gray-400 text-sm">Explore career opportunities at Abecsa.</p>
                    </div>
                </div>

                {/* Certificate Card */}
                <div 
                     className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 dark:hover:border-[#ffd700] shadow-sm hover:shadow-md text-center group"
                      onClick={() => navigate('/certificate')}
                >
                    <div className="bg-yellow-100 dark:bg-[#ffd700]/10 p-6 rounded-full">
                        <FaCertificate size={40} className="text-yellow-500 dark:text-[#ffd700]" />
                    </div>
                     <div>
                        <h3 className="m-0 mb-2 text-slate-800 dark:text-white font-bold text-lg">Get Certificate</h3>
                        <p className="m-0 text-slate-500 dark:text-gray-400 text-sm">Claim your completion certificates.</p>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default StudentAmbassadorDashboard;
