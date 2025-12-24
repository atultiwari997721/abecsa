import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaUsers, FaGlobe, FaEnvelope, FaTrash, FaPlus, FaEdit, FaExchangeAlt, FaTimes } from 'react-icons/fa';
import { mockUsers } from '../data/mockUsers';
import '../styles/global.css';

// --- Global Customer Management Modal ---
const GlobalCustomersModal = ({ managers, setManagers, directCustomers, setDirectCustomers, onClose }) => {
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [reassignTarget, setReassignTarget] = useState('');
    
    // State for Global Add
    const [newGlobalSale, setNewGlobalSale] = useState({
        managerId: '',
        customerName: '',
        siteName: '',
        loginId: '',
        password: '',
        dateSold: new Date().toISOString().split('T')[0],
        status: 'Live'
    });

    // Flatten all manager customers
    const managerCustomers = managers.flatMap(m => 
        (m.websitesSold || []).map((site, index) => ({
            ...site,
            managerId: m.userId,
            managerName: m.name,
            originalIndex: index,
            isDirect: false
        }))
    );

    // Flatten direct customers
    const flatDirectCustomers = (directCustomers || []).flatMap((user, index) => 
        (user.websites || []).map((site, siteIndex) => ({
            customerName: user.name,
            siteName: site.name,
            loginId: user.userId,
            password: user.password,
            dateSold: site.createdAt || '2025-01-01',
            status: site.status,
            managerId: 'DIRECT',
            managerName: 'Abecsa Direct',
            originalIndex: index, // User index
            siteIndex: siteIndex,
            isDirect: true
        }))
    );

    const allCustomers = [...flatDirectCustomers, ...managerCustomers];

    const handleSaveEdit = () => {
        if (!editingCustomer) return;

        if (editingCustomer.isDirect) {
            const updatedDirect = [...directCustomers];
            const user = updatedDirect[editingCustomer.originalIndex];
            
            // Update User fields
            user.name = editingCustomer.customerName;
            user.userId = editingCustomer.loginId; // Note: Changing ID might affect login if not careful
            user.password = editingCustomer.password;
            
            // Update specific website
            if (user.websites && user.websites[editingCustomer.siteIndex]) {
                 user.websites[editingCustomer.siteIndex] = {
                     ...user.websites[editingCustomer.siteIndex],
                     name: editingCustomer.siteName,
                     status: editingCustomer.status
                 };
            }

            setDirectCustomers(updatedDirect);
            localStorage.setItem('abecsa_direct_customers', JSON.stringify(updatedDirect));
        } else {
            const updatedManagers = managers.map(m => {
                if (m.userId === editingCustomer.managerId) {
                    const newSales = [...m.websitesSold];
                    newSales[editingCustomer.originalIndex] = {
                        customerName: editingCustomer.customerName,
                        siteName: editingCustomer.siteName,
                        loginId: editingCustomer.loginId,
                        password: editingCustomer.password,
                        dateSold: editingCustomer.dateSold,
                        status: editingCustomer.status
                    };
                    return { ...m, websitesSold: newSales };
                }
                return m;
            });
            setManagers(updatedManagers);
            localStorage.setItem('abecsa_managers', JSON.stringify(updatedManagers));
        }
        setEditingCustomer(null);
    };

    const handleReassign = (customer) => {
        if (!reassignTarget || reassignTarget === customer.managerId) return;

        // --- 1. REMOVE FROM SOURCE ---
        if (customer.isDirect) {
            // Remove website from direct customer. If it's their only site, remove the user entirely? 
            // For simplicity, we'll remove the specific website. 
            // If user has no more sites, we might keep empty user or delete. Let's delete if empty.
            const updatedDirect = [...directCustomers];
            const user = updatedDirect[customer.originalIndex];
            user.websites = user.websites.filter((_, i) => i !== customer.siteIndex);
            
            if (user.websites.length === 0) {
                 updatedDirect.splice(customer.originalIndex, 1);
            }
            setDirectCustomers(updatedDirect);
            localStorage.setItem('abecsa_direct_customers', JSON.stringify(updatedDirect));
        } else {
            const managersWithRemoved = managers.map(m => {
                if (m.userId === customer.managerId) {
                    const newSales = m.websitesSold.filter((_, i) => i !== customer.originalIndex);
                    return { ...m, websitesSold: newSales };
                }
                return m;
            });
            setManagers(managersWithRemoved);
            localStorage.setItem('abecsa_managers', JSON.stringify(managersWithRemoved));
        }

        // --- 2. ADD TO TARGET ---
        const customerData = {
            customerName: customer.customerName,
            siteName: customer.siteName,
            loginId: customer.loginId,
            password: customer.password,
            dateSold: customer.dateSold || new Date().toISOString().split('T')[0],
            status: customer.status
        };

        if (reassignTarget === 'DIRECT') {
            // Add to Direct Customers
            // Create a new user entry for simplicity
            const newDirectUser = {
                name: customerData.customerName,
                userId: customerData.loginId,
                password: customerData.password,
                role: 'customer',
                websites: [{
                    name: customerData.siteName,
                    status: customerData.status,
                    createdAt: customerData.dateSold
                }]
            };
            const updatedDirect = [...directCustomers, newDirectUser];
            setDirectCustomers(updatedDirect);
            localStorage.setItem('abecsa_direct_customers', JSON.stringify(updatedDirect));

        } else {
            // Add to Manager
             const finalManagers = (customer.isDirect ? managers : managers).map(m => {
                // If we already updated managers (in step 1), use the current state, otherwise we need to rely on the state passed to setManagers which isn't immediate.
                // NOTE: This logic has a state race condition because we call setManagers twice if moving Manager->Manager. 
                // Better to handle the "ManagersWithRemoved" variable if source was manager.
                 if (m.userId === reassignTarget) {
                     return { ...m, websitesSold: [...(m.websitesSold || []), customerData] };
                 }
                 return m;
             });
             
             // If source was manager, we need to apply the "Add" on top of the "Remove"
             if (!customer.isDirect) {
                 const managersRemoved = managers.map(m => {
                    if (m.userId === customer.managerId) {
                        const newSales = m.websitesSold.filter((_, i) => i !== customer.originalIndex);
                        return { ...m, websitesSold: newSales };
                    }
                    return m;
                });
                
                const final = managersRemoved.map(m => {
                    if (m.userId === reassignTarget) {
                        return { ...m, websitesSold: [...(m.websitesSold || []), customerData] };
                    }
                    return m;
                });
                setManagers(final);
                localStorage.setItem('abecsa_managers', JSON.stringify(final));
             } else {
                 setManagers(finalManagers);
                 localStorage.setItem('abecsa_managers', JSON.stringify(finalManagers));
             }
        }
        setReassignTarget('');
    };

    const handleDeleteGlobal = (customer) => {
        if (window.confirm(`Delete customer ${customer.siteName}?`)) {
            if (customer.isDirect) {
                const updatedDirect = [...directCustomers];
                const user = updatedDirect[customer.originalIndex];
                user.websites = user.websites.filter((_, i) => i !== customer.siteIndex);
                if (user.websites.length === 0) {
                     updatedDirect.splice(customer.originalIndex, 1);
                }
                setDirectCustomers(updatedDirect);
                localStorage.setItem('abecsa_direct_customers', JSON.stringify(updatedDirect));
            } else {
                const updatedManagers = managers.map(m => {
                    if (m.userId === customer.managerId) {
                        const newSales = m.websitesSold.filter((_, i) => i !== customer.originalIndex);
                        return { ...m, websitesSold: newSales };
                    }
                    return m;
                });
                setManagers(updatedManagers);
                localStorage.setItem('abecsa_managers', JSON.stringify(updatedManagers));
            }
        }
    };

    const handleGlobalAdd = (e) => {
        e.preventDefault();
        if (!newGlobalSale.managerId) {
            alert("Please select a manager");
            return;
        }

        if (newGlobalSale.managerId === 'DIRECT') {
             const newDirectUser = {
                name: newGlobalSale.customerName,
                userId: newGlobalSale.loginId,
                password: newGlobalSale.password,
                role: 'customer',
                websites: [{
                    name: newGlobalSale.siteName,
                    status: newGlobalSale.status,
                    createdAt: newGlobalSale.dateSold
                }]
            };
            const updatedDirect = [...directCustomers, newDirectUser];
            setDirectCustomers(updatedDirect);
            localStorage.setItem('abecsa_direct_customers', JSON.stringify(updatedDirect));
        } else {
            const updatedManagers = managers.map(m => {
                if (m.userId === newGlobalSale.managerId) {
                    const saleData = {
                        customerName: newGlobalSale.customerName,
                        siteName: newGlobalSale.siteName,
                        loginId: newGlobalSale.loginId,
                        password: newGlobalSale.password,
                        dateSold: newGlobalSale.dateSold,
                        status: newGlobalSale.status
                    };
                    return { ...m, websitesSold: [...(m.websitesSold || []), saleData] };
                }
                return m;
            });
            setManagers(updatedManagers);
            localStorage.setItem('abecsa_managers', JSON.stringify(updatedManagers));
        }
        
        setNewGlobalSale({ ...newGlobalSale, customerName: '', siteName: '', loginId: '', password: '' });
    };

    // Auto-generate ID logic
    const updateGlobalAddManager = (managerId) => {
        if (managerId === 'DIRECT') {
            const count = directCustomers.length + 1;
             setNewGlobalSale({
                ...newGlobalSale,
                managerId: managerId,
                loginId: `cust${String(count).padStart(3, '0')}` // Different format for direct
            });
            return;
        }

        const manager = managers.find(m => m.userId === managerId);
        if (manager) {
            const count = (manager.websitesSold?.length || 0) + 1;
            setNewGlobalSale({
                ...newGlobalSale,
                managerId: managerId,
                loginId: `Abecsa${manager.userId}User${String(count).padStart(2, '0')}`
            });
        } else {
             setNewGlobalSale({ ...newGlobalSale, managerId: '' });
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.95)', zIndex: 2000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(5px)'
        }}>
            <div style={{
                background: '#0a0a0a', width: '95%', height: '95%',
                borderRadius: '25px', border: '1px solid #D4AF37',
                display: 'flex', flexDirection: 'column', padding: '2.5rem',
                boxShadow: '0 0 50px rgba(212, 175, 55, 0.2)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', paddingBottom: '1rem' }}>
                    <h2 style={{ margin: 0, color: '#D4AF37', display: 'flex', alignItems: 'center', gap: '1rem', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '1.8rem' }}><FaUsers /> Global Customer Master List</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer', opacity: 0.7, transition: 'opacity 0.2s' }} onMouseEnter={e => e.target.style.opacity=1} onMouseLeave={e => e.target.style.opacity=0.7}><FaTimes /></button>
                </div>

                {/* Add New Customer Section */}
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '15px', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h4 style={{ margin: '0 0 1rem 0', color: '#fff', fontWeight: 'normal', textTransform: 'uppercase', letterSpacing: '1px' }}><FaPlus size={12} style={{ color: '#D4AF37' }}/> New Entry</h4>
                    <form onSubmit={handleGlobalAdd} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                        <div style={{ flex: 1, minWidth: '150px' }}>
                             <span style={{ fontSize: '0.8rem', color: '#888', display: 'block', marginBottom: '5px', textTransform: 'uppercase' }}>Manager</span>
                             <select 
                                required
                                value={newGlobalSale.managerId}
                                onChange={(e) => updateGlobalAddManager(e.target.value)}
                                style={{ width: '100%', padding: '0.8rem', background: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
                             >
                                <option value="">Select Manager...</option>
                                <option value="DIRECT" style={{ color: '#00ff88', fontWeight: 'bold' }}>Abecsa Direct</option>
                                {managers.map(m => <option key={m.userId} value={m.userId}>{m.name}</option>)}
                             </select>
                        </div>
                        {/* ... Rest of form inputs same as before ... */}
                         <div style={{ flex: 1, minWidth: '150px' }}>
                             <span style={{ fontSize: '0.8rem', color: '#888', display: 'block', marginBottom: '5px', textTransform: 'uppercase' }}>Customer Name</span>
                             <input type="text" required value={newGlobalSale.customerName} onChange={e => setNewGlobalSale({...newGlobalSale, customerName: e.target.value})} style={{ width: '100%', padding: '0.8rem', background: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }} placeholder="John Doe" />
                        </div>
                        <div style={{ flex: 1, minWidth: '150px' }}>
                             <span style={{ fontSize: '0.8rem', color: '#888', display: 'block', marginBottom: '5px', textTransform: 'uppercase' }}>Site Name</span>
                             <input type="text" required value={newGlobalSale.siteName} onChange={e => setNewGlobalSale({...newGlobalSale, siteName: e.target.value})} style={{ width: '100%', padding: '0.8rem', background: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }} />
                        </div>
                        <div style={{ flex: 1, minWidth: '150px' }}>
                             <span style={{ fontSize: '0.8rem', color: '#888', display: 'block', marginBottom: '5px', textTransform: 'uppercase' }}>Login ID</span>
                             <input type="text" required value={newGlobalSale.loginId} onChange={e => setNewGlobalSale({...newGlobalSale, loginId: e.target.value})} style={{ width: '100%', padding: '0.8rem', background: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }} />
                        </div>
                        <div style={{ flex: 1, minWidth: '150px' }}>
                             <span style={{ fontSize: '0.8rem', color: '#888', display: 'block', marginBottom: '5px', textTransform: 'uppercase' }}>Password</span>
                             <input type="text" required value={newGlobalSale.password} onChange={e => setNewGlobalSale({...newGlobalSale, password: e.target.value})} style={{ width: '100%', padding: '0.8rem', background: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }} />
                        </div>
                         <div style={{ width: '120px' }}>
                             <span style={{ fontSize: '0.8rem', color: '#888', display: 'block', marginBottom: '5px', textTransform: 'uppercase' }}>Status</span>
                             <select value={newGlobalSale.status} onChange={e => setNewGlobalSale({...newGlobalSale, status: e.target.value})} style={{ width: '100%', padding: '0.8rem', background: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}>
                                <option value="Live">Live</option>
                                <option value="In Progress">Wait</option>
                                <option value="Expired">Exp</option>
                             </select>
                        </div>
                        <button type="submit" style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '0.8rem 2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Add</button>
                    </form>
                </div>

                <div style={{ flex: 1, overflowY: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: '#ddd', fontSize: '0.95rem' }}>
                        <thead>
                            <tr style={{ background: 'linear-gradient(90deg, #111, #222)', textAlign: 'left', borderBottom: '2px solid #D4AF37' }}>
                                <th style={{ padding: '1.2rem', color: '#888', textTransform: 'uppercase', fontSize: '0.8rem' }}>Manager</th>
                                <th style={{ padding: '1.2rem', color: '#888', textTransform: 'uppercase', fontSize: '0.8rem' }}>Customer Name</th>
                                <th style={{ padding: '1.2rem', color: '#888', textTransform: 'uppercase', fontSize: '0.8rem' }}>Site Name</th>
                                <th style={{ padding: '1.2rem', color: '#888', textTransform: 'uppercase', fontSize: '0.8rem' }}>Login ID</th>
                                <th style={{ padding: '1.2rem', color: '#888', textTransform: 'uppercase', fontSize: '0.8rem' }}>Password</th>
                                <th style={{ padding: '1.2rem', color: '#888', textTransform: 'uppercase', fontSize: '0.8rem' }}>Status</th>
                                <th style={{ padding: '1.2rem', color: '#888', textTransform: 'uppercase', fontSize: '0.8rem' }}>Actions</th>
                            </tr>
                        </thead>
                       <tbody>
                            {allCustomers.map((cust, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: idx % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
                                    <td style={{ padding: '1.2rem', color: cust.isDirect ? '#00ff88' : '#888', fontWeight: cust.isDirect ? 'bold' : 'normal' }}>{cust.managerName}</td>
                                    {/* ... Table Cells same as before, they use cust properties ... */}
                                    <td style={{ padding: '1.2rem' }}>
                                        {editingCustomer?.managerId === cust.managerId && editingCustomer?.originalIndex === cust.originalIndex && editingCustomer?.siteIndex === cust.siteIndex ? (
                                            <input value={editingCustomer.customerName} onChange={e => setEditingCustomer({...editingCustomer, customerName: e.target.value})} style={{ background: '#333', border: 'none', color: '#fff', padding: '0.5rem', width: '100%' }} />
                                        ) : (cust.customerName || '-')}
                                    </td>
                                    <td style={{ padding: '1.2rem' }}>
                                        {editingCustomer?.managerId === cust.managerId && editingCustomer?.originalIndex === cust.originalIndex && editingCustomer?.siteIndex === cust.siteIndex ? (
                                            <input value={editingCustomer.siteName} onChange={e => setEditingCustomer({...editingCustomer, siteName: e.target.value})} style={{ background: '#333', border: 'none', color: '#fff', padding: '0.5rem', width: '100%' }} />
                                        ) : cust.siteName}
                                    </td>
                                    <td style={{ padding: '1.2rem', color: '#fff' }}>
                                        {editingCustomer?.managerId === cust.managerId && editingCustomer?.originalIndex === cust.originalIndex && editingCustomer?.siteIndex === cust.siteIndex ? (
                                            <input value={editingCustomer.loginId} onChange={e => setEditingCustomer({...editingCustomer, loginId: e.target.value})} style={{ background: '#333', border: 'none', color: '#fff', padding: '0.5rem', width: '100%' }} />
                                        ) : cust.loginId}
                                    </td>
                                    <td style={{ padding: '1.2rem', fontFamily: 'monospace', color: '#aaa' }}>
                                        {editingCustomer?.managerId === cust.managerId && editingCustomer?.originalIndex === cust.originalIndex && editingCustomer?.siteIndex === cust.siteIndex ? (
                                            <input value={editingCustomer.password} onChange={e => setEditingCustomer({...editingCustomer, password: e.target.value})} style={{ background: '#333', border: 'none', color: '#fff', padding: '0.5rem', width: '100%' }} />
                                        ) : cust.password}
                                    </td>
                                    <td style={{ padding: '1.2rem' }}>
                                         {editingCustomer?.managerId === cust.managerId && editingCustomer?.originalIndex === cust.originalIndex && editingCustomer?.siteIndex === cust.siteIndex ? (
                                            <select value={editingCustomer.status} onChange={e => setEditingCustomer({...editingCustomer, status: e.target.value})} style={{ background: '#333', border: 'none', color: '#fff', padding: '0.5rem' }}>
                                                <option value="Live">Live</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Expired">Expired</option>
                                            </select>
                                        ) : (
                                            <span style={{ 
                                                padding: '4px 10px', 
                                                borderRadius: '20px',
                                                background: cust.status === 'Live' ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                                                color: cust.status === 'Live' ? '#00ff88' : '#aaa',
                                                fontSize: '0.8rem', fontWeight: 'bold'
                                            }}>
                                                {cust.status}
                                            </span>
                                        )}
                                    </td>
                                    <td style={{ padding: '1.2rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                        {editingCustomer?.managerId === cust.managerId && editingCustomer?.originalIndex === cust.originalIndex && editingCustomer?.siteIndex === cust.siteIndex ? (
                                            <>
                                                <button onClick={handleSaveEdit} style={{ background: '#00ff88', border: 'none', color: '#000', padding: '0.5rem 1rem', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Save</button>
                                                <button onClick={() => setEditingCustomer(null)} style={{ background: '#444', border: 'none', color: '#fff', padding: '0.5rem', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>
                                            </>
                                        ) : (
                                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                                <button onClick={() => setEditingCustomer(cust)} title="Edit" style={{ background: 'transparent', border: '1px solid #8a2be2', color: '#8a2be2', padding: '0.5rem', borderRadius: '5px', cursor: 'pointer' }}><FaEdit /></button>
                                                
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', background: '#333', padding: '2px', borderRadius: '5px' }}>
                                                    <select 
                                                        onChange={(e) => setReassignTarget(e.target.value)}
                                                        value=""
                                                        style={{ background: 'transparent', border: 'none', color: '#fff', padding: '0.4rem', borderRadius: '5px', width: '100px', fontSize: '0.8rem', cursor: 'pointer', outline: 'none' }}
                                                    >
                                                        <option value="">Move to...</option>
                                                        <option value="DIRECT" style={{ color: '#00ff88' }}>Abecsa Direct</option>
                                                        {managers.filter(m => m.userId !== cust.managerId).map(m => (
                                                            <option key={m.userId} value={m.userId}>{m.name}</option>
                                                        ))}
                                                    </select>
                                                    {reassignTarget && (
                                                        <button onClick={() => handleReassign(cust)} style={{ background: '#2b7de9', color: '#fff', border: 'none', padding: '0.4rem', borderRadius: '3px', cursor: 'pointer', fontSize: '0.8rem' }}>
                                                            <FaExchangeAlt />
                                                        </button>
                                                    )}
                                                </div>
                                                <button onClick={() => handleDeleteGlobal(cust)} title="Delete" style={{ background: 'transparent', border: '1px solid #ff4444', color: '#ff4444', padding: '0.5rem', borderRadius: '5px', cursor: 'pointer' }}><FaTrash /></button>
                                            </div>
                                        )}
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

// --- Managers List Component ---
const ManagersList = ({ managers, setManagers }) => {
    const navigate = useNavigate();
    const [newManager, setNewManager] = useState({ name: '', userId: '', password: '' });
    const [expandedManagerId, setExpandedManagerId] = useState(null);
    const [selectedManagerForSale, setSelectedManagerForSale] = useState(null);
    const [newSale, setNewSale] = useState({
        customerName: '', // New Field
        siteName: '',
        loginId: '',
        password: '',
        dateSold: new Date().toISOString().split('T')[0],
        status: 'Live'
    });

    const handleAddManager = (e) => {
        e.preventDefault();
        if (managers.some(m => m.userId === newManager.userId)) {
            alert('Manager ID already exists');
            return;
        }
        const managerToAdd = { ...newManager, role: 'marketing_manager', websitesSold: [] };
        const updatedManagers = [...managers, managerToAdd];
        setManagers(updatedManagers);
         localStorage.setItem('abecsa_managers', JSON.stringify(updatedManagers));
        setNewManager({ name: '', userId: '', password: '' });
    };

    const handleRemoveManager = (id) => {
        if (window.confirm('Remove this manager?')) {
            const updatedManagers = managers.filter(m => m.userId !== id);
            setManagers(updatedManagers);
            localStorage.setItem('abecsa_managers', JSON.stringify(updatedManagers));
        }
    };

    const handleViewAsManager = (manager) => {
        localStorage.setItem('currentUser', JSON.stringify(manager));
        navigate('/manager-dashboard');
    };

    const openAddSaleModal = (manager) => {
        setSelectedManagerForSale(manager);
        const count = (manager.websitesSold?.length || 0) + 1;
        setNewSale({
            customerName: '', // Reset
            siteName: '',
            loginId: `Abecsa${manager.userId}User${String(count).padStart(2, '0')}`,
            password: '',
            dateSold: new Date().toISOString().split('T')[0],
            status: 'Live'
        });
    };

    const handleAddSale = (e) => {
        e.preventDefault();
        if (!selectedManagerForSale) return;
        const updatedManagers = managers.map(m => {
            if (m.userId === selectedManagerForSale.userId) {
                const updatedSales = [...(m.websitesSold || []), newSale];
                return { ...m, websitesSold: updatedSales };
            }
            return m;
        });
        setManagers(updatedManagers);
        localStorage.setItem('abecsa_managers', JSON.stringify(updatedManagers));
        setSelectedManagerForSale(null);
    };

    const handleDeleteSale = (managerId, saleIndex) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            const updatedManagers = managers.map(m => {
                if (m.userId === managerId) {
                    const newSales = [...m.websitesSold];
                    newSales.splice(saleIndex, 1);
                    return { ...m, websitesSold: newSales };
                }
                return m;
            });
            setManagers(updatedManagers);
            localStorage.setItem('abecsa_managers', JSON.stringify(updatedManagers));
        }
    };

    return (
        <div>
            {/* ... List Logic ... */}
             <div style={{ marginBottom: '2rem' }}>
               <h3 style={{ fontSize: '1rem', marginBottom: '1.5rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Managers</h3>
               {managers.map((m) => (
                 <div key={m.userId} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1.5rem', marginBottom: '1rem', borderRadius: '15px', display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.05)', transition: 'all 0.2s', boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(138, 43, 226, 0.3)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                       <div>
                           <span style={{ fontWeight: 'bold', fontSize: '1.3rem', color: '#fff' }}>{m.name}</span>
                           <div style={{ fontSize: '0.9rem', color: '#aaa', marginTop: '0.2rem' }}>ID: <span style={{ fontFamily: 'monospace', color: '#8a2be2' }}>{m.userId}</span></div>
                           <div style={{ fontSize: '0.9rem', color: '#aaa' }}>Sold: <span style={{ color: '#00ff88', fontWeight: 'bold' }}>{m.websitesSold ? m.websitesSold.length : 0}</span> sites</div>
                       </div>
                       <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                           <button onClick={() => setExpandedManagerId(expandedManagerId === m.userId ? null : m.userId)} style={{ background: 'transparent', border: '1px solid #8a2be2', color: '#8a2be2', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem', transition: 'all 0.2s' }} onMouseEnter={e => {e.target.style.background = '#8a2be2'; e.target.style.color = '#fff'}} onMouseLeave={e => {e.target.style.background = 'transparent'; e.target.style.color = '#8a2be2'}}>
                             {expandedManagerId === m.userId ? 'Hide Customers' : 'Show Customers'}
                           </button>
                           <button onClick={() => openAddSaleModal(m)} style={{ background: '#D4AF37', border: 'none', color: '#000', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}><FaPlus size={12} /> Add Sale</button>
                           <button onClick={() => handleViewAsManager(m)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s' }} title="View Dashboard" onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.2)'} onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.1)'}><FaGlobe /></button>
                           <button onClick={() => handleRemoveManager(m.userId)} style={{ background: 'transparent', border: 'none', color: '#666', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#ff4444'} onMouseLeave={e => e.target.style.color = '#666'}><FaTrash /></button>
                       </div>
                   </div>
                   
                   {expandedManagerId === m.userId && (
                       <div style={{ background: 'rgba(0,0,0,0.5)', padding: '1.5rem', borderRadius: '12px', overflowX: 'auto', border: '1px solid rgba(255,255,255,0.05)' }}>
                           <h4 style={{ margin: '0 0 1rem 0', color: '#ddd', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Customer List</h4>
                           {(!m.websitesSold || m.websitesSold.length === 0) ? (<div style={{ color: '#666', fontStyle: 'italic' }}>No customers yet.</div>) : (
                               <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', color: '#ccc' }}>
                                   <thead>
                                       <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                                           <th style={{ padding: '0.8rem', color: '#8a2be2' }}>Customer Name</th>
                                           <th style={{ padding: '0.8rem', color: '#8a2be2' }}>Site Name</th><th style={{ padding: '0.8rem', color: '#8a2be2' }}>Login ID</th><th style={{ padding: '0.8rem', color: '#8a2be2' }}>Password</th><th style={{ padding: '0.8rem', color: '#8a2be2' }}>Status</th><th style={{ padding: '0.8rem', color: '#8a2be2' }}>Action</th>
                                       </tr>
                                   </thead>
                                   <tbody>
                                       {m.websitesSold.map((sale, idx) => (
                                           <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                               <td style={{ padding: '0.8rem' }}>{sale.customerName || '-'}</td>
                                               <td style={{ padding: '0.8rem' }}>{sale.siteName}</td>
                                               <td style={{ padding: '0.8rem', color: '#fff', fontWeight: 'bold' }}>{sale.loginId}</td>
                                               <td style={{ padding: '0.8rem', fontFamily: 'monospace', color: '#aaa' }}>{sale.password}</td>
                                               <td style={{ padding: '0.8rem' }}><span style={{ padding: '4px 8px', borderRadius: '4px', background: sale.status === 'Live' ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 255, 255, 0.05)', color: sale.status === 'Live' ? '#00ff88' : '#aaa', fontSize: '0.8rem', fontWeight: 'bold' }}>{sale.status}</span></td>
                                               <td style={{ padding: '0.8rem' }}><button onClick={() => handleDeleteSale(m.userId, idx)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', opacity: 0.7 }} onMouseEnter={e => e.target.style.opacity=1} onMouseLeave={e => e.target.style.opacity=0.7}><FaTrash size={12} /></button></td>
                                           </tr>
                                       ))}
                                   </tbody>
                               </table>
                           )}
                       </div>
                   )}
                 </div>
               ))}
            </div>

            {/* Add Manager Form */}
            <div>
               <h3 style={{ fontSize: '1rem', marginBottom: '1.5rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Add Manager</h3>
               <form onSubmit={handleAddManager} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                 <input type="text" placeholder="Manager Name" required value={newManager.name} onChange={(e) => setNewManager({...newManager, name: e.target.value})} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '10px', color: '#fff', outline: 'none' }} />
                 <div style={{ display: 'flex', gap: '1rem' }}>
                   <input type="text" placeholder="User ID (e.g. MM002)" required value={newManager.userId} onChange={(e) => setNewManager({...newManager, userId: e.target.value})} style={{ flex: 1, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '10px', color: '#fff', outline: 'none' }} />
                   <input type="text" placeholder="Password" required value={newManager.password} onChange={(e) => setNewManager({...newManager, password: e.target.value})} style={{ flex: 1, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '10px', color: '#fff', outline: 'none' }} />
                 </div>
                 <button type="submit" style={{ background: 'rgba(138, 43, 226, 0.1)', color: '#8a2be2', border: '1px solid rgba(138, 43, 226, 0.3)', padding: '1rem', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem', transition: 'all 0.3s' }} onMouseEnter={e => {e.target.style.background = '#8a2be2'; e.target.style.color='#fff'}} onMouseLeave={e => {e.target.style.background = 'rgba(138, 43, 226, 0.1)'; e.target.style.color='#8a2be2'}}><FaPlus /> Add Manager</button>
               </form>
             </div>

             {/* Add Sale Modal */}
             {selectedManagerForSale && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: '#111', padding: '2.5rem', borderRadius: '20px', width: '90%', maxWidth: '500px', border: '1px solid rgba(212, 175, 55, 0.2)', boxShadow: '0 20px 50px rgba(0,0,0,0.7)' }}>
                        <h3 style={{ marginTop: 0, color: '#D4AF37', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem', fontSize: '1.5rem' }}>Add Customer</h3>
                        <div style={{ marginBottom: '1.5rem', color: '#888', fontSize: '0.9rem' }}>Adding for Manager: <span style={{ color: '#fff' }}>{selectedManagerForSale.name}</span></div>
                        
                        <form onSubmit={handleAddSale} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <div><label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Customer Name</label><input type="text" required value={newSale.customerName} onChange={(e) => setNewSale({...newSale, customerName: e.target.value})} style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', outline: 'none' }} placeholder="John Doe" /></div>
                            <div><label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Website / Business</label><input type="text" required value={newSale.siteName} onChange={(e) => setNewSale({...newSale, siteName: e.target.value})} style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', outline: 'none' }} /></div>
                            <div><label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Login ID (Auto)</label><input type="text" required value={newSale.loginId} onChange={(e) => setNewSale({...newSale, loginId: e.target.value})} style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', outline: 'none' }} /></div>
                            <div><label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Password</label><input type="text" required value={newSale.password} onChange={(e) => setNewSale({...newSale, password: e.target.value})} style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', outline: 'none' }} /></div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ flex: 1 }}><label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date Sold</label><input type="date" required value={newSale.dateSold} onChange={(e) => setNewSale({...newSale, dateSold: e.target.value})} style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', outline: 'none' }} /></div>
                                <div style={{ flex: 1 }}><label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</label><select value={newSale.status} onChange={(e) => setNewSale({...newSale, status: e.target.value})} style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', outline: 'none' }}><option value="Live" style={{background:'#000'}}>Live</option><option value="In Progress" style={{background:'#000'}}>In Progress</option><option value="Expired" style={{background:'#000'}}>Expired</option></select></div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                <button type="button" onClick={() => setSelectedManagerForSale(null)} style={{ flex: 1, padding: '1rem', background: 'transparent', border: '1px solid #444', color: '#ccc', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => {e.target.style.borderColor='#fff'; e.target.style.color='#fff'}} onMouseLeave={e => {e.target.style.borderColor='#444'; e.target.style.color='#ccc'}}>Cancel</button>
                                <button type="submit" style={{ flex: 1, padding: '1rem', background: '#D4AF37', border: 'none', color: '#000', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', transition: 'transform 0.2s' }} onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.target.style.transform = 'translateY(0)'}>Add Customer</button>
                            </div>
                        </form>
                    </div>
                </div>
             )}
        </div>
    );
};

// --- Main Admin Dashboard ---
const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ totalUsers: 0, activeWebsites: 0 });
    const [messages, setMessages] = useState([]);
    const [conversations, setConversations] = useState({});
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [replyMessage, setReplyMessage] = useState('');
    const [admins, setAdmins] = useState([]);
    const [newAdmin, setNewAdmin] = useState({ name: '', userId: '', password: '' });
    
    // Global Manager & Customer State
    const [managers, setManagers] = useState([]);
    const [directCustomers, setDirectCustomers] = useState([]); // New state for direct customers
    const [showGlobalList, setShowGlobalList] = useState(false);

    const chatContainerRef = useRef(null);

    // Initial Load
    useEffect(() => {
        // Load Managers
        const storedManagers = localStorage.getItem('abecsa_managers');
        if (storedManagers) {
            setManagers(JSON.parse(storedManagers));
        } else {
            const initialManagers = mockUsers.filter(u => u.role === 'marketing_manager');
            setManagers(initialManagers);
            localStorage.setItem('abecsa_managers', JSON.stringify(initialManagers));
        }
        
        // Load Direct Customers
        const storedDirect = localStorage.getItem('abecsa_direct_customers');
        if (storedDirect) {
            setDirectCustomers(JSON.parse(storedDirect));
        } else {
            // Seed from Mock Users if empty
            const initialDirect = mockUsers.filter(u => u.role === 'customer');
            setDirectCustomers(initialDirect);
            localStorage.setItem('abecsa_direct_customers', JSON.stringify(initialDirect));
        }
        
        loadAdmins();
        loadMessages();
    }, []);

    // ... (loadMessages, loadAdmins remain same) ...

    // Stats Calculation (Reactive)
    useEffect(() => {
        // Sum from Direct Customers
        const directSitesCount = directCustomers.reduce((acc, c) => acc + (c.websites?.filter(w => w.status === 'Live').length || 0), 0);
        
        // Sum up all sales from managers
        const managerSites = managers.reduce((acc, m) => acc + (m.websitesSold?.filter(w => w.status === 'Live').length || 0), 0);
        
        // Total "Customers" = Direct Users + Count of Manager Sales
        const totalCustomers = directCustomers.length + managers.reduce((acc, m) => acc + (m.websitesSold?.length || 0), 0);

        setStats({ 
            totalUsers: totalCustomers,
            activeWebsites: directSitesCount + managerSites 
        });
    }, [managers, directCustomers]); // Re-run when either changes


    // --- Helper Functions ---
    const loadAdmins = () => {
        const storedAdmins = localStorage.getItem('abecsa_admins');
        if (storedAdmins) {
            setAdmins(JSON.parse(storedAdmins));
        } else {
            const initialAdmins = mockUsers.filter(u => u.role === 'admin');
            setAdmins(initialAdmins);
            localStorage.setItem('abecsa_admins', JSON.stringify(initialAdmins));
        }
    };

    const loadMessages = () => {
        const storedMsgs = localStorage.getItem('abecsa_support_messages');
        if (storedMsgs) {
            const parsed = JSON.parse(storedMsgs);
            setMessages(parsed);
            
            // Re-build conversations map
            const convs = {};
            parsed.forEach(msg => {
                if (!convs[msg.customerId]) {
                    convs[msg.customerId] = {
                        customerId: msg.customerId,
                        customerName: msg.customerName,
                        lastMessage: msg.text,
                        timestamp: msg.timestamp
                    };
                } else {
                    if (new Date(msg.timestamp) > new Date(convs[msg.customerId].timestamp)) {
                        convs[msg.customerId].lastMessage = msg.text;
                        convs[msg.customerId].timestamp = msg.timestamp;
                    }
                }
            });
            setConversations(convs);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/');
    };

    const handleAddAdmin = (e) => {
        e.preventDefault();
        // Check if exists
        if (admins.some(a => a.userId === newAdmin.userId)) {
            alert("Admin ID already exists");
            return;
        }
        const updatedAdmins = [...admins, { ...newAdmin, role: 'admin' }];
        setAdmins(updatedAdmins);
        localStorage.setItem('abecsa_admins', JSON.stringify(updatedAdmins));
        setNewAdmin({ name: '', userId: '', password: '' });
    };

    const handleDeleteAdmin = (id) => {
        if (window.confirm('Delete this admin?')) {
            const updatedAdmins = admins.filter(a => a.userId !== id);
            setAdmins(updatedAdmins);
            localStorage.setItem('abecsa_admins', JSON.stringify(updatedAdmins));
        }
    };

    // --- Chat Handlers ---
    const handleSendReply = (e) => {
        e.preventDefault();
        if (!replyMessage.trim() || !selectedCustomerId) return;

        const newMsg = {
            id: Date.now(),
            customerId: selectedCustomerId,
            customerName: conversations[selectedCustomerId]?.customerName || 'Customer',
            text: replyMessage,
            sender: 'support',
            timestamp: new Date().toISOString()
        };

        const updatedMessages = [...messages, newMsg];
        setMessages(updatedMessages);
        localStorage.setItem('abecsa_support_messages', JSON.stringify(updatedMessages));
        setReplyMessage('');
        loadMessages(); // Refresh conversations
    };

    const handleClearChat = () => {
        if (!selectedCustomerId) return;
        if(window.confirm('Clear chat history with this customer?')) {
            const updatedMessages = messages.filter(m => m.customerId !== selectedCustomerId);
            setMessages(updatedMessages);
            localStorage.setItem('abecsa_support_messages', JSON.stringify(updatedMessages));
            setSelectedCustomerId(null);
            loadMessages();
        }
    };

    // Auto-scroll chat
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, selectedCustomerId]);

    // Polling for new messages
    useEffect(() => {
        const interval = setInterval(() => {
            loadMessages();
        }, 3000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div style={{ minHeight: '100vh', background: '#000000', color: '#eaeaea', padding: '2rem', paddingTop: '100px', fontFamily: "'Exo 2', sans-serif" }}>
            
            {showGlobalList && <GlobalCustomersModal 
                managers={managers} 
                setManagers={setManagers} 
                directCustomers={directCustomers}
                setDirectCustomers={setDirectCustomers}
                onClose={() => setShowGlobalList(false)} 
            />}

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.2rem', margin: 0, color: '#D4AF37', textShadow: '0 0 10px rgba(212, 175, 55, 0.5)' }}>Admin Dashboard</h1>
                    <span style={{ fontSize: '0.95rem', color: '#aaa', letterSpacing: '1px' }}>PREMIUM MANAGEMENT CONSOLE</span>
                </div>
                <button onClick={handleLogout} style={{ background: 'rgba(255, 0, 85, 0.1)', border: '1px solid #ff0055', color: '#ff0055', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.3s', fontWeight: 'bold' }}><FaSignOutAlt /> LOGOUT</button>
            </div>

            {/* Stats Row */}
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
                <div onClick={() => setShowGlobalList(true)} style={{ cursor: 'pointer', flex: 1, background: 'linear-gradient(145deg, rgba(20, 20, 20, 0.9), rgba(10, 10, 10, 0.95))', border: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: '20px', padding: '2.5rem', display: 'flex', alignItems: 'center', gap: '2rem', transition: 'all 0.3s', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} onMouseEnter={e => {e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor='#D4AF37'}} onMouseLeave={e => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor='rgba(212, 175, 55, 0.2)'}}>
                    <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '1rem', borderRadius: '50%' }}>
                        <FaUsers size={35} color="#D4AF37" />
                    </div>
                    <div><h3 style={{ margin: 0, fontSize: '3rem', color: '#fff', fontWeight: '300' }}>{stats.totalUsers}</h3><span style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>Global Customers</span></div>
                </div>

                <div style={{ flex: 1, background: 'linear-gradient(145deg, rgba(20, 20, 20, 0.9), rgba(10, 10, 10, 0.95))', border: '1px solid rgba(138, 43, 226, 0.2)', borderRadius: '20px', padding: '2.5rem', display: 'flex', alignItems: 'center', gap: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                     <div style={{ background: 'rgba(138, 43, 226, 0.1)', padding: '1rem', borderRadius: '50%' }}>
                        <FaGlobe size={35} color="#8a2be2" />
                    </div>
                    <div><h3 style={{ margin: 0, fontSize: '3rem', color: '#fff', fontWeight: '300' }}>{stats.activeWebsites}</h3><span style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>Active Projects</span></div>
                </div>
            </div>

            {/* Main Content Area */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '3rem' }}>
                
                {/* Support Chat */}
                {/* Support Chat */}
                <div style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ borderLeft: '4px solid #D4AF37', paddingLeft: '15px', marginBottom: '2rem', color: '#D4AF37', letterSpacing: '1px' }}><FaEnvelope style={{ marginRight: '10px', verticalAlign: 'middle' }} /> PRIORITY SUPPORT</h2>
                    <div style={{ background: 'rgba(15, 15, 15, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: '20px', height: '650px', display: 'flex', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.6)' }}>

                        <div style={{ width: '300px', borderRight: '1px solid rgba(212, 175, 55, 0.1)', overflowY: 'auto' }}>
                            <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(212, 175, 55, 0.1)', fontWeight: 'bold', color: '#D4AF37', letterSpacing: '1px' }}>INBOX</div>
                            {Object.keys(conversations).length === 0 ? (<div style={{ padding: '1.5rem', color: '#666', fontStyle: 'italic' }}>No active tickets</div>) : (Object.values(conversations).map((conv) => (
                                <div key={conv.customerId} onClick={() => setSelectedCustomerId(conv.customerId)} style={{ padding: '1.5rem', cursor: 'pointer', background: selectedCustomerId === conv.customerId ? 'rgba(212, 175, 55, 0.1)' : 'transparent', borderBottom: '1px solid rgba(255,255,255,0.02)', transition: 'all 0.2s', borderLeft: selectedCustomerId === conv.customerId ? '3px solid #D4AF37' : '3px solid transparent' }}>
                                    <div style={{ fontWeight: '600', color: selectedCustomerId === conv.customerId ? '#fff' : '#aaa', marginBottom: '0.4rem' }}>{conv.customerName}</div>
                                    <div style={{ fontSize: '0.85rem', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{conv.lastMessage}</div>
                                </div>
                            )))}
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.2)' }}>
                            {selectedCustomerId ? (
                                <>
                                    <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(212, 175, 55, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.05), transparent)' }}>
                                        <div><span style={{ color: '#666', fontSize: '0.9rem' }}>Chatting with</span> <strong style={{ color: '#fff', fontSize: '1.1rem' }}>{conversations[selectedCustomerId]?.customerName}</strong></div>
                                        <button onClick={handleClearChat} title="Clear Chat History" style={{ background: 'transparent', border: '1px solid rgba(255, 68, 68, 0.3)', color: '#ff4444', cursor: 'pointer', padding: '0.5rem 1rem', borderRadius: '5px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s' }}><FaTrash /> Clear</button>
                                    </div>
                                    <div ref={chatContainerRef} style={{ flex: 1, padding: '2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', scrollBehavior: 'smooth' }}>
                                        {messages.filter(m => m.customerId === selectedCustomerId).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)).map((msg, index) => (
                                            <div key={index} style={{ alignSelf: msg.sender === 'support' ? 'flex-end' : 'flex-start', maxWidth: '70%', background: msg.sender === 'support' ? 'linear-gradient(135deg, #D4AF37, #C5A028)' : 'rgba(255,255,255,0.08)', color: msg.sender === 'support' ? '#000' : '#ddd', padding: '1rem 1.5rem', borderRadius: msg.sender === 'support' ? '20px 20px 0 20px' : '20px 20px 20px 0', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}>
                                                <div style={{ fontSize: '1rem', lineHeight: '1.5' }}>{msg.text}</div>
                                                <div style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '0.5rem', textAlign: 'right', fontWeight: 'bold' }}>{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <form onSubmit={handleSendReply} style={{ padding: '1.5rem', borderTop: '1px solid rgba(212, 175, 55, 0.1)', display: 'flex', gap: '1rem' }}>
                                        <input type="text" placeholder="Type a premium reply..." value={replyMessage} onChange={(e) => setReplyMessage(e.target.value)} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '12px', color: '#fff', outline: 'none' }} />
                                        <button type="submit" style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '0 2rem', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)' }}>Send</button>
                                    </form>
                                </>
                            ) : (<div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#444' }}><FaEnvelope size={40} style={{ marginBottom: '1rem', opacity: 0.5 }} /><div>Select a conversation to start support</div></div>)}
                        </div>
                    </div>
                </div>

                {/* Admin Management */}
                <div style={{ flex: 1 }}>
                   <div style={{ marginBottom: '3rem' }}>
                      <h2 style={{ borderLeft: '4px solid #8a2be2', paddingLeft: '15px', marginBottom: '2rem', color: '#8a2be2', letterSpacing: '1px' }}>MARKETING MANAGERS</h2>
                      <div style={{ background: 'rgba(15, 15, 15, 0.8)', borderRadius: '20px', padding: '2rem', border: '1px solid rgba(138, 43, 226, 0.2)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                        <div style={{ marginBottom: '1rem' }}><div style={{ color: '#666', fontStyle: 'italic', marginBottom: '1rem', fontSize: '0.85rem' }}>(Managers are stored locally for this demo)</div></div>
                        <ManagersList managers={managers} setManagers={setManagers} />
                      </div>
                   </div>

                   <h2 style={{ borderLeft: '4px solid #ff0055', paddingLeft: '15px', marginBottom: '2rem', color: '#ff0055', letterSpacing: '1px' }}>SYSTEM ADMINS</h2>
                   <div style={{ background: 'rgba(15, 15, 15, 0.8)', borderRadius: '20px', padding: '2rem', border: '1px solid rgba(255, 0, 85, 0.2)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                     <div style={{ marginBottom: '2rem' }}>
                       <h3 style={{ fontSize: '1rem', marginBottom: '1.5rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Admins</h3>
                       {admins.map((admin) => (
                         <div key={admin.userId} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', marginBottom: '0.8rem', borderRadius: '12px', alignItems: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                           <div><span style={{ fontWeight: 'bold', display: 'block', color: '#fff', fontSize: '1.1rem' }}>{admin.name}</span> <span style={{ fontFamily: 'monospace', color: '#ff0055', background: 'rgba(255, 0, 85, 0.1)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>{admin.userId}</span></div>
                           <button onClick={() => handleDeleteAdmin(admin.userId)} style={{ background: 'transparent', border: 'none', color: '#666', cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#ff4444'} onMouseLeave={e => e.currentTarget.style.color = '#666'}><FaTrash /></button>
                         </div>
                       ))}
                     </div>
                     <div>
                       <h3 style={{ fontSize: '1rem', marginBottom: '1.5rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Add New Admin</h3>
                       <form onSubmit={handleAddAdmin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                         <input type="text" placeholder="Name" required value={newAdmin.name} onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '10px', color: '#fff', outline: 'none' }} />
                         <div style={{ display: 'flex', gap: '1rem' }}>
                           <input type="text" placeholder="User ID" required value={newAdmin.userId} onChange={(e) => setNewAdmin({...newAdmin, userId: e.target.value})} style={{ flex: 1, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '10px', color: '#fff', outline: 'none' }} />
                           <input type="text" placeholder="Password" required value={newAdmin.password} onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})} style={{ flex: 1, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '10px', color: '#fff', outline: 'none' }} />
                         </div>
                         <button type="submit" style={{ background: 'rgba(255, 0, 85, 0.1)', color: '#ff0055', border: '1px solid rgba(255, 0, 85, 0.3)', padding: '1rem', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem', transition: 'all 0.3s' }} onMouseEnter={e => {e.currentTarget.style.background = '#ff0055'; e.currentTarget.style.color='#fff'}} onMouseLeave={e => {e.currentTarget.style.background = 'rgba(255, 0, 85, 0.1)'; e.currentTarget.style.color='#ff0055'}}><FaPlus /> Create System Admin</button>
                       </form>
                     </div>
                   </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
