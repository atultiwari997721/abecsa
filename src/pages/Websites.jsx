import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { FaGlobe, FaSearch, FaExternalLinkAlt, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Websites = () => {
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    fetchWebsites();
  }, []);

  const fetchWebsites = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('websites')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
      
    if (data) setWebsites(data);
    if (error) console.error("Error fetching websites:", error);
    setLoading(false);
  };

  const categories = ['All', ...new Set(websites.map(w => w.category))];

  const filteredWebsites = websites.filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (site.description && site.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || site.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-white pt-24 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-400 inline-flex items-center gap-4">
            <FaGlobe className="text-green-500" /> Abecsa Web Directory
          </h1>
          <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Explore our curated list of useful websites and tools, right from inside the Abecsa platform.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="bg-white dark:bg-[#111] p-4 rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg flex flex-col md:flex-row gap-4 mb-8 sticky top-[80px] z-30">
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search websites..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] rounded-xl outline-none focus:border-green-500 text-slate-900 dark:text-white transition-colors"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide py-1">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl whitespace-nowrap font-bold text-sm transition-all duration-300 ${
                    selectedCategory === cat 
                    ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg shadow-green-500/25 scale-105' 
                    : 'bg-gray-100 dark:bg-[#1a1a1a] text-slate-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#222]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
        </div>

        {/* Websites Grid */}
        {loading ? (
             <div className="flex flex-col items-center justify-center py-20">
                <FaSpinner className="animate-spin text-4xl text-green-500 mb-4" />
                <p className="text-slate-500 dark:text-gray-400">Loading websites...</p>
             </div>
        ) : filteredWebsites.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-[#111] rounded-3xl border border-dashed border-gray-300 dark:border-[#333]">
                <FaGlobe className="text-6xl text-slate-300 dark:text-[#333] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-700 dark:text-gray-300">No websites found</h3>
                <p className="text-slate-500 dark:text-gray-500 mt-2">Try adjusting your search criteria or checking back later.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredWebsites.map(site => (
                <div 
                    key={site.id} 
                    onClick={() => navigate(`/web-viewer?url=${encodeURIComponent(site.url)}&id=${site.id}`)}
                    className="group bg-white dark:bg-[#111] rounded-2xl p-6 border border-gray-200 dark:border-white/5 hover:border-green-500/50 dark:hover:border-green-500/50 shadow-sm hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 cursor-pointer flex flex-col h-full relative overflow-hidden"
                >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-green-500/0 via-green-500/0 to-green-500/0 group-hover:to-green-500/5 transition-colors duration-500 pointer-events-none" />

                    <div className="flex items-start gap-4 mb-4 relative z-10">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#1a1a1a] dark:to-[#222] flex items-center justify-center shrink-0 overflow-hidden shadow-inner border border-gray-200 dark:border-[#333] group-hover:scale-110 transition-transform duration-300">
                           {site.icon_url ? (
                               <img src={site.icon_url} alt={site.name} className="w-full h-full object-cover" />
                           ) : (
                               <FaGlobe className="text-2xl text-green-500/50" />
                           )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white truncate group-hover:text-green-500 transition-colors">{site.name}</h3>
                            <span className="inline-block bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full mt-1">
                                {site.category}
                            </span>
                        </div>
                    </div>
                    
                    <p className="text-slate-600 dark:text-gray-400 text-sm flex-1 mb-6 line-clamp-3 relative z-10">
                        {site.description || 'No description provided.'}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between border-t border-gray-100 dark:border-[#222] pt-4 relative z-10">
                        <span className="text-xs text-slate-400 font-mono truncate max-w-[150px]">
                            {site.url.replace(/^https?:\/\//, '')}
                        </span>
                        <div className="flex items-center gap-1.5 text-sm font-bold text-green-600 dark:text-green-400 group-hover:translate-x-1 transition-transform">
                            Open <FaExternalLinkAlt size={12} />
                        </div>
                    </div>
                </div>
              ))}
            </div>
        )}

      </div>
    </div>
  );
};

export default Websites;
