import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaUsers, FaGlobe, FaEnvelope, FaTrash, FaPlus, FaLink, FaExchangeAlt, FaTimes, FaUserPlus, FaArrowLeft, FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import '../styles/global.css';
import { supabase } from '../supabaseClient';
import { createClient } from '@supabase/supabase-js'; // For non-persisting client
import { useAuth } from '../contexts/AuthContext';
import MarketingManagerDashboard from './MarketingManagerDashboard';

// --- Helper: Password Toggle ---
const PasswordDisplay = ({ password }) => {
    const [show, setShow] = useState(false);
    if (!password) return null;
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#aaa', marginTop: '5px' }}>
            <span style={{ fontFamily: 'monospace', background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>
                {show ? password : '••••••••'}
            </span>
            <button 
                onClick={() => setShow(!show)}
                style={{ background: 'none', border: 'none', color: '#D4AF37', cursor: 'pointer', padding: 0, display: 'flex' }}
                title={show ? "Hide Password" : "Show Password"}
            >
                {show ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
            </button>
        </div>
    );
};

// --- Create User Modal ---
const CreateUserModal = ({ onClose }) => {
    const [formData, setFormData] = useState({ fullName: '', email: '', password: '', role: 'customer' });
    const [loading, setLoading] = useState(false);

    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            // 1. Create temporary client to avoid logging out the Admin
            const tempSupabase = createClient(
                import.meta.env.VITE_SUPABASE_URL,
                import.meta.env.VITE_SUPABASE_ANON_KEY,
                { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } }
            );

            // 2. Sign Up User
            const { data: { user }, error: authError } = await tempSupabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            });

            if (authError) throw authError;

            if (user) {
                // 3. Create Profile using ADMIN'S client
                // Now using the main 'supabase' client which is logged in as Admin.
                // We enabled RLS policy "Admins can insert profiles" so this will work.
                
                let payload = {
                    id: user.id,
                    full_name: formData.fullName,
                    role: formData.role,
                    email: formData.email,
                    visible_password: formData.password
                };

                let { error: profileError } = await supabase.from('profiles').insert([payload]);

                // Fallback: If DB column is missing, try again without visible_password
                if (profileError && profileError.message && profileError.message.includes('visible_password')) {
                    console.warn("visible_password column missing. Retrying without it.");
                    delete payload.visible_password;
                    const { error: retryError } = await supabase.from('profiles').insert([payload]);
                    
                    if (!retryError) {
                        alert(`User created! Note: Password could NOT be saved for display because the database needs an update. Run 'fix_password_column.sql'.`);
                        onClose();
                        return;
                    }
                    profileError = retryError; // If retry failed, show that error
                }

                if (profileError) {
                    console.error("Admin client profile creation failed", profileError);
                    alert("User auth created, but profile creation failed. " + profileError.message);
                    throw profileError; 
                }
                
                alert(`User ${formData.fullName} (${formData.role}) created successfully!`);
                onClose();
            }
        } catch (error) {
            alert("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#111', padding: '2.5rem', borderRadius: '20px', width: '90%', maxWidth: '500px', border: '1px solid #D4AF37' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid #333', paddingBottom: '1rem' }}>
                    <h3 style={{ margin: 0, color: '#D4AF37', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaUserPlus /> Create New User</h3>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}><FaTimes /></button>
                </div>
                <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input type="text" placeholder="Full Name" required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="dark-input" />
                    <input type="email" placeholder="Email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="dark-input" />
                    <input type="password" placeholder="Password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="dark-input" />
                    <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="dark-input">
                        <option value="customer">Customer</option>
                        <option value="marketing_manager">Marketing Manager</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit" disabled={loading} style={{ background: '#D4AF37', border: 'none', padding: '1rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem' }}>
                        {loading ? 'Creating...' : 'Create Account'}
                    </button>
                </form>
            </div>
        </div>
    );
};

// --- Global Master List (Admins, Managers, Customers) ---
const GlobalCustomersModal = ({ profiles, websites, onClose, onRefresh }) => {
    const [filterRole, setFilterRole] = useState('ALL');

    const handleDeleteUser = async (userId, userRole) => {
        if (window.confirm(`Are you sure you want to delete this ${userRole}? This action cannot be undone.`)) {
            // Delete from profiles (which effectively blocks login)
            const { error } = await supabase.from('profiles').delete().eq('id', userId);
            if (error) alert("Error deleting user: " + error.message);
            else {
                alert("User deleted successfully.");
                onRefresh();
            }
        }
    };

    const filteredProfiles = profiles.filter(p => filterRole === 'ALL' ? true : p.role === filterRole);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.95)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)' }}>
            <div style={{ background: '#0a0a0a', width: '95%', height: '95%', borderRadius: '25px', border: '1px solid #D4AF37', display: 'flex', flexDirection: 'column', padding: '2.5rem', boxShadow: '0 0 50px rgba(212, 175, 55, 0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', paddingBottom: '1rem' }}>
                    <h2 style={{ margin: 0, color: '#D4AF37', display: 'flex', alignItems: 'center', gap: '1rem', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '1.8rem' }}><FaUsers /> Master User List</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer', opacity: 0.7 }}><FaTimes /></button>
                </div>

                <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
                    {['ALL', 'admin', 'marketing_manager', 'customer'].map(role => (
                        <button 
                            key={role}
                            onClick={() => setFilterRole(role)}
                            style={{
                                background: filterRole === role ? '#D4AF37' : 'rgba(255,255,255,0.1)',
                                color: filterRole === role ? '#000' : '#fff',
                                border: 'none',
                                padding: '0.5rem 1.5rem',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                textTransform: 'capitalize'
                            }}
                        >
                            {role.replace('_', ' ')}
                        </button>
                    ))}
                </div>

                <div style={{ flex: 1, overflowY: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: '#ddd', fontSize: '0.95rem' }}>
                        <thead>
                            <tr style={{ background: 'linear-gradient(90deg, #111, #222)', textAlign: 'left', borderBottom: '2px solid #D4AF37' }}>
                                <th style={{ padding: '1.2rem', color: '#888', fontSize: '0.8rem' }}>Full Name</th>
                                <th style={{ padding: '1.2rem', color: '#888', fontSize: '0.8rem' }}>Role</th>
                                <th style={{ padding: '1.2rem', color: '#888', fontSize: '0.8rem' }}>Email</th>
                                <th style={{ padding: '1.2rem', color: '#888', fontSize: '0.8rem' }}>Password</th>
                                <th style={{ padding: '1.2rem', color: '#888', fontSize: '0.8rem' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProfiles.map((user) => (
                                <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '1.2rem', fontWeight: 'bold' }}>{user.full_name}</td>
                                    <td style={{ padding: '1.2rem' }}>
                                        <span style={{
                                            padding: '0.2rem 0.8rem', borderRadius: '10px', fontSize: '0.8rem',
                                            background: user.role === 'admin' ? '#D4AF37' : user.role === 'marketing_manager' ? '#8a2be2' : '#00ff88',
                                            color: user.role === 'admin' ? '#000' : '#fff'
                                        }}>
                                            {user.role.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1.2rem', color: '#aaa' }}>{user.email}</td>
                                    <td style={{ padding: '1.2rem' }}>
                                        {user.visible_password ? (
                                             <PasswordDisplay password={user.visible_password} />
                                        ) : <span style={{color:'#666', fontStyle:'italic'}}>Hidden/Old</span>}
                                    </td>
                                    <td style={{ padding: '1.2rem' }}>
                                        <button 
                                            onClick={() => handleDeleteUser(user.id, user.role)}
                                            style={{ color: '#ff4444', background: 'rgba(255, 68, 68, 0.1)', border:'1px solid #ff4444', padding: '0.5rem 1rem', borderRadius: '8px', cursor:'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// --- Managers List ---
const ManagersList = ({ managers, customers, websites, onViewDashboard }) => {
    
    // Group websites by manager
    const getManagerSales = (managerId) => websites.filter(w => w.manager_id === managerId);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {managers.map(mgr => {
                const sales = getManagerSales(mgr.id);
                return (
                    <div key={mgr.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h3 style={{ margin: 0, color: '#fff' }}>{mgr.full_name}</h3>
                                <p style={{ color: '#888', fontSize: '0.9rem', margin: '5px 0' }}>{mgr.email}</p>
                                {mgr.visible_password && <PasswordDisplay password={mgr.visible_password} />}
                            </div>
                            <span style={{ background: '#8a2be2', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '10px', fontSize: '0.8rem' }}>
                                {sales.length} Sales
                            </span>
                         </div>
                         <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.5rem', marginBottom: '1rem' }}>
                             {sales.length > 0 ? (
                                 <ul style={{ paddingLeft: '1.2rem', color: '#aaa', fontSize: '0.9rem' }}>
                                     {sales.map(s => <li key={s.id}>{s.name}</li>)}
                                 </ul>
                             ) : <p style={{ color: '#666', fontSize: '0.9rem', fontStyle: 'italic' }}>No active sales</p>}
                         </div>
                         <button onClick={() => onViewDashboard(mgr.id)} style={{ width: '100%', padding: '0.8rem', background: 'rgba(138, 43, 226, 0.1)', border: '1px solid #8a2be2', color: '#8a2be2', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                             <FaGlobe /> View Dashboard
                         </button>
                    </div>
                );
            })}
        </div>
    );
};


const AdminDashboard = () => {
    const navigate = useNavigate();
    const { user, profile, signOut } = useAuth();
    
    // Security: Redirect if not admin
    useEffect(() => {
        if (profile && profile.role !== 'admin') {
            alert("Access Denied: Admins Only");
            navigate('/login');
        }
    }, [profile, navigate]);
    
    // New States
    const [viewingManagerId, setViewingManagerId] = useState(null);
    const [showCreateUser, setShowCreateUser] = useState(false);

    const [profiles, setProfiles] = useState([]);
    const [websites, setWebsites] = useState([]);
    const [messages, setMessages] = useState([]);
    const [conversations, setConversations] = useState({});
    
    const [selectedUserForChat, setSelectedUserForChat] = useState(null);
    const [replyMessage, setReplyMessage] = useState('');
    const [showGlobalList, setShowGlobalList] = useState(false);
    
    const chatContainerRef = useRef(null);

    const fetchData = async () => {
        // Fetch Profiles
        const { data: profs } = await supabase.from('profiles').select('*');
        if (profs) setProfiles(profs);

        // Fetch Websites
        const { data: sites } = await supabase.from('websites').select('*');
        if (sites) setWebsites(sites);

        // Fetch Messages
        const { data: msgs } = await supabase.from('messages').select('*').order('created_at', { ascending: true });
        if (msgs) {
            setMessages(msgs);
            processConversations(msgs, profs || []);
        }
    };

    const processConversations = (msgs, profs) => {
        const convs = {};
        msgs.forEach(msg => {
            const convId = msg.conversation_id || msg.sender_id;
            if (!convId) return;
            const customer = profs.find(p => p.id === convId);
            
            if (!convs[convId]) {
                convs[convId] = {
                    id: convId,
                    name: customer ? (customer.full_name || customer.email) : 'Unknown User',
                    lastMessage: msg.content,
                    timestamp: msg.created_at
                };
            } else {
                if (new Date(msg.created_at) > new Date(convs[convId].timestamp)) {
                    convs[convId].lastMessage = msg.content;
                    convs[convId].timestamp = msg.created_at;
                }
            }
        });
        setConversations(convs);
    };

    useEffect(() => {
        fetchData();
        const msgSub = supabase.channel('admin-messages')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
                setMessages(prev => [...prev, payload.new]);
            })
            .subscribe();
        return () => { supabase.removeChannel(msgSub); };
    }, []);

    useEffect(() => {
        processConversations(messages, profiles);
    }, [messages, profiles]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, selectedUserForChat]);

    const handleSendReply = async (e) => {
        e.preventDefault();
        if (!replyMessage.trim() || !selectedUserForChat) return;
        const { error } = await supabase.from('messages').insert([{
            sender_id: user.id,
            conversation_id: selectedUserForChat,
            content: replyMessage
        }]);
        if (error) alert("Failed to send: " + error.message);
        else setReplyMessage('');
    };

    // If Viewing a Manager, render that dashboard
    if (viewingManagerId) {
        return (
            <div style={{ position: 'relative' }}>
                <button 
                    onClick={() => setViewingManagerId(null)}
                    style={{ position: 'fixed', top: '20px', left: '20px', zIndex: 9999, background: '#D4AF37', border: 'none', padding: '10px 20px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                    <FaArrowLeft /> Exit Manager View
                </button>
                <MarketingManagerDashboard managerId={viewingManagerId} />
            </div>
        );
    }

    const managers = profiles.filter(p => p.role === 'marketing_manager');
    const customers = profiles.filter(p => p.role === 'customer');
    const activeSites = websites.filter(w => w.status === 'Live').length;

    return (
        <div className="admin-container">
            
            {/* Header */}
            <div className="admin-header">
                <h1 style={{ fontSize: '1.8rem', color: '#D4AF37', margin: 0 }}>SUPER ADMIN VIEW</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => setShowCreateUser(true)} style={{ background: '#D4AF37', border: 'none', color: '#000', padding: '0.5rem 1rem', borderRadius: '5px', cursor: 'pointer', display: 'flex', gap: '0.5rem', alignItems: 'center', fontWeight: 'bold' }}>
                        <FaUserPlus /> Create User
                    </button>
                    <button onClick={() => { signOut(); navigate('/login'); }} style={{ background: 'transparent', border: '1px solid #ff0055', color: '#ff0055', padding: '0.5rem 1rem', borderRadius: '5px', cursor: 'pointer', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="admin-stats-row">
                <div style={{ flex: 1, minWidth: '200px', background: '#111', padding: '1.5rem', borderRadius: '15px', border: '1px solid #333' }}>
                    <h3 style={{ margin: 0, fontSize: '2rem', color: '#D4AF37' }}>{profiles.length}</h3>
                    <p style={{ color: '#888', margin: 0 }}>Total Users</p>
                </div>
                <div style={{ flex: 1, minWidth: '200px', background: '#111', padding: '1.5rem', borderRadius: '15px', border: '1px solid #333' }}>
                    <h3 style={{ margin: 0, fontSize: '2rem', color: '#2b7de9' }}>{profiles.filter(p => p.role === 'admin').length}</h3>
                    <p style={{ color: '#888', margin: 0 }}>Admins</p>
                </div>
                <div style={{ flex: 1, minWidth: '200px', background: '#111', padding: '1.5rem', borderRadius: '15px', border: '1px solid #333' }}>
                    <h3 style={{ margin: 0, fontSize: '2rem', color: '#00ff88' }}>{activeSites}</h3>
                    <p style={{ color: '#888', margin: 0 }}>Live Websites</p>
                </div>
                 <div style={{ flex: 1, minWidth: '200px', background: '#111', padding: '1.5rem', borderRadius: '15px', border: '1px solid #333', cursor: 'pointer', transition: 'border-color 0.2s' }} onClick={() => setShowGlobalList(true)} onMouseEnter={e => e.currentTarget.style.borderColor = '#D4AF37'} onMouseLeave={e => e.currentTarget.style.borderColor = '#333'}>
                    <h3 style={{ margin: 0, fontSize: '1.5rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}><FaUsers /> Master List</h3>
                    <p style={{ color: '#D4AF37', margin: 0, fontSize: '0.9rem' }}>Manage All Users</p>
                </div>
            </div>

            <div className="admin-main-grid">
                
                {/* Left: Content */}
                <div>
                     <div style={{marginBottom: '2rem'}}>
                        <h2 style={{ color: '#8a2be2', borderLeft: '4px solid #8a2be2', paddingLeft: '1rem' }}>Managers & Sales</h2>
                        <ManagersList managers={managers} customers={customers} websites={websites} onRefresh={fetchData} onViewDashboard={setViewingManagerId} />
                     </div>
                </div>

                {/* Right: Support Chat Master */}
                <div style={{ background: '#111', borderRadius: '15px', border: '1px solid #333', display: 'flex', flexDirection: 'column', height: '600px', overflow: 'hidden' }}>
                    <div style={{ padding: '1rem', borderBottom: '1px solid #333', background: '#1a1a1a' }}>
                        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Support Inbox</h3>
                    </div>
                    
                    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                        <div style={{ width: '120px', borderRight: '1px solid #333', overflowY: 'auto', background: '#151515' }}>
                            {Object.values(conversations).map(conv => (
                                <div 
                                    key={conv.id}
                                    onClick={() => setSelectedUserForChat(conv.id)}
                                    style={{ 
                                        padding: '1rem 0.5rem', 
                                        cursor: 'pointer', 
                                        borderBottom: '1px solid #222',
                                        background: selectedUserForChat === conv.id ? '#2b7de9' : 'transparent',
                                        color: selectedUserForChat === conv.id ? '#fff' : '#aaa',
                                        fontSize: '0.8rem',
                                        textAlign: 'center'
                                    }}
                                >
                                    <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{conv.name}</div>
                                    <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>{new Date(conv.timestamp).toLocaleDateString()}</div>
                                </div>
                            ))}
                        </div>

                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            {selectedUserForChat ? (
                                <>
                                    <div style={{ padding: '0.8rem', background: '#222', fontSize: '0.9rem', color: '#fff' }}>
                                        Chatting with: <strong>{conversations[selectedUserForChat]?.name}</strong>
                                    </div>
                                    <div ref={chatContainerRef} style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {messages.filter(m => (m.conversation_id === selectedUserForChat || m.sender_id === selectedUserForChat) && m.conversation_id).map((msg, i) => {
                                            const isCustomer = msg.sender_id === selectedUserForChat;
                                            return (
                                                <div key={i} style={{ 
                                                    alignSelf: isCustomer ? 'flex-start' : 'flex-end',
                                                    background: isCustomer ? '#333' : '#2b7de9',
                                                    color: '#fff',
                                                    padding: '0.6rem 1rem',
                                                    borderRadius: '10px',
                                                    maxWidth: '80%',
                                                    fontSize: '0.9rem'
                                                }}>
                                                    {msg.content}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <form onSubmit={handleSendReply} style={{ padding: '0.8rem', borderTop: '1px solid #333', display: 'flex', gap: '0.5rem' }}>
                                        <input type="text" placeholder="Reply..." value={replyMessage} onChange={e => setReplyMessage(e.target.value)} style={{ flex: 1, padding: '0.6rem', borderRadius: '5px', border: '1px solid #444', background: '#222', color: '#fff', outline: 'none' }} />
                                        <button type="submit" style={{ background: '#2b7de9', border: 'none', color: '#fff', padding: '0 1rem', borderRadius: '5px', cursor: 'pointer' }}><FaPaperPlane /></button>
                                    </form>
                                </>
                            ) : (
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                                    Select a conversation
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            {showGlobalList && (
                <GlobalCustomersModal 
                    profiles={profiles} 
                    websites={websites} 
                    onClose={() => setShowGlobalList(false)}
                    onRefresh={fetchData}
                />
            )}

            {showCreateUser && (
                <CreateUserModal onClose={() => setShowCreateUser(false)} />
            )}

            {/* CSS Helper for inputs inside Modal */}
            <style>{`
                .admin-container {
                    min-height: 100vh;
                    background: #050505;
                    color: #fff;
                    padding-top: 100px;
                    padding-left: 5%;
                    padding-right: 5%;
                    padding-bottom: 2rem;
                    font-family: 'Exo 2', sans-serif;
                }
                .admin-header {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 3rem;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    padding-bottom: 1rem;
                    flex-wrap: wrap;
                    gap: 1rem;
                }
                .admin-stats-row {
                    display: flex;
                    gap: 2rem;
                    margin-bottom: 3rem;
                    flex-wrap: wrap;
                }
                .admin-main-grid {
                    display: grid;
                    grid-template-columns: minmax(300px, 1fr) 400px;
                    gap: 2rem;
                }

                @media (max-width: 1024px) {
                    .admin-main-grid {
                        grid-template-columns: 1fr;
                    }
                }
                @media (max-width: 768px) {
                    .admin-container {
                        padding-left: 1rem;
                        padding-right: 1rem;
                    }
                    .admin-header {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                }

                .dark-input, .dark-select-small {
                    width: 100%;
                    padding: 0.8rem;
                    background: #111;
                    border: 1px solid #333;
                    border-radius: 8px;
                    color: #fff;
                    outline: none;
                }
                .dark-select-small {
                    width: auto;
                    padding: 0.3rem;
                    font-size: 0.8rem;
                }
                .status-badge {
                    padding: 0.3rem 0.8rem;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: bold;
                }
                .status-badge.live { background: rgba(0, 255, 136, 0.1); color: #00ff88; }
                .status-badge.pending { background: rgba(255, 170, 0, 0.1); color: #ffaa00; }
            `}</style>
        </div>
    );
};

// Simple Icon component missing in imports
const FaPaperPlane = () => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"></path></svg>;


export default AdminDashboard;
