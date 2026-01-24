import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaUsers, FaGlobe, FaEnvelope, FaTrash, FaPlus, FaLink, FaExchangeAlt, FaTimes, FaUserPlus, FaArrowLeft, FaEye, FaEyeSlash, FaLock, FaGift, FaUpload, FaCopy, FaImages, FaCamera } from 'react-icons/fa';
import '../styles/global.css';
import { supabase } from '../supabaseClient';
import { createClient } from '@supabase/supabase-js'; // For non-persisting client
import { useAuth } from '../contexts/AuthContext';
import MarketingManagerDashboard from './MarketingManagerDashboard';
import CustomerDashboard from './CustomerDashboard';
import StudentAmbassadorDashboard from './StudentAmbassadorDashboard';
import logo from '../logo_abecsa.png';

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
const CreateUserModal = ({ onClose, onRefresh }) => {
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
            let registerEmail = formData.email;
            if (!registerEmail.includes('@')) {
                registerEmail = `${registerEmail}@abecsa.edu`;
            }

            const { data: { user }, error: authError } = await tempSupabase.auth.signUp({
                email: registerEmail,
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
                    email: registerEmail,
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
                        alert(`User created! Note: Password could NOT be saved for display because the database needs an update. Run 'fix_password_column.sql'.`);
                        onRefresh();
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
                onRefresh();
                onClose();
            }
        } catch (error) {
            alert("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/90 z-[3000] flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#111] p-8 rounded-3xl w-full max-w-lg border border-yellow-500/50 shadow-2xl relative">
                <div className="flex justify-between mb-6 border-b border-gray-200 dark:border-white/10 pb-4">
                    <h3 className="m-0 text-yellow-600 dark:text-[#D4AF37] flex items-center gap-2 text-xl font-bold"><FaUserPlus /> Create New User</h3>
                    <button onClick={onClose} className="bg-transparent border-none text-slate-500 dark:text-white text-2xl cursor-pointer hover:text-red-500 transition-colors"><FaTimes /></button>
                </div>
                <form onSubmit={handleCreate} className="flex flex-col gap-4">
                    <input type="text" placeholder="Full Name" required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} 
                        className="w-full p-4 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-xl text-slate-900 dark:text-white outline-none focus:border-yellow-500 transition-colors" />
                    <div className="flex flex-col gap-2">
                        <input type="text" placeholder="Email OR Student ID" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} 
                            className="w-full p-4 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-xl text-slate-900 dark:text-white outline-none focus:border-yellow-500 transition-colors" />
                        {!formData.email.includes('@') && formData.email.length > 0 && <span className="text-slate-500 text-sm">Will register as: {formData.email}@abecsa.edu</span>}
                    </div>
                    <input type="password" placeholder="Password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} 
                        className="w-full p-4 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-xl text-slate-900 dark:text-white outline-none focus:border-yellow-500 transition-colors" />
                    <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} 
                        className="w-full p-4 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-xl text-slate-900 dark:text-white outline-none focus:border-yellow-500 transition-colors">
                        <option value="student">Student</option>
                        <option value="student_ambassador">Student Ambassador</option>
                        <option value="customer">Customer</option>
                        <option value="marketing_manager">Marketing Manager</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit" disabled={loading} className="bg-yellow-500 hover:bg-yellow-600 text-white dark:text-black p-4 rounded-xl font-bold cursor-pointer mt-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? 'Creating...' : 'Create Account'}
                    </button>
                </form>
            </div>
        </div>
    );
};

// --- All Websites Modal (Repository) ---
const AllWebsitesModal = ({ websites, profiles, onClose, onRefresh }) => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [newSite, setNewSite] = useState({ name: '', url: '', status: 'Pending', plan: 'Standard', userId: '' });
    const [loading, setLoading] = useState(false);

    const handleAddWebsite = async (e) => {
        e.preventDefault();
        if (!newSite.userId) {
            alert("Please assign a user to this website.");
            return;
        }
        setLoading(true);

        // Find the user to get their assigned manager
        const assignedUser = profiles.find(p => p.id === newSite.userId);
        const managerId = assignedUser ? assignedUser.manager_id : null;

        const payload = {
            name: newSite.name,
            url: newSite.url,
            status: newSite.status,
            plan: newSite.plan,
            user_id: newSite.userId,
            manager_id: managerId // Link to manager for sales tracking
        };

        const { error } = await supabase.from('websites').insert([payload]);

        if (error) {
            alert("Error adding website: " + error.message);
        } else {
            alert("Website added and assigned successfully!");
            setShowAddForm(false);
            setNewSite({ name: '', url: '', status: 'Pending', plan: 'Standard', userId: '' });
            onRefresh();
        }
        setLoading(false);
    };

    const handleUpdateStatus = async (websiteId, newStatus) => {
        const { error } = await supabase.from('websites').update({ status: newStatus }).eq('id', websiteId);
        if (error) alert("Error updating status: " + error.message);
        else onRefresh();
    };

    return (
        <div className="fixed inset-0 bg-black/90 z-[2000] flex items-center justify-center backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-[#0a0a0a] w-full max-w-[90%] h-[90%] rounded-[25px] border border-gray-200 dark:border-[#00ff88] flex flex-col p-4 md:p-10 shadow-2xl relative">
                <div className="flex justify-between mb-8 border-b border-gray-200 dark:border-[#00ff88]/30 pb-4 flex-wrap gap-4">
                    <h2 className="m-0 text-green-600 dark:text-[#00ff88] flex items-center gap-4 uppercase tracking-widest text-2xl font-bold"><FaGlobe /> All Websites Repository</h2>
                    <div className="flex gap-4">
                        <button onClick={() => setShowAddForm(!showAddForm)} className="bg-green-500 hover:bg-green-600 dark:bg-[#00ff88] text-white dark:text-black border-none px-4 py-2 rounded-lg font-bold cursor-pointer flex items-center gap-2 transition-colors">
                            <FaPlus /> {showAddForm ? 'Cancel' : 'Add Website'}
                        </button>
                        <button onClick={onClose} className="bg-transparent border-none text-slate-500 dark:text-white text-3xl cursor-pointer hover:text-red-500 transition-colors"><FaTimes /></button>
                    </div>
                </div>

                {showAddForm && (
                    <div className="mb-8 bg-gray-50 dark:bg-[#111] p-6 rounded-2xl border border-gray-200 dark:border-[#333]">
                        <h3 className="mt-0 text-slate-800 dark:text-white mb-4">Add New Website</h3>
                        <form onSubmit={handleAddWebsite} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input type="text" placeholder="Website Name" required value={newSite.name} onChange={e => setNewSite({...newSite, name: e.target.value})} 
                                className="w-full p-3 bg-white dark:bg-[#222] border border-gray-300 dark:border-[#444] rounded-lg text-slate-900 dark:text-white outline-none focus:border-green-500 transition-colors" />
                            <input type="text" placeholder="URL (e.g. example.com)" required value={newSite.url} onChange={e => setNewSite({...newSite, url: e.target.value})} 
                                className="w-full p-3 bg-white dark:bg-[#222] border border-gray-300 dark:border-[#444] rounded-lg text-slate-900 dark:text-white outline-none focus:border-green-500 transition-colors" />
                            <select value={newSite.status} onChange={e => setNewSite({...newSite, status: e.target.value})} 
                                className="w-full p-3 bg-white dark:bg-[#222] border border-gray-300 dark:border-[#444] rounded-lg text-slate-900 dark:text-white outline-none focus:border-green-500 transition-colors">
                                <option value="Pending">Pending</option>
                                <option value="Live">Live</option>
                                <option value="Maintenance">Maintenance</option>
                            </select>
                            <select value={newSite.plan} onChange={e => setNewSite({...newSite, plan: e.target.value})} 
                                className="w-full p-3 bg-white dark:bg-[#222] border border-gray-300 dark:border-[#444] rounded-lg text-slate-900 dark:text-white outline-none focus:border-green-500 transition-colors">
                                <option value="Standard">Standard</option>
                                <option value="Premium">Premium</option>
                                <option value="Enterprise">Enterprise</option>
                            </select>
                            <select value={newSite.userId} onChange={e => setNewSite({...newSite, userId: e.target.value})} required
                                className="w-full p-3 bg-white dark:bg-[#222] border border-gray-300 dark:border-[#444] rounded-lg text-slate-900 dark:text-white outline-none focus:border-green-500 transition-colors">
                                <option value="">Assign to User...</option>
                                {profiles.filter(p => p.role === 'customer').map(p => (
                                    <option key={p.id} value={p.id}>{p.full_name} ({p.email})</option>
                                ))}
                            </select>
                            <button type="submit" disabled={loading} className="bg-green-500 hover:bg-green-600 dark:bg-[#00ff88] text-white dark:text-black border-none rounded-lg font-bold cursor-pointer transition-colors disabled:opacity-50">
                                {loading ? 'Saving...' : 'Save Website'}
                            </button>
                        </form>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto rounded-xl border border-gray-200 dark:border-[#333]">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm text-slate-700 dark:text-gray-300 min-w-[800px]">
                            <thead className="bg-gray-100 dark:bg-[#111] text-slate-600 dark:text-gray-400 border-b-2 border-green-500 dark:border-[#00ff88]">
                                <tr>
                                    <th className="p-4 text-left font-semibold whitespace-nowrap">Website Name</th>
                                    <th className="p-4 text-left font-semibold whitespace-nowrap">URL</th>
                                    <th className="p-4 text-left font-semibold whitespace-nowrap">Assigned To</th>
                                    <th className="p-4 text-left font-semibold whitespace-nowrap">Status</th>
                                    <th className="p-4 text-left font-semibold whitespace-nowrap">Plan</th>
                                    <th className="p-4 text-left font-semibold whitespace-nowrap">Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {websites.map((site) => {
                                    const owner = profiles.find(p => p.id === site.user_id);
                                    return (
                                        <tr key={site.id} className="border-b border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                            <td className="p-4 font-bold text-slate-800 dark:text-white whitespace-nowrap">{site.name}</td>
                                            <td className="p-4 font-mono text-slate-500 dark:text-gray-400 whitespace-nowrap">{site.url || '-'}</td>
                                            <td className="p-4 text-slate-800 dark:text-white whitespace-nowrap">{owner ? owner.full_name : <span className="text-slate-400 italic">Unassigned</span>}</td>
                                            <td className="p-4 whitespace-nowrap">
                                                <select 
                                                    value={site.status} 
                                                    onChange={(e) => handleUpdateStatus(site.id, e.target.value)}
                                                    className={`px-3 py-1 rounded-full text-xs font-bold border-none cursor-pointer outline-none ${
                                                        site.status === 'Live' 
                                                        ? 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-[#00ff88]' 
                                                        : 'bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-[#ffaa00]'
                                                    }`}
                                                >
                                                    <option value="Pending" className="text-black">Pending</option>
                                                    <option value="Live" className="text-black">Live</option>
                                                    <option value="Maintenance" className="text-black">Maintenance</option>
                                                </select>
                                            </td>
                                            <td className="p-4 whitespace-nowrap">{site.plan || 'Standard'}</td>
                                            <td className="p-4 whitespace-nowrap">
                                                {site.url && (
                                                    <a 
                                                        href={site.url.startsWith('http') ? site.url : `https://${site.url}`} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="text-green-600 dark:text-[#00ff88] no-underline flex items-center gap-2 hover:underline"
                                                    >
                                                        <FaLink /> Open
                                                    </a>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Assign Asset Modal ---
const AssignAssetModal = ({ profiles, onClose, onRefresh }) => {
    const [formData, setFormData] = useState({ userId: '', name: '', type: 'License', value: '' });
    const [loading, setLoading] = useState(false);

    const handleAssign = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const payload = {
            user_id: formData.userId,
            name: formData.name,
            type: formData.type,
            value: formData.value
        };

        const { error } = await supabase.from('user_assets').insert([payload]);

        if (error) {
            alert("Error assigning asset: " + error.message);
        } else {
            alert("Asset Assigned Successfully!");
            if (onRefresh) onRefresh();
            onClose();
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black/90 z-[3000] flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#111] p-8 rounded-3xl w-full max-w-lg border border-yellow-500/50 shadow-2xl relative">
                <div className="flex justify-between mb-6 border-b border-gray-200 dark:border-white/10 pb-4">
                    <h3 className="m-0 text-yellow-600 dark:text-[#D4AF37] flex items-center gap-2 text-xl font-bold"><FaGift /> Assign Asset to User</h3>
                    <button onClick={onClose} className="bg-transparent border-none text-slate-500 dark:text-white text-2xl cursor-pointer hover:text-red-500 transition-colors"><FaTimes /></button>
                </div>
                <form onSubmit={handleAssign} className="flex flex-col gap-4">
                    <select value={formData.userId} onChange={e => setFormData({...formData, userId: e.target.value})} required
                         className="w-full p-4 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-xl text-slate-900 dark:text-white outline-none focus:border-yellow-500 transition-colors">
                        <option value="">Select User...</option>
                        {profiles.filter(p => p.role === 'customer').map(p => (
                            <option key={p.id} value={p.id}>{p.full_name} ({p.email})</option>
                        ))}
                    </select>
                    <input type="text" placeholder="Asset Name (e.g. Premium License, Web Cert)" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
                         className="w-full p-4 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-xl text-slate-900 dark:text-white outline-none focus:border-yellow-500 transition-colors" />
                    <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} 
                         className="w-full p-4 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-xl text-slate-900 dark:text-white outline-none focus:border-yellow-500 transition-colors">
                        <option value="License">License Key</option>
                        <option value="Certificate">Certificate Link</option>
                        <option value="Image">Image URL</option>
                    </select>
                    <input type="text" placeholder={formData.type === 'License' ? "License Key" : "URL (https://...)"} required value={formData.value} onChange={e => setFormData({...formData, value: e.target.value})} 
                         className="w-full p-4 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-xl text-slate-900 dark:text-white outline-none focus:border-yellow-500 transition-colors" />
                    
                    <button type="submit" disabled={loading} className="bg-yellow-500 hover:bg-yellow-600 text-white dark:text-black p-4 rounded-xl font-bold cursor-pointer mt-4 transition-colors disabled:opacity-50">
                        {loading ? 'Assigning...' : 'Assign Asset'}
                    </button>
                </form>
            </div>
        </div>
    );
};

// --- Image Upload Modal ---
const ImageUploadModal = ({ onClose }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadedUrl, setUploadedUrl] = useState('');

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        setUploading(true);
        // Create unique file path: timestamp_filename
        const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '-')}`;
        
        const { data, error } = await supabase.storage
            .from('public-files')
            .upload(fileName, file);

        if (error) {
            alert("Upload failed: " + error.message);
        } else {
            // Construct Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('public-files')
                .getPublicUrl(fileName);
            
            setUploadedUrl(publicUrl);
        }
        setUploading(false);
    };

    return (

        <div className="fixed inset-0 bg-black/90 z-[3000] flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#111] p-8 rounded-3xl w-full max-w-lg border border-blue-500/50 shadow-2xl relative">
                <div className="flex justify-between mb-6 border-b border-gray-200 dark:border-white/10 pb-4">
                    <h3 className="m-0 text-blue-600 dark:text-[#00ff88] flex items-center gap-2 text-xl font-bold"><FaUpload /> Upload Image</h3>
                    <button onClick={onClose} className="bg-transparent border-none text-slate-500 dark:text-white text-2xl cursor-pointer hover:text-red-500 transition-colors"><FaTimes /></button>
                </div>
                
                {!uploadedUrl ? (
                    <form onSubmit={handleUpload} className="flex flex-col gap-4">
                        <div className="border-2 border-dashed border-gray-300 dark:border-[#444] p-8 rounded-xl text-center text-slate-500 dark:text-gray-400 hover:border-blue-500 dark:hover:border-[#00ff88] transition-colors">
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={e => setFile(e.target.files[0])}
                                className="hidden"
                                id="file-upload"
                            />
                            <label htmlFor="file-upload" className="cursor-pointer block">
                                {file ? (
                                    <span className="text-blue-600 dark:text-white font-bold">{file.name}</span>
                                ) : (
                                    <span>Click to Select Image</span>
                                )}
                            </label>
                        </div>

                        <button type="submit" disabled={!file || uploading} className="bg-blue-600 hover:bg-blue-700 dark:bg-[#00ff88] text-white dark:text-black p-4 rounded-xl font-bold cursor-pointer transition-colors disabled:opacity-50">
                            {uploading ? 'Uploading...' : 'Upload Now'}
                        </button>
                    </form>
                ) : (
                    <div className="text-center">
                        <p className="text-slate-800 dark:text-gray-200 mb-4">Image Uploaded Successfully!</p>
                        <div className="bg-gray-100 dark:bg-[#222] p-4 rounded-xl break-all font-mono text-xs mb-4 border border-gray-200 dark:border-[#333] text-slate-600 dark:text-white">
                            {uploadedUrl}
                        </div>
                        <img src={uploadedUrl} alt="Preview" className="max-w-full max-h-[150px] mb-4 rounded-lg shadow-md" />
                        <div className="flex gap-4">
                            <button 
                                onClick={() => { navigator.clipboard.writeText(uploadedUrl); alert('URL Copied!'); }}
                                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white dark:text-black p-3 rounded-xl font-bold cursor-pointer flex items-center justify-center gap-2 transition-colors"
                            >
                                <FaCopy /> Copy URL
                            </button>
                            <button 
                                onClick={() => { setUploadedUrl(''); setFile(null); }}
                                className="flex-1 bg-transparent border border-gray-300 dark:border-gray-500 text-slate-500 dark:text-gray-400 p-3 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                            >
                                Upload Another
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Image Library Modal ---
const ImageLibraryModal = ({ profiles, onClose }) => {
    const [files, setFiles] = useState([]);
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadLibrary();
    }, []);

    const loadLibrary = async () => {
        setLoading(true);
        // 1. List Files
        const { data: fileList, error: storageError } = await supabase.storage.from('public-files').list('', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });
        
        // 2. Fetch Assignments
        const { data: assetList, error: dbError } = await supabase.from('user_assets').select('*').eq('type', 'Image');

        if (fileList) {
            // map assignments
            const enrichedFiles = fileList.map(f => {
                const publicUrl = supabase.storage.from('public-files').getPublicUrl(f.name).data.publicUrl;
                
                // Find assignments using this URL
                // We check if asset.value contains the filename (more robust than exact URL match due to potential query params or base URL diffs)
                const assignedTo = assetList?.filter(a => a.value.includes(f.name)).map(a => {
                    const user = profiles.find(p => p.id === a.user_id);
                    return user ? user.full_name : 'Unknown User';
                }) || [];

                return {
                    ...f,
                    url: publicUrl,
                    assignments: assignedTo
                };
            });
            setFiles(enrichedFiles);
            setAssets(assetList || []);
        }
        setLoading(false);
    };

    return (

        <div className="fixed inset-0 bg-black/90 z-[2000] flex items-center justify-center backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-[#0a0a0a] w-full max-w-[90%] h-[90%] rounded-[25px] border border-blue-500 dark:border-[#2b7de9] flex flex-col p-4 md:p-10 shadow-2xl relative">
                <div className="flex justify-between mb-8 border-b border-gray-200 dark:border-[#2b7de9]/30 pb-4">
                    <h2 className="m-0 text-blue-600 dark:text-[#2b7de9] flex items-center gap-2 uppercase tracking-widest text-2xl font-bold"><FaImages /> Image Library & Stats</h2>
                    <button onClick={onClose} className="bg-transparent border-none text-slate-500 dark:text-white text-3xl cursor-pointer hover:text-red-500 transition-colors"><FaTimes /></button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-gray-50 dark:bg-[#111] p-6 rounded-2xl border border-gray-200 dark:border-[#333]">
                        <h3 className="m-0 mb-2 text-slate-500 dark:text-[#aaa] text-sm uppercase font-bold">Total Uploads</h3>
                        <span className="text-3xl font-bold text-slate-800 dark:text-white">{files.length}</span>
                    </div>
                    <div className="bg-gray-50 dark:bg-[#111] p-6 rounded-2xl border border-gray-200 dark:border-[#333]">
                        <h3 className="m-0 mb-2 text-slate-500 dark:text-[#aaa] text-sm uppercase font-bold">Total Assigned</h3>
                        <span className="text-3xl font-bold text-green-600 dark:text-[#00ff88]">{files.filter(f => f.assignments.length > 0).length}</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto rounded-xl border border-gray-200 dark:border-[#333]">
                    {loading ? <div className="text-slate-500 dark:text-white p-8 text-center">Loading library...</div> : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-sm text-slate-700 dark:text-gray-300 min-w-[700px]">
                                <thead className="bg-gray-100 dark:bg-[#151515] text-slate-600 dark:text-gray-400 border-b border-gray-200 dark:border-[#333]">
                                    <tr>
                                        <th className="p-4 text-left font-semibold">Preview</th>
                                        <th className="p-4 text-left font-semibold">File Name / Link</th>
                                        <th className="p-4 text-left font-semibold">Assigned To</th>
                                        <th className="p-4 text-left font-semibold">Metadata</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {files.map(file => (
                                        <tr key={file.id} className="border-b border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                            <td className="p-4">
                                                <img src={file.url} alt="thumb" className="w-[60px] h-[60px] object-cover rounded-lg border border-gray-200 dark:border-[#333]" />
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-col gap-2">
                                                    <span className="text-slate-800 dark:text-white font-medium">{file.name}</span>
                                                    <button 
                                                        onClick={() => { navigator.clipboard.writeText(file.url); alert('Link Copied!'); }}
                                                        className="bg-transparent border-none text-blue-600 dark:text-[#2b7de9] cursor-pointer flex items-center gap-2 text-xs p-0 hover:underline"
                                                    >
                                                        <FaCopy /> Copy Link
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                {file.assignments.length > 0 ? (
                                                    file.assignments.map((name, i) => (
                                                        <span key={i} className="inline-block bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-[#00ff88] px-2 py-1 rounded-md text-xs mr-1 mb-1 font-medium">
                                                            {name}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-slate-400 italic">Unassigned</span>
                                                )}
                                            </td>
                                            <td className="p-4 text-xs text-slate-500 dark:text-[#666]">
                                                Size: {(file.metadata?.size / 1024).toFixed(1)} KB<br/>
                                                Uploaded: {new Date(file.created_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Global Master List (Admins, Managers, Customers) ---
const GlobalCustomersModal = ({ profiles, websites, onClose, onRefresh, setViewingManagerId, setViewingCustomerId, setViewingAmbassadorId }) => {
    const [filterRole, setFilterRole] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [managers, setManagers] = useState([]);

    useEffect(() => {
        setManagers(profiles.filter(p => p.role === 'marketing_manager'));
    }, [profiles]);

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

    const handleAssignManager = async (customerId, managerId) => {
        // 1. Update Profile
        const { error } = await supabase.from('profiles').update({ manager_id: managerId || null }).eq('id', customerId);
        
        if (error) {
            alert("Error assigning manager: " + error.message);
        } else {
            // 2. Auto-Link User's existing websites to this Manager (So they show in sales)
            if (managerId) {
                await supabase.from('websites').update({ manager_id: managerId }).eq('user_id', customerId);
            } else {
                // Optional: If unassigning manager, should we unassign websites?
                // For now, let's keep them linked or unassign them. Let's unassign for consistency.
                await supabase.from('websites').update({ manager_id: null }).eq('user_id', customerId);
            }

            onRefresh(); 
        }
    };

    const filteredProfiles = profiles.filter(p => {
        const matchesRole = filterRole === 'ALL' ? true : p.role === filterRole;
        const matchesSearch = (p.full_name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                              (p.email || '').toLowerCase().includes(searchQuery.toLowerCase());
        return matchesRole && matchesSearch;
    });

    return (

        <div className="fixed inset-0 bg-black/90 z-[2000] flex items-center justify-center backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-[#0a0a0a] w-full max-w-[95%] h-[95%] rounded-[25px] border border-yellow-500 dark:border-[#D4AF37] flex flex-col p-4 md:p-10 shadow-2xl relative">
                <div className="flex justify-between mb-8 border-b border-gray-200 dark:border-[#D4AF37]/20 pb-4">
                    <h2 className="m-0 text-yellow-600 dark:text-[#D4AF37] flex items-center gap-4 uppercase tracking-widest text-2xl font-bold"><FaUsers /> Master User List</h2>
                    <button onClick={onClose} className="bg-transparent border-none text-slate-500 dark:text-white text-3xl cursor-pointer hover:text-red-500 transition-colors"><FaTimes /></button>
                </div>

                <div className="mb-6 flex gap-4 items-center flex-wrap">
                    <input 
                        type="text" 
                        placeholder="Search users by name or email..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 min-w-[200px] max-w-[400px] p-3 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-xl text-slate-900 dark:text-white outline-none focus:border-yellow-500 transition-colors"
                    />
                    <div className="flex gap-2 overflow-x-auto pb-2 min-w-0 md:flex-wrap md:overflow-visible">
                    {['ALL', 'admin', 'marketing_manager', 'customer', 'student_ambassador'].map(role => (
                        <button 
                            key={role}
                            onClick={() => setFilterRole(role)}
                            className={`px-3 py-1 rounded-full cursor-pointer font-bold capitalize whitespace-nowrap transition-colors text-xs md:text-sm shrink-0 ${
                                filterRole === role 
                                ? 'bg-yellow-500 text-black' 
                                : 'bg-gray-100 dark:bg-white/10 text-slate-600 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20'
                            }`}
                        >
                            {role.replace('_', ' ')}
                        </button>
                    ))}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto rounded-xl border border-gray-200 dark:border-[#333]">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm text-slate-700 dark:text-gray-300 min-w-[900px]">
                            <thead className="bg-gray-100 dark:bg-[#111] text-slate-600 dark:text-gray-400 border-b-2 border-yellow-500 dark:border-[#D4AF37]">
                                <tr>
                                    <th className="p-4 text-left font-semibold whitespace-nowrap">Full Name</th>
                                    <th className="p-4 text-left font-semibold whitespace-nowrap">Role</th>
                                    <th className="p-4 text-left font-semibold whitespace-nowrap">Email</th>
                                    <th className="p-4 text-left font-semibold whitespace-nowrap">Password</th>
                                    <th className="p-4 text-left font-semibold whitespace-nowrap">Assigned Manager</th>
                                    <th className="p-4 text-left font-semibold whitespace-nowrap">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProfiles.map((user) => (
                                    <tr key={user.id} className="border-b border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-bold text-slate-800 dark:text-white whitespace-nowrap">{user.full_name}</td>
                                        <td className="p-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap inline-block ${
                                                user.role === 'admin' ? 'bg-yellow-100 text-yellow-800 dark:bg-[#D4AF37] dark:text-black' : 
                                                user.role === 'marketing_manager' ? 'bg-purple-100 text-purple-800 dark:bg-[#8a2be2] dark:text-white' : 
                                                user.role === 'student_ambassador' ? 'bg-cyan-100 text-cyan-800 dark:bg-[#00d2ff] dark:text-black' : 
                                                'bg-green-100 text-green-800 dark:bg-[#00ff88] dark:text-black'
                                            }`}>
                                                {user.role.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="p-4 text-slate-500 dark:text-[#aaa] whitespace-nowrap">{user.email}</td>
                                        <td className="p-4 whitespace-nowrap">
                                            {user.visible_password ? (
                                                 <PasswordDisplay password={user.visible_password} />
                                            ) : <span className="text-slate-400 italic">Hidden/Old</span>}
                                        </td>
                                        <td className="p-4 whitespace-nowrap">
                                            {user.role === 'customer' ? (
                                                <select 
                                                    value={user.manager_id || ''} 
                                                    onChange={(e) => handleAssignManager(user.id, e.target.value)}
                                                    className="bg-white dark:bg-[#222] text-slate-800 dark:text-white border border-gray-300 dark:border-[#444] p-2 rounded-md outline-none focus:border-yellow-500 w-full min-w-[150px]"
                                                >
                                                    <option value="">Unassigned</option>
                                                    {managers.map(mgr => (
                                                        <option key={mgr.id} value={mgr.id}>{mgr.full_name}</option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <span className="text-slate-400">-</span>
                                            )}
                                        </td>
                                        <td className="p-4 whitespace-nowrap">
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => handleDeleteUser(user.id, user.role)}
                                                    className="text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 border border-red-200 dark:border-red-500/50 px-2 py-1 rounded-lg cursor-pointer flex items-center gap-2 transition-colors font-bold text-xs whitespace-nowrap"
                                                >
                                                    <FaTrash />
                                                </button>
                                                {/* View Dashboard Button for Customers, Managers, Ambassadors */}
                                                {(user.role === 'customer' || user.role === 'marketing_manager' || user.role === 'student_ambassador') && (
                                                    <button 
                                                        onClick={() => {
                                                            onClose(); // Close modal first
                                                            if (user.role === 'marketing_manager') setViewingManagerId(user.id);
                                                            else if (user.role === 'customer') setViewingCustomerId(user.id);
                                                            else if (user.role === 'student_ambassador') setViewingAmbassadorId(user.id);
                                                        }}
                                                        className="text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200 dark:border-blue-500/50 px-2 py-1 rounded-lg cursor-pointer flex items-center gap-2 transition-colors font-bold text-xs whitespace-nowrap"
                                                        title="View Dashboard"
                                                    >
                                                        <FaGlobe />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Managers List ---
const ManagersList = ({ managers, customers, websites, onViewDashboard }) => {
    
    // Group websites by manager
    const getManagerSales = (managerId) => websites.filter(w => w.manager_id === managerId);

    // Get Assigned Customers
    const getAssignedCustomers = (managerId) => customers.filter(c => c.manager_id === managerId);

    return (

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {managers.map(mgr => {
                const sales = getManagerSales(mgr.id);
                const assigned = getAssignedCustomers(mgr.id);
                
                return (
                    <div key={mgr.id} className="bg-white dark:bg-white/5 p-4 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm hover:border-purple-500/50 transition-colors flex flex-col justify-between h-full">
                         <div>
                            <h3 className="m-0 text-slate-800 dark:text-white font-bold text-sm leading-tight break-words mb-1" title={mgr.full_name}>{mgr.full_name}</h3>
                            <p className="text-slate-500 dark:text-gray-400 text-xs mb-2 break-all" title={mgr.email}>{mgr.email}</p>
                            
                            <div className="flex flex-wrap gap-1 mb-2">
                                 <span className="bg-purple-100 text-purple-700 dark:bg-[#8a2be2] dark:text-white px-1.5 py-0.5 rounded-md text-[10px] font-bold whitespace-nowrap">
                                    {sales.length} Sales
                                </span>
                                <span className="bg-yellow-100 text-yellow-700 dark:bg-[#D4AF37] dark:text-black px-1.5 py-0.5 rounded-md text-[10px] font-bold whitespace-nowrap">
                                    {assigned.length} Users
                                </span>
                            </div>
                            
                            {mgr.visible_password && <div className="mb-2"><PasswordDisplay password={mgr.visible_password} /></div>}
                         </div>
                         <button onClick={() => onViewDashboard(mgr.id)} className="w-full py-1 bg-purple-50 hover:bg-purple-100 dark:bg-purple-500/10 border border-purple-200 dark:border-[#8a2be2] text-purple-600 dark:text-[#8a2be2] rounded-lg font-bold cursor-pointer flex items-center justify-center gap-1 transition-colors text-xs">
                             <FaGlobe size={10} /> View
                         </button>
                    </div>
                );
            })}
        </div>
    );
};

// --- Student Ambassadors List ---
const StudentAmbassadorsList = ({ ambassadors, onViewDashboard }) => {
    return (

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {ambassadors.map(amb => (
                <div key={amb.id} className="bg-white dark:bg-white/5 p-4 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm hover:border-cyan-500/50 transition-colors flex flex-col justify-between h-full">
                        <div>
                            <h3 className="m-0 text-cyan-600 dark:text-[#00d2ff] font-bold text-sm leading-tight break-words mb-1" title={amb.full_name}>{amb.full_name}</h3>
                            <p className="text-slate-500 dark:text-gray-400 text-xs mb-2 break-all" title={amb.email}>{amb.email}</p>
                            
                            <div className="mb-2">
                                <span className="bg-cyan-100 text-cyan-700 dark:bg-[#00d2ff] dark:text-black px-1.5 py-0.5 rounded-md text-[10px] font-bold whitespace-nowrap">
                                    Ambassador
                                </span>
                            </div>

                            {amb.visible_password && <div className="mb-2"><PasswordDisplay password={amb.visible_password} /></div>}
                        </div>
                        <button onClick={() => onViewDashboard(amb.id)} className="w-full py-1 bg-cyan-50 hover:bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-200 dark:border-[#00d2ff] text-cyan-600 dark:text-[#00d2ff] rounded-lg font-bold cursor-pointer flex items-center justify-center gap-1 transition-colors text-xs mt-auto">
                             <FaGlobe size={10} /> View
                        </button>
                </div>
            ))}
            {ambassadors.length === 0 && <div className="text-slate-500 italic p-4">No Student Ambassadors found.</div>}
        </div>
    );
};




const AdminDashboard = () => {
    const navigate = useNavigate();
    const { user, profile, signOut } = useAuth();
    

    
    // New States
    const [viewingManagerId, setViewingManagerId] = useState(null);
    const [viewingAmbassadorId, setViewingAmbassadorId] = useState(null);
    const [viewingCustomerId, setViewingCustomerId] = useState(null);

    const [showCreateUser, setShowCreateUser] = useState(false);
    const [showAssignAsset, setShowAssignAsset] = useState(false);
    const [showImageUpload, setShowImageUpload] = useState(false);
    const [showImageLibrary, setShowImageLibrary] = useState(false);


    const [profiles, setProfiles] = useState([]);
    const [websites, setWebsites] = useState([]);
    const [messages, setMessages] = useState([]);
    const [conversations, setConversations] = useState({});
    
    const [selectedUserForChat, setSelectedUserForChat] = useState(null);
    const [replyMessage, setReplyMessage] = useState('');
    const [showGlobalList, setShowGlobalList] = useState(false);
    const [showSitesList, setShowSitesList] = useState(false);
    
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
        
        // Subscribe to Messages (Append new ones)
        const msgSub = supabase.channel('admin-messages')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
                setMessages(prev => [...prev, payload.new]);
            })
            .subscribe();

        // Subscribe to Realtime Updates for Profiles & Websites (Auto-Refresh)
        const globalSub = supabase.channel('admin-global-updates')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
                fetchData();
            })
            .on('postgres_changes', { event: '*', schema: 'public', table: 'websites' }, () => {
                fetchData();
            })
            .subscribe();

        return () => { 
            supabase.removeChannel(msgSub); 
            supabase.removeChannel(globalSub);
        };
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

    const handleDeleteConversation = async () => {
        if (!selectedUserForChat || !window.confirm("Are you sure you want to delete this entire conversation?")) return;
        
        // Delete messages where sender OR receiver is the selected user (conversation logic)
        // Since we store all messages flat in 'messages' table, we find by conversation_id or sender
        /* 
           Ideally, we have a conversation ID. The current implementation uses userId as conversationId.
           So we delete messages where conversation_id = selectedUserForChat OR sender_id = selectedUserForChat
        */
        
        const { error } = await supabase.from('messages').delete().or(`conversation_id.eq.${selectedUserForChat},sender_id.eq.${selectedUserForChat}`);
        
        if (error) alert("Error deleting chat: " + error.message);
        else {
            alert("Conversation cleared.");
            setMessages(prev => prev.filter(m => m.conversation_id !== selectedUserForChat && m.sender_id !== selectedUserForChat));
            setSelectedUserForChat(null);
        }
    };



    const managers = profiles.filter(p => p.role === 'marketing_manager');
    const customers = profiles.filter(p => p.role === 'customer');
    // Pass setters to Global List for impersonation
    const handleGlobalListClose = () => setShowGlobalList(false);

    if (viewingManagerId) {
        return (
            <div>
                <button onClick={() => setViewingManagerId(null)} className="fixed top-4 right-4 z-50 bg-black text-white px-4 py-2 rounded-full font-bold shadow-lg border border-gray-700 hover:bg-gray-900 cursor-pointer">
                    <FaTimes /> Exit Admin View
                </button>
                <MarketingManagerDashboard managerId={viewingManagerId} />
            </div>
        );
    }

    if (viewingAmbassadorId) {
        return (
            <div>
                 <button onClick={() => setViewingAmbassadorId(null)} className="fixed top-4 right-4 z-50 bg-black text-white px-4 py-2 rounded-full font-bold shadow-lg border border-gray-700 hover:bg-gray-900 cursor-pointer">
                    <FaTimes /> Exit Admin View
                </button>
                <StudentAmbassadorDashboard ambassadorId={viewingAmbassadorId} />
            </div>
        );
    }

    if (viewingCustomerId) {
        return (
            <div>
                 <button onClick={() => setViewingCustomerId(null)} className="fixed top-4 right-4 z-50 bg-black text-white px-4 py-2 rounded-full font-bold shadow-lg border border-gray-700 hover:bg-gray-900 cursor-pointer">
                    <FaTimes /> Exit Admin View
                </button>
                <CustomerDashboard customerId={viewingCustomerId} />
            </div>
        );
    }

    const activeSites = websites.filter(w => w.status === 'Live').length;

    return (
        <div className="min-h-screen bg-white dark:bg-[#050505] text-slate-900 dark:text-white pt-0 px-4 md:px-[5%] pb-8 font-body transition-colors duration-300">
            
            {/* Branding Header - Forced to TOP */}
            <div className="flex justify-between items-start mb-0">
                <div className="-mt-12 -ml-8">
                    <img src={logo} alt="Abecsa Logo" className="h-52 w-auto object-contain" />
                </div>
                <div className="pt-6">
                    <button 
                        onClick={() => navigate('/')} 
                        className="bg-gray-200 dark:bg-white/10 text-slate-800 dark:text-white px-3 py-1 rounded-lg text-[10px] font-bold hover:bg-gray-300 dark:hover:bg-white/20 transition-colors uppercase tracking-wider"
                    >
                        Back to Home
                    </button>
                </div>
            </div>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-gray-200 dark:border-white/10 pb-4 gap-4">
                <h1 className="text-2xl md:text-3xl font-bold m-0 text-yellow-600 dark:text-[#D4AF37]">SUPER ADMIN VIEW</h1>
                <div className="flex flex-wrap gap-2 md:gap-4">
                    <button onClick={() => setShowCreateUser(true)} className="bg-yellow-500 hover:bg-yellow-600 text-white dark:text-black dark:bg-[#D4AF37] border-none px-3 py-1 rounded-lg cursor-pointer flex gap-2 items-center font-bold transition-colors text-sm">
                        <FaUserPlus /> <span className="hidden sm:inline">Create User</span>
                    </button>
                    <button onClick={() => setShowAssignAsset(true)} className="bg-purple-600 hover:bg-purple-700 dark:bg-[#8a2be2] text-white border-none px-3 py-1 rounded-lg cursor-pointer flex gap-2 items-center font-bold transition-colors text-sm">
                        <FaGift /> <span className="hidden sm:inline">Assign Asset</span>
                    </button>
                    <button onClick={() => setShowImageUpload(true)} className="bg-blue-600 hover:bg-blue-700 dark:bg-[#2b7de9] text-white border-none px-3 py-1 rounded-lg cursor-pointer flex gap-2 items-center font-bold transition-colors text-sm">
                        <FaUpload /> <span className="hidden sm:inline">Upload Image</span>
                    </button>
                    <button onClick={() => setShowImageLibrary(true)} className="bg-white hover:bg-gray-100 dark:bg-white/10 dark:hover:bg-white/20 border border-gray-300 dark:border-[#444] text-slate-700 dark:text-white px-3 py-1 rounded-lg cursor-pointer flex gap-2 items-center transition-colors text-sm">
                        <FaImages /> <span className="hidden sm:inline">Library</span>
                    </button>
                    <button onClick={() => { signOut(); navigate('/login'); }} className="bg-transparent border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 px-3 py-1 rounded-lg cursor-pointer flex gap-2 items-center transition-colors text-sm">
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                <div className="flex-1 bg-white dark:bg-[#111] p-6 rounded-2xl border border-gray-200 dark:border-[#333] cursor-pointer hover:border-yellow-500 transition-colors shadow-sm" onClick={() => setShowGlobalList(true)}>
                    <h3 className="m-0 text-3xl font-bold text-yellow-600 dark:text-[#D4AF37]">{profiles.length}</h3>
                    <p className="text-slate-500 dark:text-[#888] m-0">Total Users (Click)</p>
                </div>
                <div className="flex-1 bg-white dark:bg-[#111] p-6 rounded-2xl border border-gray-200 dark:border-[#333] shadow-sm">
                    <h3 className="m-0 text-3xl font-bold text-blue-600 dark:text-[#2b7de9]">{profiles.filter(p => p.role === 'admin').length}</h3>
                    <p className="text-slate-500 dark:text-[#888] m-0">Admins</p>
                </div>
                <div className="flex-1 bg-white dark:bg-[#111] p-6 rounded-2xl border border-gray-200 dark:border-[#333] cursor-pointer hover:border-green-500 transition-colors shadow-sm" onClick={() => setShowSitesList(true)}>
                    <h3 className="m-0 text-3xl font-bold text-green-600 dark:text-[#00ff88]">{activeSites}</h3>
                    <p className="text-slate-500 dark:text-[#888] m-0">Live Websites (Click)</p>
                </div>
                 <div className="flex-1 bg-white dark:bg-[#111] p-6 rounded-2xl border border-gray-200 dark:border-[#333] cursor-pointer hover:border-yellow-500 transition-colors shadow-sm" onClick={() => setShowGlobalList(true)}>
                    <h3 className="m-0 text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3"><FaUsers /> Master List</h3>
                    <p className="text-yellow-600 dark:text-[#D4AF37] m-0 text-sm">Manage All Users</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_350px] gap-8">
                
                {/* Left: Content */}
                <div className="flex flex-col gap-12">
                     <div>
                        <h2 className="text-purple-600 dark:text-[#8a2be2] border-l-4 border-purple-600 dark:border-[#8a2be2] pl-4 mb-6 text-xl font-bold">Managers & Sales</h2>
                        <ManagersList managers={managers} customers={customers} websites={websites} onRefresh={fetchData} onViewDashboard={setViewingManagerId} />
                     </div>
                
                     {/* Student Ambassadors Section */}
                     <div>
                        <h2 className="text-cyan-600 dark:text-[#00d2ff] border-l-4 border-cyan-600 dark:border-[#00d2ff] pl-4 mb-6 text-xl font-bold">Student Ambassadors</h2>
                        <StudentAmbassadorsList ambassadors={profiles.filter(p => p.role === 'student_ambassador')} onViewDashboard={setViewingAmbassadorId} />
                     </div>
                </div>

                {/* Right: Support Chat Master */}
                <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-[#333] flex flex-col h-[600px] overflow-hidden shadow-lg sticky top-[120px]">
                    <div className="p-4 border-b border-gray-200 dark:border-[#333] bg-gray-50 dark:bg-[#1a1a1a]">
                        <h3 className="m-0 text-lg font-bold">Support Inbox</h3>
                    </div>
                    
                    <div className="flex flex-1 overflow-hidden">
                        <div className="w-[120px] border-r border-gray-200 dark:border-[#333] overflow-y-auto bg-gray-50 dark:bg-[#151515]">
                            {Object.values(conversations).map(conv => (
                                <div 
                                    key={conv.id}
                                    onClick={() => setSelectedUserForChat(conv.id)}
                                    className={`p-4 cursor-pointer border-b border-gray-200 dark:border-[#222] text-center transition-colors ${
                                        selectedUserForChat === conv.id 
                                        ? 'bg-blue-600 dark:bg-[#2b7de9] text-white' 
                                        : 'bg-transparent text-slate-500 dark:text-[#aaa] hover:bg-gray-100 dark:hover:bg-white/5'
                                    }`}
                                >
                                    <div className="font-bold mb-1 text-sm truncate">{conv.name}</div>
                                    <div className="text-xs opacity-70">{new Date(conv.timestamp).toLocaleDateString()}</div>
                                </div>
                            ))}
                        </div>

                        <div className="flex-1 flex flex-col bg-white dark:bg-[#111]">
                            {selectedUserForChat ? (
                                <>
                                    <div className="p-3 bg-gray-100 dark:bg-[#222] text-sm text-slate-700 dark:text-white flex justify-between items-center border-b border-gray-200 dark:border-[#333]">
                                        <span>Chatting with: <strong>{conversations[selectedUserForChat]?.name}</strong></span>
                                        <button onClick={handleDeleteConversation} className="bg-transparent border border-red-500 text-red-500 px-2 py-1 rounded text-xs cursor-pointer flex gap-1 items-center hover:bg-red-50 dark:hover:bg-red-500/10">
                                            <FaTrash /> Clear Chat
                                        </button>
                                    </div>
                                    <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-gray-50/50 dark:bg-transparent">
                                        {messages.filter(m => (m.conversation_id === selectedUserForChat || m.sender_id === selectedUserForChat) && m.conversation_id).map((msg, i) => {
                                            const isCustomer = msg.sender_id === selectedUserForChat;
                                            return (
                                                <div key={i} className={`p-3 rounded-xl max-w-[85%] text-sm ${
                                                    isCustomer 
                                                    ? 'self-start bg-gray-200 dark:bg-[#333] text-slate-800 dark:text-white rounded-tl-none' 
                                                    : 'self-end bg-blue-600 dark:bg-[#2b7de9] text-white rounded-tr-none'
                                                }`}>
                                                    {msg.content}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <form onSubmit={handleSendReply} className="p-3 border-t border-gray-200 dark:border-[#333] flex gap-2 bg-white dark:bg-[#111]">
                                        <input type="text" placeholder="Reply..." value={replyMessage} onChange={e => setReplyMessage(e.target.value)} 
                                            className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-[#444] bg-white dark:bg-[#222] text-slate-900 dark:text-white outline-none focus:border-blue-500" />
                                        <button type="submit" className="bg-blue-600 dark:bg-[#2b7de9] border-none text-white px-4 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"><FaPaperPlane /></button>
                                    </form>
                                </>
                            ) : (
                                <div className="flex-1 flex items-center justify-center text-slate-400 dark:text-[#666]">
                                    Select a conversation to start chatting
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
                    setViewingManagerId={setViewingManagerId}
                    setViewingCustomerId={setViewingCustomerId}
                    setViewingAmbassadorId={setViewingAmbassadorId}
                />
            )}

            {showSitesList && (
                <AllWebsitesModal 
                    websites={websites} 
                    profiles={profiles}
                    onClose={() => setShowSitesList(false)}
                    onRefresh={fetchData}
                />
            )}

            {showCreateUser && (
                <CreateUserModal onClose={() => setShowCreateUser(false)} onRefresh={fetchData} />
            )}

            {showAssignAsset && (
                <AssignAssetModal profiles={profiles} onClose={() => setShowAssignAsset(false)} onRefresh={fetchData} />
            )}

            {showImageUpload && (
                <ImageUploadModal onClose={() => setShowImageUpload(false)} />
            )}

            {showImageLibrary && (
                <ImageLibraryModal profiles={profiles} onClose={() => setShowImageLibrary(false)} />
            )}



        </div>
    );
};

// Simple Icon component missing in imports
const FaPaperPlane = () => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"></path></svg>;


export default AdminDashboard;
