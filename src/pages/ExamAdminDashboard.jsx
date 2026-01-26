import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { FaPlus, FaTrash, FaCheck, FaTimes, FaUsers, FaClipboardList, FaClock, FaLink, FaUserShield, FaArrowLeft, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const ExamAdminDashboard = () => {
    const navigate = useNavigate();
    const [exams, setExams] = useState([]);
    const [attempts, setAttempts] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateExam, setShowCreateExam] = useState(false);
    const [newExam, setNewExam] = useState({ name: '', formUrl: '', startTime: '', duration: 60 });

    useEffect(() => {
        fetchData();
        const subscription = supabase
            .channel('exam_updates')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'exam_attempts' }, () => fetchData())
            .subscribe();

        return () => supabase.removeChannel(subscription);
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const [examsRes, attemptsRes, studentsRes] = await Promise.all([
            supabase.from('exams').select('*').order('created_at', { ascending: false }),
            supabase.from('exam_attempts').select('*, profiles(full_name, email, is_locked)').order('started_at', { ascending: false }),
            supabase.from('profiles').select('*').eq('role', 'student')
        ]);

        if (examsRes.data) setExams(examsRes.data);
        if (attemptsRes.data) setAttempts(attemptsRes.data);
        if (studentsRes.data) setStudents(studentsRes.data);
        setLoading(false);
    };

    const handleCreateExam = async (e) => {
        e.preventDefault();
        const { error } = await supabase.from('exams').insert([{
            name: newExam.name,
            google_form_url: newExam.formUrl,
            start_time: new Date(newExam.startTime).toISOString(),
            duration_minutes: parseInt(newExam.duration)
        }]);

        if (error) alert("Error: " + error.message);
        else {
            setShowCreateExam(false);
            setNewExam({ name: '', formUrl: '', startTime: '', duration: 60 });
            fetchData();
        }
    };

    const handleUnlockUser = async (userId) => {
        const { error } = await supabase.from('profiles').update({ is_locked: false }).eq('id', userId);
        if (error) alert("Error: " + error.message);
        else fetchData();
    };

    const handleDeleteExam = async (id) => {
        if (window.confirm("Are you sure? This will delete all attempt history too.")) {
            // attempts have CASCADE if setup correctly, else need to delete them first
            await supabase.from('exam_attempts').delete().eq('exam_id', id);
            const { error } = await supabase.from('exams').delete().eq('id', id);
            if (error) alert("Error: " + error.message);
            else fetchData();
        }
    };

    return (
        <div className="min-h-screen bg-[#0B1120] dark:bg-[#0B1120] text-white p-4 md:p-8 pt-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <button 
                            onClick={() => navigate('/admin')} 
                            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-2"
                        >
                            <FaArrowLeft /> Back to Main Admin
                        </button>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            ABECSA Exam Center Admin
                        </h1>
                    </div>
                    <button 
                        onClick={() => setShowCreateExam(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20"
                    >
                        <FaPlus /> Create New Exam
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Live Monitoring Dashboard */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Live Monitor Section */}
                        <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-6 backdrop-blur-xl">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                Live Exam Activity & Security Monitor
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-gray-400 text-sm border-b border-gray-800">
                                            <th className="pb-4 font-medium">Student</th>
                                            <th className="pb-4 font-medium">Exam</th>
                                            <th className="pb-4 font-medium">Status</th>
                                            <th className="pb-4 font-medium">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800">
                                        {attempts.map(attempt => (
                                            <tr key={attempt.id} className="group">
                                                <td className="py-4">
                                                    <div className="font-medium">{attempt.profiles?.full_name}</div>
                                                    <div className="text-xs text-gray-500">{attempt.profiles?.email}</div>
                                                </td>
                                                <td className="py-4">
                                                    <div className="text-sm">
                                                        {exams.find(e => e.id === attempt.exam_id)?.name || 'Unknown Exam'}
                                                    </div>
                                                </td>
                                                <td className="py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                        attempt.status === 'flagged' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                                        attempt.status === 'completed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                                                        'bg-blue-500/10 text-blue-500 border border-blue-500/20 animate-pulse'
                                                    }`}>
                                                        {attempt.status.toUpperCase()}
                                                    </span>
                                                    {attempt.violation_reason && (
                                                        <div className="text-[10px] text-red-400 mt-1 max-w-[150px] truncate" title={attempt.violation_reason}>
                                                            {attempt.violation_reason}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="py-4">
                                                    {attempt.profiles?.is_locked && (
                                                        <button 
                                                            onClick={() => handleUnlockUser(attempt.user_id)}
                                                            className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg transition-colors"
                                                        >
                                                            Re-Allow Student
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Recent Exams Section */}
                        <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-6 backdrop-blur-xl">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><FaClipboardList className="text-blue-400"/> Recent Exam Sessions</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {exams.map(exam => (
                                    <div key={exam.id} className="p-4 bg-gray-800/50 rounded-2xl border border-gray-700/50 relative group">
                                        <button 
                                            onClick={() => handleDeleteExam(exam.id)}
                                            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <FaTrash />
                                        </button>
                                        <div className="font-bold text-lg mb-2">{exam.name}</div>
                                        <div className="space-y-2 text-sm text-gray-400">
                                            <div className="flex items-center gap-2"><FaClock className="text-blue-400/50"/> {new Date(exam.start_time).toLocaleString()}</div>
                                            <div className="flex items-center gap-2"><FaClock className="text-cyan-400/50"/> {exam.duration_minutes} Minutes</div>
                                            <div className="flex items-center gap-2 truncate text-blue-400/80"><FaLink className="shrink-0"/> {exam.google_form_url}</div>
                                        </div>
                                        <button 
                                            onClick={() => {
                                                const link = `${window.location.origin}/exam/${exam.id}`;
                                                navigator.clipboard.writeText(link);
                                                alert("Exam link copied to clipboard!");
                                            }}
                                            className="mt-4 w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
                                        >
                                            <FaLink /> Copy Exam Portal Link
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Student Management */}
                    <div className="space-y-8">
                        <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-6 backdrop-blur-xl">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><FaUsers className="text-cyan-400"/> Student Roster</h2>
                            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                                {students.map(student => (
                                    <div key={student.id} className={`p-4 border rounded-2xl flex items-center justify-between transition-all ${
                                        student.is_locked 
                                        ? 'bg-red-500/5 border-red-500/20' 
                                        : 'bg-gray-800/30 border-gray-700/50'
                                    }`}>
                                        <div className="min-w-0">
                                            <div className="font-medium text-sm truncate">{student.full_name}</div>
                                            <div className="text-[10px] text-gray-500 truncate">{student.email}</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {student.is_locked ? (
                                                <>
                                                    <span className="p-2 text-red-500" title="Locked - Violation Detected">
                                                        <FaLock size={14} />
                                                    </span>
                                                    <button 
                                                        onClick={() => handleUnlockUser(student.id)}
                                                        className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-[10px] font-bold transition-colors"
                                                    >
                                                        Allow
                                                    </button>
                                                </>
                                            ) : (
                                                <span className="p-2 text-green-500">
                                                    <FaCheck size={14} />
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Exam Modal */}
            {showCreateExam && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="bg-[#0B1120] border border-gray-800 w-full max-w-xl rounded-[40px] p-8 relative shadow-2xl overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-bold">Configure New Exam</h3>
                            <button onClick={() => setShowCreateExam(false)} className="text-gray-400 hover:text-white transition-colors">
                                <FaTimes size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleCreateExam} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400 ml-1">Exam Title</label>
                                <input 
                                    type="text" required 
                                    className="w-full bg-gray-900 border border-gray-800 rounded-2xl p-4 text-white focus:border-blue-500 outline-none transition-all"
                                    placeholder="e.g., Full Stack Development Entry Test"
                                    value={newExam.name} 
                                    onChange={e => setNewExam({...newExam, name: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400 ml-1">Google Form URL</label>
                                <input 
                                    type="url" required 
                                    className="w-full bg-gray-900 border border-gray-800 rounded-2xl p-4 text-white focus:border-blue-500 outline-none transition-all"
                                    placeholder="https://docs.google.com/forms/..."
                                    value={newExam.formUrl} 
                                    onChange={e => setNewExam({...newExam, formUrl: e.target.value})}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400 ml-1">Start Date & Time</label>
                                    <input 
                                        type="datetime-local" required 
                                        className="w-full bg-gray-900 border border-gray-800 rounded-2xl p-4 text-white focus:border-blue-500 outline-none transition-all"
                                        value={newExam.startTime} 
                                        onChange={e => setNewExam({...newExam, startTime: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400 ml-1">Duration (Min)</label>
                                    <input 
                                        type="number" required 
                                        className="w-full bg-gray-900 border border-gray-800 rounded-2xl p-4 text-white focus:border-blue-500 outline-none transition-all"
                                        value={newExam.duration} 
                                        onChange={e => setNewExam({...newExam, duration: e.target.value})}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/20">
                                Launch Exam Portal Session
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExamAdminDashboard;
