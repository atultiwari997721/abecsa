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
  const [managerName, setManagerName] = useState('');

  useEffect(() => {
     // If managerId prop exists, we are in "Impersonation Mode" (Admin View), so skip check
     if (managerId) return;

     if (!loading && (!user || (profile && profile.role !== 'marketing_manager'))) {
          navigate('/login');
     }
  }, [user, profile, loading, navigate, managerId]);

  useEffect(() => {
     // If managerId is passed (Admin viewing), use it. Otherwise use logged in user.
     const targetId = managerId || user?.id;
     if (!targetId) return;

     const fetchMyData = async () => {
          // Fetch Sales
          const { data: sales, error: salesError } = await supabase
              .from('websites')
              .select('*')
              .eq('manager_id', targetId);
          
          if (!salesError) setWebsitesSold(sales || []);

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
    <div style={{ 
      minHeight: '100vh', 
      background: '#050505', 
      color: '#fff', 
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
          <h1 style={{ fontSize: '1.8rem', margin: 0, color: '#bc13fe' }}>Manager Dashboard</h1>
          <span style={{ fontSize: '0.9rem', color: '#888' }}>
            Welcome back, {managerId ? (managerName || 'Loading...') : (profile ? profile.full_name : '')}
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

      {/* Stats Row */}
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        <div style={{ 
          flex: 1, 
          background: 'linear-gradient(135deg, rgba(188, 19, 254, 0.1), rgba(188, 19, 254, 0.05))',
          border: '1px solid rgba(188, 19, 254, 0.3)',
          borderRadius: '15px',
          padding: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem'
        }}>
          <FaChartLine size={40} color="#bc13fe" />
          <div>
            <h3 style={{ margin: 0, fontSize: '2.5rem' }}>{totalSold}</h3>
            <span style={{ color: '#aaa' }}>Total Websites Sold</span>
          </div>
        </div>

        <div style={{ 
          flex: 1, 
          background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 255, 136, 0.05))',
          border: '1px solid rgba(0, 255, 136, 0.3)',
          borderRadius: '15px',
          padding: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem'
        }}>
          <FaGlobe size={40} color="#00ff88" />
          <div>
            <h3 style={{ margin: 0, fontSize: '2.5rem' }}>{liveCount}</h3>
            <span style={{ color: '#aaa' }}>Live Websites</span>
          </div>
        </div>
      </div>

      {/* Sales List Section */}
      <div>
        <h2 style={{ borderLeft: '4px solid #bc13fe', paddingLeft: '10px', marginBottom: '1.5rem' }}>
          <FaUsers style={{ marginRight: '10px', verticalAlign: 'middle' }} />
          My Sales
        </h2>
        
        <div style={{ 
          background: 'rgba(255,255,255,0.05)', 
          borderRadius: '15px', 
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.3)', textAlign: 'left' }}>
                <th style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Website / Client Name</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>URL</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {websitesSold.length === 0 ? (
                <tr>
                   <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>No sales found. Contact Admin to link your sales.</td>
                </tr>
              ) : (
                websitesSold.map((site, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>{site.name}</td>
                    <td style={{ padding: '1rem', color: '#aaa' }}><a href={site.url} style={{color:'#2b7de9'}} target="_blank" rel="noreferrer">{site.url || '-'}</a></td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                         padding: '0.3rem 0.8rem',
                         borderRadius: '20px',
                         fontSize: '0.8rem',
                         background: site.status === 'Live' ? 'rgba(0,255,136,0.1)' : 'rgba(245, 183, 0, 0.1)',
                         color: site.status === 'Live' ? '#00ff88' : '#f5b700',
                         border: `1px solid ${site.status === 'Live' ? '#00ff88' : '#f5b700'}`
                      }}>
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

    </div>
  );
};

export default MarketingManagerDashboard;
