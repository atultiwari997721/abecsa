import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaExternalLinkAlt, FaPaperPlane, FaUserCircle, FaCircle } from 'react-icons/fa';
import '../styles/global.css';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { user, profile, signOut, loading } = useAuth();
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [websites, setWebsites] = useState([]);
  
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  // Fetch Data (Websites & Messages)
  useEffect(() => {
    if (!user) return;

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

    fetchWebsites();
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
    <div style={{ 
      minHeight: '100vh', 
      background: '#050505', 
      color: '#fff', 
      padding: '2rem', 
      paddingTop: '100px',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <FaUserCircle size={40} color="var(--primary-color)" />
          <div>
            <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Welcome, {profile?.full_name || user.email}</h1>
            <span style={{ fontSize: '0.9rem', color: '#888' }}>Customer Dashboard</span>
          </div>
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Left Column: My Websites */}
        <div style={{ flex: 2 }}>
          <h2 style={{ borderLeft: '4px solid var(--primary-color)', paddingLeft: '10px', marginBottom: '1.5rem' }}>My Websites</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {websites.length === 0 ? (
               <div style={{padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '15px', color: '#888'}}>
                 No websites found. Contact admin to link your projects.
               </div>
            ) : (
                websites.map((site) => (
                  <div key={site.id} style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '15px',
                    padding: '1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}>
                    <div>
                      <h3 style={{ margin: '0 0 0.5rem 0', color: '#fff' }}>{site.name}</h3>
                      <p style={{ margin: 0, color: '#aaa', fontSize: '0.9rem' }}>Plan: <span style={{ color: 'var(--primary-color)' }}>{site.plan}</span></p>
                      <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: '#666' }}>Expires: {site.expiry_date}</p>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                      <div style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '0.3rem', 
                        background: site.status === 'Live' ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 170, 0, 0.1)', 
                        color: site.status === 'Live' ? '#00ff88' : '#ffaa00',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}>
                        <FaCircle size={8} /> {site.status}
                      </div>
                      
                      {site.url && (
                        <a 
                          href={site.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'var(--primary-color)',
                            color: '#fff',
                            textDecoration: 'none',
                            padding: '0.6rem 1.2rem',
                            borderRadius: '8px',
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            marginTop: '0.5rem',
                            transition: 'transform 0.2s'
                          }}
                          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
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

        {/* Right Column: Support Chat */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h2 style={{ borderLeft: '4px solid #bc13fe', paddingLeft: '10px', marginBottom: '1.5rem' }}>Support Chat</h2>
          
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '15px',
            height: '400px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {/* Messages Area */}
            <div 
              ref={chatContainerRef}
              style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', scrollBehavior: 'smooth' }}
            >
              {chatHistory.map((msg, index) => {
                const isUser = msg.sender_id === user.id;
                return (
                  <div key={index} style={{
                    alignSelf: isUser ? 'flex-end' : 'flex-start',
                    maxWidth: '70%',
                    background: isUser ? '#bc13fe' : 'rgba(255,255,255,0.1)',
                    color: '#fff',
                    padding: '0.8rem',
                    borderRadius: isUser ? '15px 15px 0 15px' : '15px 15px 15px 0',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ fontSize: '0.9rem' }}>{msg.content}</div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '0.3rem', textAlign: 'right' }}>
                       {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} style={{ 
              padding: '1rem', 
              background: 'rgba(0,0,0,0.2)', 
              borderTop: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              gap: '0.5rem'
            }}>
              <input 
                type="text" 
                placeholder="Type your message..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '20px',
                  padding: '0.8rem',
                  color: '#fff',
                  outline: 'none'
                }}
              />
              <button 
                type="submit" 
                style={{
                  background: '#bc13fe',
                  border: 'none',
                  color: '#fff',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
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
