import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaGraduationCap, FaBriefcase, FaCertificate, FaUserTie } from 'react-icons/fa';
import '../styles/global.css'; // Assuming global styles are here
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';

const StudentAmbassadorDashboard = () => {
    const navigate = useNavigate();
    const { user, profile, signOut, loading } = useAuth();
    const [ambassadorName, setAmbassadorName] = useState('');

    useEffect(() => {
        if (!loading && (!user || (profile && profile.role !== 'student_ambassador'))) {
             // If not student ambassador, maybe they are logged in as something else or not at all.
             // For now, strict check.
             if(profile?.role !== 'student_ambassador') {
                navigate('/login');
             }
        }
    }, [user, profile, loading, navigate]);

    useEffect(() => {
        if(profile && profile.full_name) {
            setAmbassadorName(profile.full_name);
        }
    }, [profile]);


    const handleLogout = async () => {
        await signOut();
        navigate('/login');
    };

    const handleLearn = () => {
        navigate('/lern_with_abecsa');
    };

    if (loading || !profile) return <div style={{ color: '#fff', padding: '2rem' }}>Loading...</div>;

    return (
        <div style={{
            minHeight: '100vh',
            background: '#050505',
            color: '#fff',
            paddingTop: '100px',
            paddingLeft: window.innerWidth < 768 ? '1rem' : '5%',
            paddingRight: window.innerWidth < 768 ? '1rem' : '5%',
            paddingBottom: '2rem',
            fontFamily: "'Exo 2', sans-serif"
        }}>

            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '3rem',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                paddingBottom: '1rem'
            }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', margin: 0, color: '#00d2ff' }}>Student Ambassador Dashboard</h1>
                    <span style={{ fontSize: '0.9rem', color: '#888' }}>
                        Welcome back, {ambassadorName}
                    </span>
                </div>
                <button
                    onClick={handleLogout}
                    style={{
                        background: 'transparent',
                        border: '1px solid #ff0055',
                        color: '#ff0055',
                        padding: '0.5rem 1rem',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => { e.target.style.background = '#ff0055'; e.target.style.color = '#fff'; }}
                    onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#ff0055'; }}
                >
                    <FaSignOutAlt /> Logout
                </button>
            </div>

            {/* Actions Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                
                {/* Learn Card */}
                <div 
                    onClick={handleLearn}
                    style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '15px',
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, border-color 0.2s',
                        textAlign: 'center'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = '#00ff88'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}
                >
                    <div style={{ background: 'rgba(0, 255, 136, 0.1)', padding: '1.5rem', borderRadius: '50%' }}>
                        <FaGraduationCap size={40} color="#00ff88" />
                    </div>
                    <div>
                        <h3 style={{ margin: '0 0 0.5rem 0', color: '#fff' }}>Abecsa Learn</h3>
                        <p style={{ margin: 0, color: '#aaa', fontSize: '0.9rem' }}>Access premium courses and learning materials.</p>
                    </div>
                </div>

                {/* Internship Card - Placeholder Action */}
                <div 
                    style={{
                         background: 'rgba(255, 255, 255, 0.05)',
                         border: '1px solid rgba(255, 255, 255, 0.1)',
                         borderRadius: '15px',
                         padding: '2rem',
                         display: 'flex',
                         flexDirection: 'column',
                         alignItems: 'center',
                         justifyContent: 'center',
                         gap: '1rem',
                         cursor: 'pointer',
                         transition: 'transform 0.2s, border-color 0.2s',
                         textAlign: 'center'
                    }}
                     onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = '#bc13fe'; }}
                     onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}
                     onClick={() => alert("Apply for Internship feature coming soon!")}
                >
                    <div style={{ background: 'rgba(188, 19, 254, 0.1)', padding: '1.5rem', borderRadius: '50%' }}>
                        <FaUserTie size={40} color="#bc13fe" />
                    </div>
                     <div>
                        <h3 style={{ margin: '0 0 0.5rem 0', color: '#fff' }}>Apply for Internship</h3>
                        <p style={{ margin: 0, color: '#aaa', fontSize: '0.9rem' }}>Join our team and gain real-world experience.</p>
                    </div>
                </div>

                {/* Job Card - Placeholder Action */}
                <div 
                     style={{
                         background: 'rgba(255, 255, 255, 0.05)',
                         border: '1px solid rgba(255, 255, 255, 0.1)',
                         borderRadius: '15px',
                         padding: '2rem',
                         display: 'flex',
                         flexDirection: 'column',
                         alignItems: 'center',
                         justifyContent: 'center',
                         gap: '1rem',
                         cursor: 'pointer',
                         transition: 'transform 0.2s, border-color 0.2s',
                         textAlign: 'center'
                     }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = '#00d2ff'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}
                      onClick={() => alert("Apply for Job feature coming soon!")}
                >
                    <div style={{ background: 'rgba(0, 210, 255, 0.1)', padding: '1.5rem', borderRadius: '50%' }}>
                        <FaBriefcase size={40} color="#00d2ff" />
                    </div>
                     <div>
                        <h3 style={{ margin: '0 0 0.5rem 0', color: '#fff' }}>Apply for Job</h3>
                        <p style={{ margin: 0, color: '#aaa', fontSize: '0.9rem' }}>Explore career opportunities at Abecsa.</p>
                    </div>
                </div>

                {/* Certificate Card - Placeholder Action */}
                <div 
                     style={{
                         background: 'rgba(255, 255, 255, 0.05)',
                         border: '1px solid rgba(255, 255, 255, 0.1)',
                         borderRadius: '15px',
                         padding: '2rem',
                         display: 'flex',
                         flexDirection: 'column',
                         alignItems: 'center',
                         justifyContent: 'center',
                         gap: '1rem',
                         cursor: 'pointer',
                         transition: 'transform 0.2s, border-color 0.2s',
                         textAlign: 'center'
                     }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = '#ffd700'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}
                      onClick={() => alert("Get Certificate feature coming soon!")}
                >
                    <div style={{ background: 'rgba(255, 215, 0, 0.1)', padding: '1.5rem', borderRadius: '50%' }}>
                        <FaCertificate size={40} color="#ffd700" />
                    </div>
                     <div>
                        <h3 style={{ margin: '0 0 0.5rem 0', color: '#fff' }}>Get Certificate</h3>
                        <p style={{ margin: 0, color: '#aaa', fontSize: '0.9rem' }}>Claim your completion certificates.</p>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default StudentAmbassadorDashboard;
