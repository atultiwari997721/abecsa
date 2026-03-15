import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaGlobe, FaSpinner, FaExternalLinkAlt } from 'react-icons/fa';
import { supabase } from '../supabaseClient';

const WebViewer = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const targetUrl = searchParams.get('url');
    const siteId = searchParams.get('id');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [siteName, setSiteName] = useState('External Website');

    useEffect(() => {
        if (!targetUrl) {
            navigate('/websites');
            return;
        }

        const fetchSiteDetails = async () => {
            if (siteId) {
                const { data } = await supabase.from('websites').select('name').eq('id', siteId).single();
                if (data) setSiteName(data.name);
            }
        };
        fetchSiteDetails();
    }, [targetUrl, navigate, siteId]);

    if (!targetUrl) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-white dark:bg-[#0B1120] flex flex-col">
            {/* Custom Control Bar */}
            <div className="h-14 bg-white dark:bg-[#111] border-b border-gray-300 dark:border-[#333] flex justify-between items-center px-4 shrink-0 shadow-sm z-10">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#222] text-slate-700 dark:text-gray-300 transition-colors flex items-center justify-center cursor-pointer"
                        title="Back to Abecsa"
                    >
                        <FaArrowLeft />
                    </button>
                    <div className="flex items-center gap-2">
                        <FaGlobe className="text-green-500" />
                        <span className="font-bold text-slate-800 dark:text-white hidden sm:inline">{siteName}</span>
                    </div>
                </div>

                {/* URL Bar (Read-only visual) */}
                <div className="flex-1 max-w-xl mx-4">
                    <div className="bg-gray-100 dark:bg-[#222] text-slate-500 dark:text-gray-400 text-xs px-4 py-1.5 rounded-full text-center truncate font-mono border border-gray-200 dark:border-[#333]">
                        {targetUrl}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <a 
                        href={targetUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-500/20 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                        title="Open in new tab if it blocks iframes"
                    >
                        <FaExternalLinkAlt /> <span className="hidden sm:inline">Open Native</span>
                    </a>
                </div>
            </div>

            {/* Iframe Container */}
            <div className="flex-1 relative bg-gray-50 dark:bg-black w-full h-full overflow-hidden">
                {loading && !error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/50 dark:bg-black/50 backdrop-blur-sm z-10">
                        <FaSpinner className="animate-spin text-4xl text-green-500 mb-4" />
                        <p className="text-slate-600 dark:text-gray-400 font-medium">Connecting to {siteName}...</p>
                    </div>
                )}
                
                {error ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 p-8 rounded-3xl max-w-md">
                            <FaGlobe className="text-5xl text-red-500 mb-4 mx-auto" />
                            <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">Connection Blocked</h2>
                            <p className="text-slate-600 dark:text-gray-300 text-sm mb-6">
                                This website has security policies that block it from being loaded inside other applications.
                            </p>
                            <a 
                                href={targetUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-colors shadow-lg"
                            >
                                <FaExternalLinkAlt /> Click here to open in a new tab securely
                            </a>
                        </div>
                    </div>
                ) : (
                    <iframe 
                        src={targetUrl}
                        className="w-full h-full border-none"
                        title="Abecsa Web Viewer"
                        onLoad={() => setLoading(false)}
                        onError={() => { setLoading(false); setError(true); }}
                        // Sandbox allows scripts and forms but restricts top-level navigation to keep them in the iframe if possible
                        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                    />
                )}
            </div>
        </div>
    );
};

export default WebViewer;
