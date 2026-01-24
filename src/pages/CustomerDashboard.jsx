import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaExternalLinkAlt, FaPaperPlane, FaUserCircle, FaCircle, FaCertificate, FaFileContract, FaCopy, FaEye, FaImage } from 'react-icons/fa';
import '../styles/global.css';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { user, profile, signOut, loading } = useAuth();
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [websites, setWebsites] = useState([]);
  const [assets, setAssets] = useState([]);
  const [customerName, setCustomerName] = useState('');
  
  const chatContainerRef = useRef(null);



  // Fetch Data (Websites, Messages & Profile Name)
  useEffect(() => {
    if (!user) return;

    // 0. Fetch Profile Name (Directly to ensure it appears)
    const fetchProfileName = async () => {
        const { data } = await supabase.from('profiles').select('full_name').eq('id', user.id).single();
        if (data && data.full_name) setCustomerName(data.full_name);
    };
    fetchProfileName();

    // 1. Fetch Websites
    const fetchWebsites = async () => {
      const { data, error } = await supabase
        .from('websites')
        .select('*')
        .eq('user_id', user.id);
      
      if (!error) setWebsites(data || []);
    };

    // 2. Fetch Messages (Conversation ID = User ID)
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', user.id) // Filter by this customer's thread
        .order('created_at', { ascending: true });

      if (!error && data) {
         setChatHistory(data);
      } else if (!data || data.length === 0) {
         // Default welcome (local only, don't save to DB to save space)
         setChatHistory([{ 
             id: 'welcome', 
             sender_id: 'support', 
             content: 'Welcome to ABECSA Support! How can we help you today?',
             created_at: new Date().toISOString()
         }]);
      }
    };

    const fetchAssets = async () => {
      const { data, error } = await supabase
        .from('user_assets')
        .select('*')
        .eq('user_id', user.id);
      
      if (!error) setAssets(data || []);
    };

    fetchWebsites();
    fetchAssets();
    fetchMessages();

    // 3. Realtime Subscription
    const channel = supabase
      .channel('public:messages')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${user.id}` }, 
        (payload) => {
          setChatHistory(prev => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  // Auto-scroll
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatHistory]);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const text = message;
    setMessage(''); // Optimistic clear

    const { error } = await supabase
      .from('messages')
      .insert([{
        sender_id: user.id,
        conversation_id: user.id, // This defines the "Chat Room" as the User's ID
        content: text
      }]);

    if (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    }
  };

  if (loading || !user) return <div style={{color:'#fff', padding:'2rem'}}>Loading...</div>;

  return (

    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] text-slate-900 dark:text-white transition-colors duration-300 pt-[100px] px-8 font-body">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-12 border-b border-gray-200 dark:border-white/10 pb-4">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <FaUserCircle size={40} color="var(--primary-color)" />
          <div>
            <h1 className="text-2xl font-bold m-0 text-slate-800 dark:text-white">Welcome, {customerName || profile?.full_name || user.email}</h1>
            <span className="text-sm text-slate-500 dark:text-gray-400">Customer Dashboard</span>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="bg-transparent border border-red-500 text-red-500 dark:text-[#ff0055] dark:border-[#ff0055] px-4 py-2 rounded-md cursor-pointer flex items-center gap-2 transition-all duration-300 hover:bg-red-500 hover:text-white"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
        
        {/* Left Column: My Websites */}
        <div style={{ flex: 2 }}>
          <h2 style={{ borderLeft: '4px solid var(--primary-color)', paddingLeft: '10px', marginBottom: '1.5rem' }}>My Websites</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {websites.length === 0 ? (
               <div className="p-8 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl text-slate-500 dark:text-gray-400">
                 No websites found. Contact admin to link your projects.
               </div>
            ) : (
                websites.map((site) => (
                  <div key={site.id} className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <h3 className="m-0 mb-2 font-bold text-slate-800 dark:text-white">{site.name}</h3>
                      <p className="m-0 text-sm text-slate-500 dark:text-gray-400">Plan: <span className="text-blue-600 dark:text-blue-400">{site.plan}</span></p>
                      <p className="mt-2 m-0 text-xs text-slate-400 dark:text-gray-500">Expires: {site.expiry_date}</p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <div className={`
                        inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold
                        ${site.status === 'Live' 
                            ? 'bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-[#00ff88]' 
                            : 'bg-yellow-100 dark:bg-yellow-500/10 text-yellow-600 dark:text-[#ffaa00]'}
                      `}>
                        <FaCircle size={8} /> {site.status}
                      </div>
                      
                      {site.url && (
                        <a 
                          href={site.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white no-underline px-5 py-2.5 rounded-lg text-sm font-bold mt-2 transition-transform hover:-translate-y-0.5"
                        >
                          Visit Website <FaExternalLinkAlt size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Middle Column: My Assets (Licenses & Certificates) */}
        <div style={{ flex: 1.5 }}>
          <h2 style={{ borderLeft: '4px solid #ffaa00', paddingLeft: '10px', marginBottom: '1.5rem' }}>My Assets</h2>
          
          <div className="flex flex-col gap-6">
            {assets.length === 0 ? (
               <div className="p-8 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl text-slate-500 dark:text-gray-400">
                 No licenses or certificates found.
               </div>
            ) : (
                assets.map((asset) => (
                  <div key={asset.id} className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 relative overflow-hidden">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {asset.type === 'Certificate' ? 
                          <FaCertificate size={24} className="text-blue-500 dark:text-[#00d2ff]" /> : 
                          asset.type === 'Image' ? <FaImage size={24} className="text-green-500 dark:text-[#00ff88]" /> :
                          <FaFileContract size={24} className="text-yellow-500 dark:text-[#ffaa00]" />
                        }
                        <h3 className="m-0 text-slate-800 dark:text-white text-lg font-bold">{asset.name}</h3>
                      </div>
                      <span className="text-xs bg-gray-100 dark:bg-white/10 px-2.5 py-1 rounded-md text-slate-500 dark:text-gray-400 uppercase font-bold tracking-wider">
                        {asset.type}
                      </span>
                    </div>

                    {asset.type === 'Image' ? (
                        <div className="text-center bg-gray-50 dark:bg-black/30 p-4 rounded-lg">
                           <img src={asset.value} alt={asset.name} className="max-w-full max-h-[200px] rounded border border-gray-200 dark:border-gray-800" />
                           <br/>
                           <a href={asset.value} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-green-600 dark:text-[#00ff88] text-sm hover:underline">View Full Size</a>
                        </div>
                    ) : (
                    <div className="bg-gray-50 dark:bg-black/30 p-4 rounded-lg flex justify-between items-center border border-dashed border-gray-300 dark:border-white/20">
                      <code className="text-slate-700 dark:text-white font-mono text-sm break-all">
                        {asset.type === 'License' ? asset.value : 'Certificate Available'}
                      </code>
                      
                      {asset.type === 'License' ? (
                        <button 
                          onClick={() => navigator.clipboard.writeText(asset.value)}
                          title="Copy License Key"
                          className="bg-transparent border-none text-yellow-600 dark:text-[#ffaa00] cursor-pointer hover:scale-110 transition-transform"
                        >
                          <FaCopy />
                        </button>
                      ) : (
                        <a 
                          href={asset.value} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-[#00d2ff] flex items-center gap-2 no-underline text-sm font-bold hover:underline"
                        >
                          View <FaEye />
                        </a>
                      )}
                    </div>
                    )}
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Right Column: Support Chat */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h2 style={{ borderLeft: '4px solid #bc13fe', paddingLeft: '10px', marginBottom: '1.5rem' }}>Support Chat</h2>
          
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl h-[400px] flex flex-col overflow-hidden">
            {/* Messages Area */}
            <div 
              ref={chatContainerRef}
              className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 scroll-smooth"
            >
              {chatHistory.map((msg, index) => {
                const isUser = msg.sender_id === user.id;
                return (
                  <div key={index} className={`
                    self-${isUser ? 'end' : 'start'}
                    max-w-[70%]
                    p-3 rounded-2xl shadow-sm
                    ${isUser 
                        ? 'bg-purple-600 text-white rounded-br-none' 
                        : 'bg-gray-100 dark:bg-white/10 text-slate-800 dark:text-white rounded-bl-none'}
                  `}>
                    <div className="text-sm">{msg.content}</div>
                    <div className="text-xs opacity-70 mt-1 text-right">
                       {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 bg-gray-50 dark:bg-black/20 border-t border-gray-200 dark:border-white/5 flex gap-2">
              <input 
                type="text" 
                placeholder="Type your message..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-transparent border border-gray-300 dark:border-white/20 rounded-full px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-purple-500"
              />
              <button 
                type="submit" 
                className="bg-purple-600 hover:bg-purple-700 text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors"
                title="Send Message"
              >
                <FaPaperPlane size={14} />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CustomerDashboard;
