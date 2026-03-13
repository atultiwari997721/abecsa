import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { FaDownload, FaMobileAlt, FaSearch, FaAppleAlt, FaWhatsapp } from 'react-icons/fa';
import { MdApps, MdCategory, MdNewReleases } from 'react-icons/md';
import { config } from '../config';


const CATEGORIES = ['All', 'Education', 'Tools', 'Utility', 'Communication', 'General'];

const AppsPage = () => {
    const [apps, setApps] = useState([]);
    const [filteredApps, setFilteredApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchApps();
    }, []);

    useEffect(() => {
        let result = apps;
        if (selectedCategory !== 'All') {
            result = result.filter(app => app.category === selectedCategory);
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(app =>
                app.name.toLowerCase().includes(q) ||
                (app.description || '').toLowerCase().includes(q)
            );
        }
        setFilteredApps(result);
    }, [apps, selectedCategory, searchQuery]);

    const fetchApps = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('apps')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false });
        if (data) setApps(data);
        setLoading(false);
    };

    const handleDownload = async (app) => {
        // Increment download count (fire and forget)
        supabase.rpc('increment_app_download', { app_id: app.id }).catch(() => {});

        // Simple and reliable download trigger for cross-origin files
        window.location.href = app.apk_url;

        // Optimistic UI update
        setApps(prev => prev.map(a => a.id === app.id ? { ...a, download_count: (a.download_count || 0) + 1 } : a));
    };

    // Get unique categories from actual apps
    const presentCategories = ['All', ...new Set(apps.map(a => a.category || 'General'))];

    const handleWhatsApp = () => {
        const message = "Hello! I'm interested in building a custom Android app with ABECSA.";
        window.open(`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };


    return (
        <div className="min-h-screen bg-white dark:bg-[#050510] transition-colors duration-300">

            {/* ── Hero ── */}
            <div className="relative overflow-hidden pt-28 pb-20 px-4">
                {/* Animated background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-5xl mx-auto text-center">
                    {/* Icon badge */}
                    <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-blue-200 dark:border-blue-500/30">
                        <FaMobileAlt />
                        Official ABECSA Apps
                    </div>

                    <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight">
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                            ABECSA
                        </span>
                        <br />
                        <span className="text-slate-800 dark:text-white">Apps Store</span>
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-10">
                        Download official ABECSA apps directly to your Android device. Free, safe, and always up-to-date.
                    </p>

                    {/* Search bar */}
                    <div className="relative max-w-md mx-auto">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search apps..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white dark:bg-white/10 border border-gray-200 dark:border-white/15 text-slate-800 dark:text-white placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-lg shadow-blue-500/5 backdrop-blur-md"
                        />
                    </div>
                </div>
            </div>

            {/* ── Category Filter Pills ── */}
            <div className="max-w-6xl mx-auto px-4 mb-10">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {presentCategories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
                                selectedCategory === cat
                                    ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                                    : 'bg-gray-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-white/20 border border-gray-200 dark:border-white/10'
                            }`}
                        >
                            <MdCategory size={14} />
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── App Cards Grid ── */}
            <div className="max-w-6xl mx-auto px-4 pb-24">
                {loading ? (
                    // Skeleton Loader
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="bg-gray-100 dark:bg-white/5 rounded-3xl p-6 animate-pulse h-64" />
                        ))}
                    </div>
                ) : filteredApps.length === 0 ? (
                    // Empty State
                    <div className="text-center py-24">
                        <div className="w-24 h-24 bg-blue-100 dark:bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <MdApps className="text-blue-500 dark:text-blue-400 text-5xl" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-700 dark:text-white mb-2">
                            {searchQuery || selectedCategory !== 'All' ? 'No apps match your search' : 'No Apps Yet'}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto">
                            {searchQuery || selectedCategory !== 'All'
                                ? 'Try a different search or category filter.'
                                : 'Check back soon — apps will be available here shortly.'}
                        </p>
                        {(searchQuery || selectedCategory !== 'All') && (
                            <button
                                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                                className="mt-4 text-blue-500 hover:text-blue-600 font-semibold text-sm transition-colors"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredApps.map(app => (
                            <AppCard key={app.id} app={app} onDownload={handleDownload} />
                        ))}
                    </div>
                )}

                {/* Results count */}
                {!loading && filteredApps.length > 0 && (
                    <p className="text-center text-slate-400 dark:text-slate-500 text-sm mt-10">
                        Showing {filteredApps.length} {filteredApps.length === 1 ? 'app' : 'apps'}
                        {selectedCategory !== 'All' ? ` in "${selectedCategory}"` : ''}
                    </p>
                )}
            </div>

            <div className="border-t border-gray-200 dark:border-white/10 py-8 text-center flex flex-col items-center gap-6">
                <button 
                    onClick={handleWhatsApp}
                    className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-green-500/20 transition-all transform hover:scale-105 active:scale-95"
                >
                    <FaWhatsapp size={20} />
                    Need a Custom App? Message Us
                </button>
                <p className="text-slate-400 dark:text-slate-500 text-xs flex items-center justify-center gap-2">
                    <FaMobileAlt />
                    All apps are for Android. Enable "Install from unknown sources" in your device settings before installing.
                </p>
            </div>
        </div>

    );
};

// ── App Card Component ──
const AppCard = ({ app, onDownload }) => {
    const [downloading, setDownloading] = useState(false);

    const handleClick = async () => {
        setDownloading(true);
        await onDownload(app);
        setTimeout(() => setDownloading(false), 1500);
    };

    // Category color map
    const catColors = {
        Education: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300',
        Tools: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-300',
        Utility: 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300',
        Communication: 'bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300',
        General: 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300',
    };
    const catClass = catColors[app.category] || catColors.General;

    return (
        <div className="group relative bg-white dark:bg-[#111827] border border-gray-200 dark:border-white/10 rounded-3xl p-6 flex flex-col gap-4 hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5 transition-all duration-300 overflow-hidden">

            {/* Glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500 rounded-3xl pointer-events-none" />

            {/* Header row: Icon + meta */}
            <div className="flex items-start gap-4 relative">
                {/* App Icon */}
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg">
                    {app.icon_url ? (
                        <img
                            src={app.icon_url}
                            alt={`${app.name} icon`}
                            className="w-full h-full object-cover"
                            onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                        />
                    ) : null}
                    <FaMobileAlt className="text-white text-2xl" style={{ display: app.icon_url ? 'none' : 'block' }} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800 dark:text-white text-base leading-snug truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {app.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${catClass}`}>
                            {app.category || 'General'}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
                            <MdNewReleases size={12} />
                            v{app.version || '1.0'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed relative flex-1">
                {app.description || 'An official ABECSA application.'}
            </p>

            {/* Footer: downloads + button */}
            <div className="flex items-center justify-between relative mt-auto">
                {/* Download count */}
                <span className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 font-medium">
                    <FaDownload size={11} />
                    {(app.download_count || 0).toLocaleString()} downloads
                </span>

                {/* Download button */}
                <button
                    onClick={handleClick}
                    disabled={downloading}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-md ${
                        downloading
                            ? 'bg-green-500 text-white shadow-green-500/30 scale-95'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30 hover:scale-105 hover:shadow-blue-500/50 active:scale-95'
                    }`}
                >
                    <FaDownload size={13} />
                    {downloading ? 'Downloading…' : 'Download'}
                </button>
            </div>
        </div>
    );
};

export default AppsPage;
