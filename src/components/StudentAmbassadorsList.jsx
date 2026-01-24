
// --- Student Ambassadors List ---
const StudentAmbassadorsList = ({ ambassadors, onViewDashboard }) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {ambassadors.map(amb => (
                <div key={amb.id} style={{ background: 'rgba(0, 210, 255, 0.05)', padding: '1.5rem', borderRadius: '15px', border: '1px solid rgba(0, 210, 255, 0.2)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <h3 style={{ margin: 0, color: '#00d2ff' }}>{amb.full_name}</h3>
                            <p style={{ color: '#888', fontSize: '0.9rem', margin: '5px 0' }}>{amb.email}</p>
                            {amb.visible_password && <PasswordDisplay password={amb.visible_password} />}
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <span style={{ background: '#00d2ff', color: '#000', padding: '0.2rem 0.6rem', borderRadius: '10px', fontSize: '0.8rem', display: 'block', marginBottom: '5px' }}>
                                Ambassador
                            </span>
                        </div>
                        </div>
                        <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.5rem', marginBottom: '1rem' }}>
                            
                        </div>
                        <button onClick={() => alert("Viewing ambassador dashboard not supported in this view yet")} style={{ width: '100%', padding: '0.8rem', background: 'rgba(0, 210, 255, 0.1)', border: '1px solid #00d2ff', color: '#00d2ff', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: 0.5 }}>
                            <FaGlobe /> View Dashboard
                        </button>
                </div>
            ))}
            {ambassadors.length === 0 && <div style={{color: '#666', fontStyle: 'italic'}}>No Student Ambassadors found.</div>}
        </div>
    );
};
