import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaChartLine, FaUsers, FaGlobe } from 'react-icons/fa';
import '../styles/global.css';
import { supabase } from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';

const MarketingManagerDashboard = ({ managerId }) => {
  const navigate = useNavigate();
  const { user, profile, signOut, loading } = useAuth();
  const [websitesSold, setWebsitesSold] = useState([]);
  const [assignedCustomers, setAssignedCustomers] = useState([]);
  const [managerName, setManagerName] = useState('');



  useEffect(() => {
     // If managerId is passed (Admin viewing), use it. Otherwise use logged in user.
     const targetId = managerId || user?.id;
     if (!targetId) return;

     const fetchMyData = async () => {
          // Fetch Sales (Websites)
          const { data: sales, error: salesError } = await supabase
              .from('websites')
              .select('*')
              .eq('manager_id', targetId);
          
          if (!salesError) setWebsitesSold(sales || []);

          // Fetch Assigned Customers
          const { data: clients, error: clientsError } = await supabase
              .from('profiles')
              .select('*')
              .eq('manager_id', targetId);

          if (!clientsError) setAssignedCustomers(clients || []);

          // If impersonating (Admin View), fetch Manager's Name
          if (managerId) {
             const { data: mgrProfile } = await supabase.from('profiles').select('full_name').eq('id', managerId).single();
             if (mgrProfile) setManagerName(mgrProfile.full_name);
          }
      };

      fetchMyData();
  }, [user, managerId]);


  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  if (loading || !profile) return <div style={{ color: '#fff', padding: '2rem' }}>Loading...</div>;

  const totalSold = websitesSold.length;
  const liveCount = websitesSold.filter(w => w.status === 'Live').length;

  return (

    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] text-slate-900 dark:text-white transition-colors duration-300 pt-[100px] px-4 md:px-[5%] pb-8 font-body">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-12 border-b border-gray-200 dark:border-white/10 pb-4">
        <div>
          <h1 className="text-3xl font-bold m-0 text-purple-600 dark:text-[#bc13fe]">Abecsa Empower Dashboard</h1>
          <span className="text-sm text-slate-500 dark:text-gray-400">
            Welcome back, {managerId ? (managerName || 'Loading...') : (profile ? profile.full_name : '')}
          </span>
        </div>
        <button 
          onClick={handleLogout}
          className="bg-transparent border border-red-500 text-red-500 dark:text-[#ff0055] dark:border-[#ff0055] px-3 py-1 text-sm rounded-md cursor-pointer flex items-center gap-2 transition-all duration-300 hover:bg-red-500 hover:text-white"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Stats Row */}
      <div className="flex flex-wrap gap-8 mb-12">
        <div className="flex-1 bg-purple-50 dark:bg-[#bc13fe]/5 border border-purple-200 dark:border-[#bc13fe]/30 rounded-2xl p-8 flex items-center gap-6 min-w-[250px]">
          <FaChartLine size={40} className="text-purple-600 dark:text-[#bc13fe]" />
          <div>
            <h3 className="m-0 text-4xl font-bold text-slate-800 dark:text-white">{totalSold}</h3>
            <span className="text-slate-500 dark:text-gray-400">Total Sales</span>
          </div>
        </div>

        <div className="flex-1 bg-green-50 dark:bg-[#00ff88]/5 border border-green-200 dark:border-[#00ff88]/30 rounded-2xl p-8 flex items-center gap-6 min-w-[250px]">
          <FaGlobe size={40} className="text-green-600 dark:text-[#00ff88]" />
          <div>
            <h3 className="m-0 text-4xl font-bold text-slate-800 dark:text-white">{liveCount}</h3>
            <span className="text-slate-500 dark:text-gray-400">Live Websites</span>
          </div>
        </div>

         <div className="flex-1 bg-yellow-50 dark:bg-[#D4AF37]/5 border border-yellow-200 dark:border-[#D4AF37]/30 rounded-2xl p-8 flex items-center gap-6 min-w-[250px]">
          <FaUsers size={40} className="text-yellow-600 dark:text-[#D4AF37]" />
          <div>
            <h3 className="m-0 text-4xl font-bold text-slate-800 dark:text-white">{assignedCustomers.length}</h3>
            <span className="text-slate-500 dark:text-gray-400">Assigned Clients</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Websites List */}
          <div>
            <h2 className="border-l-4 border-purple-600 dark:border-[#bc13fe] pl-4 mb-6 flex items-center font-bold text-xl text-slate-800 dark:text-white">
              <FaGlobe className="mr-3" />
              Sold Websites
            </h2>
            
            <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
              <table className="w-full border-collapse text-left min-w-[500px]">
                <thead className="bg-gray-50 dark:bg-black/30 text-slate-700 dark:text-white">
                  <tr>
                    <th className="p-4 border-b border-gray-200 dark:border-white/10 whitespace-nowrap">Website Name</th>
                    <th className="p-4 border-b border-gray-200 dark:border-white/10 whitespace-nowrap">URL</th>
                    <th className="p-4 border-b border-gray-200 dark:border-white/10 whitespace-nowrap">Status</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600 dark:text-gray-300">
                  {websitesSold.length === 0 ? (
                    <tr>
                       <td colSpan="3" className="p-8 text-center text-slate-400">No websites found.</td>
                    </tr>
                  ) : (
                    websitesSold.map((site, index) => (
                      <tr key={index} className="border-b border-gray-200 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <td className="p-4 font-bold text-slate-800 dark:text-white whitespace-nowrap">{site.name}</td>
                        <td className="p-4 whitespace-nowrap"><a href={site.url} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{site.url || '-'}</a></td>
                        <td className="p-4 whitespace-nowrap">
                          <span className={`
                             px-3 py-1 rounded-full text-xs font-bold border whitespace-nowrap inline-block
                             ${site.status === 'Live' ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-[#00ff88] dark:border-[#00ff88]' : 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-500/10 dark:text-[#f5b700] dark:border-[#f5b700]'}
                          `}>
                            {site.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Assigned Clients List */}
          <div>
            <h2 className="border-l-4 border-yellow-500 dark:border-[#D4AF37] pl-4 mb-6 flex items-center font-bold text-xl text-yellow-600 dark:text-[#D4AF37]">
              <FaUsers className="mr-3" />
              Assigned Clients
            </h2>
            
            <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
              <table className="w-full border-collapse text-left min-w-[500px]">
                <thead className="bg-gray-50 dark:bg-black/30 text-slate-700 dark:text-white">
                  <tr>
                    <th className="p-4 border-b border-gray-200 dark:border-white/10 whitespace-nowrap">Name</th>
                    <th className="p-4 border-b border-gray-200 dark:border-white/10 whitespace-nowrap">Email</th>
                    <th className="p-4 border-b border-gray-200 dark:border-white/10 whitespace-nowrap">Role</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600 dark:text-gray-300">
                  {assignedCustomers.length === 0 ? (
                    <tr>
                       <td colSpan="3" className="p-8 text-center text-slate-400">No clients assigned yet.</td>
                    </tr>
                  ) : (
                    assignedCustomers.map((client, index) => (
                      <tr key={index} className="border-b border-gray-200 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <td className="p-4 font-bold text-slate-800 dark:text-white whitespace-nowrap">{client.full_name}</td>
                        <td className="p-4 whitespace-nowrap">{client.email}</td>
                        <td className="p-4 whitespace-nowrap">
                            <span className="bg-gray-200 dark:bg-[#333] text-slate-700 dark:text-white px-2 py-1 rounded text-xs uppercase font-bold tracking-wider whitespace-nowrap inline-block">
                                {client.role.replace('_', ' ')}
                            </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

      </div>

    </div>
  );
};

export default MarketingManagerDashboard;
