import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaExternalLinkAlt, FaPaperPlane, FaUserCircle, FaCircle, FaCertificate, FaFileContract, FaCopy, FaEye, FaImage } from 'react-icons/fa';
import '../styles/global.css';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';

const CustomerDashboard = ({ customerId }) => {
  const navigate = useNavigate();
  const { user, profile, signOut, loading } = useAuth();
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [websites, setWebsites] = useState([]);
  const [assets, setAssets] = useState([]);
  const [exams, setExams] = useState([]);
  const [customerName, setCustomerName] = useState('');
  
  // Use passed customerId (admin view) or logged-in user id
  const targetUserId = customerId || user?.id;
  
  const chatContainerRef = useRef(null);



  // Fetch Data (Websites, Messages & Profile Name)
  useEffect(() => {
    if (!user) return;

    // 0. Fetch Profile Name
    const fetchProfileName = async () => {
        const { data } = await supabase.from('profiles').select('full_name').eq('id', targetUserId).single();
        if (data && data.full_name) setCustomerName(data.full_name);
    };
    fetchProfileName();

    // 1. Fetch Websites
    const fetchWebsites = async () => {
      const { data, error } = await supabase
        .from('websites')
        .select('*')
        .eq('user_id', targetUserId);
      
      if (!error) setWebsites(data || []);
    };

    // 2. Fetch Messages
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', targetUserId)
        .order('created_at', { ascending: true });

      if (!error && data) {
         setChatHistory(data);
      } else if (!data || data.length === 0) {
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
        .eq('user_id', targetUserId);
      
      if (!error) setAssets(data || []);
    };

    const fetchExams = async () => {
        if (profile?.role === 'student' || profile?.role === 'admin') {
            const { data, error } = await supabase.from('exams').select('*').order('start_time', { ascending: true });
            if (!error) setExams(data || []);
        }
    };

    fetchWebsites();
    fetchAssets();
    fetchMessages();
    fetchExams();

    // 3. Realtime Subscription (Only if not admin viewing, or handling complex logic later)
    // For now, disabling realtime for admin view to prevent confusion/bugs, or could keep it.
    const channel = supabase
      .channel('public:messages')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${targetUserId}` }, 
        (payload) => {
          setChatHistory(prev => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, targetUserId]);

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

    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] text-slate-900 dark:text-white transition-colors duration-300 pt-[100px] px-4 md:px-8 font-body">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-12 border-b border-gray-200 dark:border-white/10 pb-4">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <FaUserCircle size={40} color="var(--primary-color)" />
          <div>
            <h1 className="text-2xl font-bold m-0 text-slate-800 dark:text-white">
                {customerId ? `Viewing: ${customerName}` : `Welcome, ${customerName || profile?.full_name || user.email}`}
            </h1>
            <span className="text-sm text-slate-500 dark:text-gray-400">Customer Dashboard {customerId && '(Admin View)'}</span>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="bg-transparent border border-red-500 text-red-500 dark:text-[#ff0055] dark:border-[#ff0055] px-3 py-1 text-sm rounded-md cursor-pointer flex items-center gap-2 transition-all duration-300 hover:bg-red-500 hover:text-white"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left Column: My Websites */}
        <div className="xl:col-span-12 2xl:col-span-5 bg-white dark:bg-white/5 rounded-3xl p-6 border border-gray-200 dark:border-white/10 shadow-sm">
          <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-white border-l-4 border-blue-600 pl-4">My Websites</h2>
          
          <div className="flex flex-col gap-6">
            {websites.length === 0 ? (
               <div className="p-8 text-center bg-gray-50 dark:bg-white/5 rounded-2xl text-slate-500 dark:text-gray-400">
                 No websites found. Contact admin to link your projects.
               </div>
            ) : (
                websites.map((site) => (
                  <div key={site.id} className="bg-white dark:bg-black/20 border border-gray-100 dark:border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:shadow-md hover:border-blue-200 dark:hover:border-blue-500/20">
                    <div>
                      <h3 className="m-0 mb-2 text-lg font-bold text-slate-800 dark:text-white">{site.name}</h3>
                      <p className="m-0 text-sm text-slate-500 dark:text-gray-400">Plan: <span className="text-blue-600 dark:text-blue-400 font-semibold">{site.plan}</span></p>
                      <p className="mt-2 m-0 text-xs text-slate-400 dark:text-gray-500">Expires: {site.expiry_date}</p>
                    </div>
                    
                    <div className="flex flex-col items-start sm:items-end gap-3 w-full sm:w-auto">
                      <div className={`
                        inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold
                        ${site.status === 'Live' 
                            ? 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-[#00ff88]' 
                            : 'bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-[#ffaa00]'}
                      `}>
                        <FaCircle size={8} /> {site.status}
                      </div>
                      
                      {site.url && (
                        <a 
                          href={site.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white no-underline px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5 w-full sm:w-auto justify-center"
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

        {/* Exam Section for Students */}
        {(profile?.role === 'student' || profile?.role === 'admin') && (
            <div className="xl:col-span-12 bg-white dark:bg-white/5 rounded-3xl p-6 border border-gray-200 dark:border-white/10 shadow-sm">
                <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-white border-l-4 border-red-600 pl-4">My Exams / Tests</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {exams.length === 0 ? (
                        <div className="col-span-full p-8 text-center bg-gray-50 dark:bg-white/5 rounded-2xl text-slate-500 dark:text-gray-400">
                            No examinations scheduled at this time.
                        </div>
                    ) : (
                        exams.map(exam => {
                           const isLocked = profile?.is_locked;
                           const startTime = new Date(exam.start_time);
                           const isUpcoming = startTime > new Date();
                           
                           return (
                            <div key={exam.id} className="bg-white dark:bg-black/20 border border-gray-100 dark:border-white/5 rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-lg border-l-4 border-l-blue-500">
                                <div>
                                    <h3 className="text-lg font-bold mb-2">{exam.name}</h3>
                                    <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                                        <p className="flex items-center gap-2">Starts: {startTime.toLocaleString()}</p>
                                        <p className="flex items-center gap-2">Duration: {exam.duration_minutes} Minutes</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate(`/exam/${exam.id}`)}
                                    disabled={isLocked || isUpcoming}
                                    className={`mt-4 w-full py-3 rounded-xl font-bold transition-all ${
                                        isUpcoming ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
                                        isLocked ? 'bg-red-500/10 text-red-500 border border-red-500/20 cursor-not-allowed' :
                                        'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20'
                                    }`}
                                >
                                    {isUpcoming ? 'Coming Soon' : isLocked ? 'Account Locked' : 'Enter Exam Portal'}
                                </button>
                            </div>
                           );
                        })
                    )}
                </div>
            </div>
        )}

        {/* Middle Column: My Assets (Licenses & Certificates) */}
        <div className="xl:col-span-6 2xl:col-span-4 bg-white dark:bg-white/5 rounded-3xl p-6 border border-gray-200 dark:border-white/10 shadow-sm">
          <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-white border-l-4 border-yellow-500 pl-4">My Assets</h2>
          
          <div className="flex flex-col gap-6">
            {assets.length === 0 ? (
               <div className="p-8 text-center bg-gray-50 dark:bg-white/5 rounded-2xl text-slate-500 dark:text-gray-400">
                 No licenses or certificates found.
               </div>
            ) : (
                assets.map((asset) => (
                  <div key={asset.id} className="bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 rounded-2xl p-5 relative overflow-hidden group hover:border-yellow-500/30 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white dark:bg-white/5 rounded-lg shadow-sm">
                        {asset.type === 'Certificate' ? 
                          <FaCertificate size={20} className="text-blue-500 dark:text-[#00d2ff]" /> : 
                          asset.type === 'Image' ? <FaImage size={20} className="text-green-500 dark:text-[#00ff88]" /> :
                          <FaFileContract size={20} className="text-yellow-500 dark:text-[#ffaa00]" />
                        }
                        </div>
                        <h3 className="m-0 text-slate-800 dark:text-white text-base font-bold line-clamp-1">{asset.name}</h3>
                      </div>
                      <span className="text-[10px] bg-white dark:bg-white/10 px-2 py-1 rounded border border-gray-100 dark:border-white/5 text-slate-500 dark:text-gray-400 uppercase font-bold tracking-wider">
                        {asset.type}
                      </span>
                    </div>

                    {asset.type === 'Image' ? (
                        <div className="text-center rounded-xl overflow-hidden bg-white dark:bg-black/40">
                           <img src={asset.value} alt={asset.name} className="w-full h-32 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                           <a href={asset.value} target="_blank" rel="noopener noreferrer" className="block py-2 text-green-600 dark:text-[#00ff88] text-xs font-bold hover:underline bg-gray-50 dark:bg-white/5">View Full Size</a>
                        </div>
                    ) : (
                    <div className="bg-white dark:bg-black/40 p-3 rounded-xl flex justify-between items-center border border-dashed border-gray-300 dark:border-white/20">
                      <code className="text-slate-600 dark:text-gray-300 font-mono text-xs truncate mr-2">
                        {asset.type === 'License' ? asset.value : 'Certificate Link Available'}
                      </code>
                      
                      {asset.type === 'License' ? (
                        <button 
                          onClick={() => navigator.clipboard.writeText(asset.value)}
                          title="Copy License Key"
                          className="bg-transparent border-none text-slate-400 hover:text-yellow-600 dark:hover:text-[#ffaa00] cursor-pointer transition-colors p-1"
                        >
                          <FaCopy />
                        </button>
                      ) : (
                        <a 
                          href={asset.value} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-[#00d2ff] flex items-center gap-1 no-underline text-xs font-bold hover:underline whitespace-nowrap"
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
        <div className="xl:col-span-6 2xl:col-span-3 bg-white dark:bg-white/5 rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm flex flex-col h-[600px] xl:h-[auto] xl:min-h-[600px]">
          <div className="p-6 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
             <h2 className="m-0 text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                 <span className="w-2 h-6 bg-purple-600 rounded-full"></span>
                 Support Chat
             </h2>
          </div>
          
          {/* Messages Area */}
            <div 
              ref={chatContainerRef}
              className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 scroll-smooth bg-white dark:bg-transparent"
            >
              {chatHistory.map((msg, index) => {
                const isUser = msg.sender_id === user.id;
                return (
                  <div key={index} className={`
                    self-${isUser ? 'end' : 'start'}
                    max-w-[85%]
                    p-3 rounded-2xl text-sm shadow-sm
                    ${isUser 
                        ? 'bg-purple-600 text-white rounded-tr-none' 
                        : 'bg-gray-100 dark:bg-white/10 text-slate-800 dark:text-white rounded-tl-none'}
                  `}>
                    <div className="bg-transparent">{msg.content}</div>
                    <div className="text-[10px] opacity-70 mt-1 text-right">
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
                placeholder="Type message..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-purple-500 transition-colors text-sm"
              />
               <button 
                type="submit" 
                className="bg-purple-600 hover:bg-purple-700 text-white w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-colors shadow-lg shadow-purple-500/30"
                title="Send Message"
              >
                <FaPaperPlane size={14} />
              </button>
            </form>
        </div>

      </div>
    </div>
  );
};

export default CustomerDashboard;
