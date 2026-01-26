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

    const isStartedRef = useRef(false);

    useEffect(() => {
        isStartedRef.current = started;
        
        // Dynamic Listener Management
        if (started) {
            const handleViolation = () => {
                if (!isStartedRef.current) return;
                triggerViolation();
            };

            const handleFSChange = () => {
                if (!isStartedRef.current) return;
                const isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
                if (!isFullscreen) {
                    triggerViolation("Security Violation: Exited Fullscreen Mode");
                }
            };

            // Visibility/Tab/App Switch (pagehide is critical for mobile)
            ['visibilitychange', 'webkitvisibilitychange', 'msvisibilitychange', 'pagehide'].forEach(ev => 
                document.addEventListener(ev, handleViolation)
            );
            
            // Fullscreen Exit
            ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(ev => 
                document.addEventListener(ev, handleFSChange)
            );

            // Window Blur (Focus lost / Notification shade)
            window.addEventListener('blur', handleViolation);
            
            // Context Menu
            document.oncontextmenu = (e) => { e.preventDefault(); return false; };

            return () => {
                ['visibilitychange', 'webkitvisibilitychange', 'msvisibilitychange', 'pagehide'].forEach(ev => 
                    document.removeEventListener(ev, handleViolation)
                );
                ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(ev => 
                    document.removeEventListener(ev, handleFSChange)
                );
                window.removeEventListener('blur', handleViolation);
                document.oncontextmenu = null;
            };
        }
    }, [started]);

    const triggerViolation = async (customReason = null) => {
        if (!isStartedRef.current) return;
        
        // Immediate UI Block
        isStartedRef.current = false;
        setStarted(false);

        // Determine Reason
        const isHidden = document.hidden || document.webkitHidden || document.msHidden || document.visibilityState === 'hidden';
        let reason = customReason || "Security Violation: Unauthorized Action";
        if (isHidden) reason = "Security Violation: App Hidden or Switched";
        else if (window.event?.type === 'pagehide') reason = "Security Violation: Navigated Away/App Switched";
        else if (window.event?.type === 'blur') reason = "Security Violation: Focus Lost (Potential App Switch)";

        // IF ADMIN: Just reset and warn, don't lock or logout
        if (profile?.role !== 'student') {
            alert("ADMIN BYPASS: Violation detected but account remains active. Please use Student role to test full lockout.");
            if (document.fullscreenElement || document.webkitFullscreenElement) {
                if (document.exitFullscreen) document.exitFullscreen();
                else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
            }
            return;
        }

        setError(reason);

        try {
            // Backend updates (STUDENTS ONLY)
            await Promise.all([
                supabase.from('exam_attempts').update({
                    status: 'flagged',
                    violation_reason: reason
                }).eq('user_id', user.id).eq('exam_id', id),
                
                supabase.from('profiles').update({ is_locked: true }).eq('id', user.id)
            ]);

            // Exit fullscreen if still in it
            if (document.fullscreenElement || document.webkitFullscreenElement) {
                if (document.exitFullscreen) document.exitFullscreen();
                else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
            }

            // Force Logout
            setTimeout(async () => {
                await signOut();
                window.location.href = '/locked';
            }, 1500);

        } catch (err) {
            console.error("Violation record error:", err);
            await signOut();
            window.location.href = '/locked';
        }
    };

    const handleStart = async () => {
        try {
            if (profile?.is_locked) {
                setError("Your account is LOCKED. Contact Admin.");
                return;
            }

            // Request Fullscreen first to satisfy browser interaction rules
            const docEl = portalRef.current;
            if (docEl.requestFullscreen) await docEl.requestFullscreen();
            else if (docEl.webkitRequestFullscreen) await docEl.webkitRequestFullscreen();

            const { error: attemptError } = await supabase.from('exam_attempts').upsert({
                user_id: user.id,
                exam_id: id,
                status: 'started',
                started_at: new Date().toISOString(),
                violation_reason: null,
                completed_at: null
            }, { onConflict: 'user_id,exam_id' });

            if (attemptError) throw attemptError;

            setStarted(true);
            
        } catch (err) {
            console.error(err);
            alert("Fullscreen is REQUIRED. Please allow and click Start again.");
        }
    };

    const handleComplete = async () => {
        isStartedRef.current = false;
        setStarted(false);

        await supabase.from('exam_attempts').update({
            status: 'completed',
            completed_at: new Date().toISOString()
        }).eq('user_id', user.id).eq('exam_id', id);
        
        // Exit Fullscreen
        if (document.fullscreenElement || document.webkitFullscreenElement) {
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        }

        alert("Exam Completed Successfully!");
        navigate('/');
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
        <div ref={portalRef} className="min-h-screen bg-white flex flex-col relative overflow-hidden transition-colors duration-300">
            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
            
            {!started ? (
                <div className="flex-1 flex items-center justify-center p-4 z-10">
                    <div className="bg-white border border-gray-200 p-8 rounded-[40px] max-w-2xl w-full shadow-2xl">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-4 bg-blue-50 rounded-2xl">
                                <FaLock className="text-blue-600 text-3xl" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-slate-800">{exam.name}</h1>
                                <p className="text-slate-500">Secure Examination Environment</p>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                                <FaClock className="text-blue-600" />
                                <div>
                                    <div className="text-xs text-gray-400 uppercase font-bold tracking-wider">Duration</div>
                                    <div className="text-slate-800 font-bold">{exam.duration_minutes} Minutes</div>
                                </div>
                            </div>
                            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl">
                                <h3 className="text-red-600 font-bold text-sm mb-2 flex items-center gap-2">
                                    <FaExclamationTriangle /> IMPORTANT ANTI-CHEAT RULES:
                                </h3>
                                <ul className="text-xs text-red-700/80 space-y-1 list-disc ml-4 font-medium">
                                    <li>Fullscreen mode is MANDATORY.</li>
                                    <li>Do NOT switch tabs or minimize the browser.</li>
                                    <li>Right-click and Copy-Paste are disabled.</li>
                                    <li>Any violation will result in IMMEDIATE termination and account LOCK.</li>
                                </ul>
                            </div>
                        </div>

                        <button 
                            onClick={handleStart}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-600/20"
                        >
                            <FaExpand /> Start Exam & Enter Locked Mode
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col z-10">
                    {/* Secure Header - Light Version */}
                    <div className="bg-white/90 backdrop-blur-md border-b border-gray-100 p-4 flex justify-between items-center shadow-sm">
                        <div className="flex items-center gap-3">
                            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                            <span className="text-sm font-bold uppercase tracking-widest text-slate-500">SECURE SESSION LIVE</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl text-xl font-mono font-bold text-blue-600 border border-gray-200">
                                <FaClock className="text-sm" />
                                {formatTime(timeLeft)}
                            </div>
                            <button 
                                onClick={handleComplete}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-bold text-sm transition-colors shadow-md"
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
