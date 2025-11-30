"use client";

import { motion } from 'framer-motion';
import { ShoppingCart, Check, Star, Filter, SlidersHorizontal, Grid, List, Heart, Download } from 'lucide-react';
import { useCart, Product } from '@/context/CartContext';
import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const websites: Product[] = [
  {
    id: 1,
    title: "E-Commerce Pro",
    price: "₹15,000",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800",
    category: "E-Commerce"
  },
  {
    id: 2,
    title: "Portfolio Elite",
    price: "₹8,000",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    category: "Portfolio"
  },
  {
    id: 3,
    title: "Corporate Biz",
    price: "₹12,000",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    category: "Business"
  },
  {
    id: 4,
    title: "Startup Landing",
    price: "₹5,000",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    category: "Landing Page"
  },
  {
    id: 5,
    title: "Blog Master",
    price: "₹6,000",
    image: "https://images.unsplash.com/photo-1499750310159-5254f412d278?auto=format&fit=crop&q=80&w=800",
    category: "Blog"
  },
  {
    id: 6,
    title: "Restaurant App",
    price: "₹20,000",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
    category: "App"
  },
  {
    id: 7,
    title: "Fashion Store",
    price: "₹18,000",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
    category: "E-Commerce"
  },
  {
    id: 8,
    title: "Consulting Pro",
    price: "₹10,000",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    category: "Business"
  },
  {
    id: 9,
    title: "Photography Portfolio",
    price: "₹9,000",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=800",
    category: "Portfolio"
  },
  {
    id: 10,
    title: "Health & Fitness",
    price: "₹14,000",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800",
    category: "Business"
  },
  {
    id: 11,
    title: "Real Estate Pro",
    price: "₹22,000",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
    category: "Business"
  },
  {
    id: 12,
    title: "Education Platform",
    price: "₹16,000",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
    category: "Education"
  }
];

export default function WebsitesPage() {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const handleAddToCart = (site: Product) => {
    addToCart(site);
    setAddedId(site.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const filteredWebsites = useMemo(() => {
    let filtered = activeFilter === 'All' ? websites : websites.filter(site => site.category === activeFilter);

    // Sort logic
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, '')));
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => parseInt(b.price.replace(/\D/g, '')) - parseInt(a.price.replace(/\D/g, '')));
        break;
      case 'newest':
        filtered = [...filtered].reverse();
        break;
      default: // popular
        // Keep original order
        break;
    }

    return filtered;
  }, [activeFilter, sortBy]);

  const categories = ['All', 'E-Commerce', 'Business', 'Portfolio', 'Landing Page', 'Blog', 'App', 'Education'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Website Templates</h1>
              <p className="text-gray-600 mt-1">Discover premium designs for your next project</p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              {/* View Mode */}
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeFilter === category
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="border-t border-gray-200 mt-6 pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-700">Under ₹5,000</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-700">₹5,000 - ₹10,000</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-700">₹10,000 - ₹20,000</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-700">Over ₹20,000</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredWebsites.length} templates
                {activeFilter !== 'All' && ` in ${activeFilter}`}
              </p>
            </div>

            {/* Templates Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                : 'grid-cols-1'
            }`}>
              {filteredWebsites.map((site, index) => (
                <motion.div
                  key={site.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  {/* Image */}
                  <div className={`relative overflow-hidden ${
                    viewMode === 'grid' ? 'h-48' : 'w-48 h-32 flex-shrink-0'
                  }`}>
                    <img
                      src={site.image}
                      alt={site.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-gray-700">
                        {site.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <button className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full text-gray-600 hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {site.title}
                      </h3>
                      <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">4.8</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      Professional {site.category.toLowerCase()} template with modern design and responsive layout.
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">{site.price}</span>
                        <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          Instant Download
                        </span>
                      </div>

                      <button
                        onClick={() => handleAddToCart(site)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          addedId === site.id
                            ? 'bg-green-600 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                        disabled={addedId === site.id}
                      >
                        {addedId === site.id ? (
                          <>
                            <Check className="w-4 h-4 inline mr-1" />
                            Added
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4 inline mr-1" />
                            Add to Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
