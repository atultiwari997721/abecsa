import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import { FaLock, FaExpand, FaExclamationTriangle, FaClock } from 'react-icons/fa';
import Loader from '../components/Loader';

const ExamPortal = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, profile, signOut } = useAuth();
    
    const [exam, setExam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [started, setStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [error, setError] = useState(null);
    const portalRef = useRef(null);

    useEffect(() => {
        fetchExam();
    }, [id]);

    useEffect(() => {
        if (started && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (started && timeLeft === 0) {
            handleComplete();
        }
    }, [started, timeLeft]);

    const fetchExam = async () => {
        const { data, error } = await supabase.from('exams').select('*').eq('id', id).single();
        if (error || !data) {
            setError("Exam not found or inactive.");
            setLoading(false);
            return;
        }

        // 1. Role Check: Only Students (and Admins for preview) can enter
        if (profile?.role !== 'student' && profile?.role !== 'admin') {
            setError("Access Restricted. Only registered Students can take this exam.");
            setLoading(false);
            return;
        }

        // 2. Check if locked
        if (profile?.is_locked) {
            setError("Your account is LOCKED due to a security violation. Please contact ABECSA Admin.");
            setLoading(false);
            return;
        }

        // 3. Timer Logic: Only allow if start time has passed
        const startTime = new Date(data.start_time);
        const now = new Date();
        if (now < startTime) {
            setError(`Exam has not started yet. Please wait until ${startTime.toLocaleString()}`);
            setLoading(false);
            return;
        }

        setExam(data);
        setTimeLeft(data.duration_minutes * 60);
        setLoading(false);
    };

    const handleStart = async () => {
        try {
            // Request Fullscreen
            if (portalRef.current.requestFullscreen) {
                await portalRef.current.requestFullscreen();
            } else if (portalRef.current.webkitRequestFullscreen) {
                await portalRef.current.webkitRequestFullscreen();
            }

            // Create Attempt in DB
            const { error: attemptError } = await supabase.from('exam_attempts').insert([{
                user_id: user.id,
                exam_id: id,
                status: 'started'
            }]);

            if (attemptError && !attemptError.message.includes('unique constraint')) {
                throw attemptError;
            }

            setStarted(true);

            // Anti-Cheat Listeners (All variants)
            ['visibilitychange', 'webkitvisibilitychange', 'msvisibilitychange'].forEach(ev => 
                document.addEventListener(ev, handleSecurityViolation)
            );
            ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(ev => 
                document.addEventListener(ev, handleFullscreenChange)
            );

            window.addEventListener('blur', handleSecurityViolation);
            
            // Disable right click
            document.oncontextmenu = (e) => { e.preventDefault(); return false; };
            
        } catch (err) {
            console.error(err);
            alert("Fullscreen is REQUIRED to take the exam. Please allow and try again.");
        }
    };

    const handleSecurityViolation = async () => {
        if (!started) return;
        
        // Comprehensive Check for violation
        const isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
        const isHidden = document.hidden || document.webkitHidden || document.msHidden;
        
        if (isFullscreen && !isHidden) return; // False alarm or just start

        let reason = "Security Violation Detected";
        if (isHidden) reason = "Tab Switch Detected";
        else if (!isFullscreen) reason = "Exited Fullscreen";

        // 1. Flag attempt
        await supabase.from('exam_attempts').update({
            status: 'flagged',
            violation_reason: reason
        }).eq('user_id', user.id).eq('exam_id', id);

        // 2. Lock Profile
        await supabase.from('profiles').update({ is_locked: true }).eq('id', user.id);

        // 3. IMMEDIATE LOGOUT
        alert(`SECURITY VIOLATION: ${reason}. Your exam has been terminated and account LOCKED. Logging out...`);
        
        cleanupSecurity();
        await signOut();
        window.location.href = '/login';
    };

    const handleFullscreenChange = () => {
        const isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
        if (!isFullscreen && started) {
            handleSecurityViolation();
        }
    };

    const handleComplete = async () => {
        await supabase.from('exam_attempts').update({
            status: 'completed',
            completed_at: new Date().toISOString()
        }).eq('user_id', user.id).eq('exam_id', id);
        
        cleanupSecurity();
        alert("Exam Completed Successfully!");
        navigate('/');
    };

    const cleanupSecurity = () => {
        // Cleanup all vendor variations
        ['visibilitychange', 'webkitvisibilitychange', 'msvisibilitychange'].forEach(ev => 
            document.removeEventListener(ev, handleSecurityViolation)
        );
        ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(ev => 
            document.removeEventListener(ev, handleFullscreenChange)
        );
        
        window.removeEventListener('blur', handleSecurityViolation);
        document.oncontextmenu = null;
        
        if (document.fullscreenElement || document.webkitFullscreenElement) {
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    if (loading) return <Loader />;

    if (error) {
        return (
            <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-4">
                <div className="bg-gray-900 border border-red-500/50 p-8 rounded-3xl max-w-md text-center">
                    <FaExclamationTriangle className="text-red-500 text-5xl mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
                    <p className="text-gray-400 mb-6">{error}</p>
                    <button onClick={() => navigate('/')} className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl transition-colors">
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div ref={portalRef} className="min-h-screen bg-[#0B1120] flex flex-col relative overflow-hidden">
            {/* Dark Matrix Background Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
            
            {!started ? (
                <div className="flex-1 flex items-center justify-center p-4 z-10">
                    <div className="bg-gray-900 border border-blue-500/30 p-8 rounded-[40px] max-w-2xl w-full shadow-2xl backdrop-blur-xl">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-4 bg-blue-500/10 rounded-2xl">
                                <FaLock className="text-blue-500 text-3xl" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">{exam.name}</h1>
                                <p className="text-gray-400">Secure Examination Environment</p>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-2xl border border-gray-700">
                                <FaClock className="text-cyan-400" />
                                <div>
                                    <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Duration</div>
                                    <div className="text-white">{exam.duration_minutes} Minutes</div>
                                </div>
                            </div>
                            <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-2xl">
                                <h3 className="text-red-400 font-bold text-sm mb-2 flex items-center gap-2">
                                    <FaExclamationTriangle /> IMPORTANT ANTI-CHEAT RULES:
                                </h3>
                                <ul className="text-xs text-gray-400 space-y-1 list-disc ml-4">
                                    <li>Fullscreen mode is MANDATORY.</li>
                                    <li>Do NOT switch tabs or minimize the browser.</li>
                                    <li>Right-click and Copy-Paste are disabled.</li>
                                    <li>Any violation will result in IMMEDIATE termination and LOCK of your account.</li>
                                </ul>
                            </div>
                        </div>

                        <button 
                            onClick={handleStart}
                            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-600/20"
                        >
                            <FaExpand /> Start Exam & Enter Locked Mode
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col z-10">
                    {/* Secure Header */}
                    <div className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                            <span className="text-sm font-bold uppercase tracking-widest text-gray-300">SECURE SESSION LIVE</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-xl text-xl font-mono font-bold text-cyan-400 border border-gray-700">
                                <FaClock className="text-sm" />
                                {formatTime(timeLeft)}
                            </div>
                            <button 
                                onClick={handleComplete}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-bold text-sm transition-colors"
                            >
                                Finish Exam
                            </button>
                        </div>
                    </div>

                    {/* Google Form Iframe */}
                    <div className="flex-1 bg-white">
                        <iframe 
                            src={exam.google_form_url}
                            className="w-full h-full border-none"
                            title="Examination Content"
                            sandbox="allow-scripts allow-same-origin allow-forms"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExamPortal;
