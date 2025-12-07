import React from 'react';

// --- TYPE DEFINITIONS ---

/** Interface for individual feature items. */
interface Feature {
  iconSvg: React.ReactNode;
  title: string;
  description: string;
}

/** Interface for website package data, including pricing and features. */
interface Package {
  name: string;
  category: string;
  description: string;
  price: number; // Price in USD (or similar currency)
  imageUrl: string;
  features: string[];
  isPopular: boolean;
}

// --- DATA STRUCTURES ---

// Icons using inline SVG (standard approach when external libraries are restricted)
const DragDropIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" /><path d="M12 5v14" /><circle cx="12" cy="12" r="10" />
  </svg>
);

const DesignIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const MobileIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12" y2="18" />
  </svg>
);

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);


const FEATURES: Feature[] = [
  {
    iconSvg: <DragDropIcon className="w-8 h-8 text-indigo-600" />,
    title: 'Intuitive Drag & Drop',
    description: 'Build complex layouts instantly without touching a line of code. Our editor is fast, powerful, and easy for beginners.',
  },
  {
    iconSvg: <DesignIcon className="w-8 h-8 text-indigo-600" />,
    title: 'Total Design Control',
    description: 'Customize every detail: typography, colors, spacing, and animations. Achieve pixel-perfect precision on any screen.',
  },
  {
    iconSvg: <MobileIcon className="w-8 h-8 text-indigo-600" />,
    title: 'Responsive by Default',
    description: 'Every website created is automatically optimized for mobile, tablet, and desktop, ensuring a perfect view everywhere.',
  },
];

// NOTE: Prices are illustrative and have been scaled up to reflect typical INR pricing.
const PACKAGES: Package[] = [
  // Tier 1: Static / Simple
  { name: 'Micro Portfolio', category: 'Static Single Page', description: 'Perfect for freelancers or basic personal branding.', price: 15999, isPopular: false, imageUrl: 'https://placehold.co/300x200/4f46e5/ffffff?text=Portfolio', features: ['1 Page', 'Contact Form', 'Mobile Optimized'] },
  { name: 'Business Card Site', category: 'Static Single Page', description: 'Simple digital presence with contact info and services summary.', price: 19999, isPopular: false, imageUrl: 'https://placehold.co/300x200/34d399/ffffff?text=Small+Biz', features: ['1-3 Sections', 'SEO Basics', 'Free SSL'] },
  
  // Tier 2: Content & Information
  { name: 'Tech Blog Pro', category: 'Publishing', description: 'A fully functional platform for content creators and writers.', price: 39999, isPopular: true, imageUrl: 'https://placehold.co/300x200/06b6d4/ffffff?text=Blog+Pro', features: ['Unlimited Posts', 'Comment System', 'Custom Domain'] },
  { name: 'Educational Hub', category: 'Educational Platform', description: 'Launch online courses, tutorials, and subscription content.', price: 69999, isPopular: false, imageUrl: 'https://placehold.co/300x200/f59e0b/ffffff?text=E-Learning', features: ['User Registration', 'Video Hosting Ready', 'Payment Gateway'] },
  { name: 'Inventory Manager', category: 'Inventory Management', description: 'Internal tool for tracking stock, assets, and logistics.', price: 79999, isPopular: false, imageUrl: 'https://placehold.co/300x200/7c3aed/ffffff?text=Inventory', features: ['Admin Dashboard', 'Search & Filter', 'Data Export'] },
  
  // Tier 3: E-commerce & Service
  { name: 'Mini Shop Starter', category: 'E-commerce', description: 'Quickly start selling a small selection of products online.', price: 45999, isPopular: true, imageUrl: 'https://placehold.co/300x200/ef4444/ffffff?text=E-Commerce', features: ['Up to 50 Products', 'Secure Checkout', 'Shipping Integration'] },
  { name: 'Grocery Delivery App', category: 'Food/Grocery', description: 'Full-featured site for local grocery ordering and delivery scheduling.', price: 99999, isPopular: false, imageUrl: 'https://placehold.co/300x200/10b981/ffffff?text=Grocery+Delivery', features: ['Location-Based Service', 'Real-Time Tracking', 'Bulk Upload'] },
  { name: 'Restaurant Digital Menu', category: 'Food Delivery', description: 'Online ordering system for pickup or local restaurant delivery.', price: 65999, isPopular: false, imageUrl: 'https://placehold.co/300x200/ec4899/ffffff?text=Food+Order', features: ['Order Management', 'Customization Options', 'Daily Specials'] },

  // Tier 4: Specialized Systems
  { name: 'Library System', category: 'Library Management', description: 'Digital catalog and booking system for public or private collections.', price: 119999, isPopular: false, imageUrl: 'https://placehold.co/300x200/0ea5e9/ffffff?text=Library+System', features: ['Member Login', 'Search by ISBN', 'Automated Reminders'] },
  { name: 'Event Management', category: 'Event Ticketing', description: 'Manage and sell tickets for small-to-medium sized events.', price: 89999, isPopular: false, imageUrl: 'https://placehold.co/300x200/9333ea/ffffff?text=Events', features: ['Ticket Generation', 'QR Code Check-in', 'Revenue Reporting'] },
  { name: 'Real Estate Listings', category: 'Property Management', description: 'Showcase and manage property listings with advanced filtering.', price: 95999, isPopular: true, imageUrl: 'https://placehold.co/300x200/d97706/ffffff?text=Real+Estate', features: ['High-Res Gallery', 'Map Integration', 'Agent Contact Forms'] },
  { name: 'Custom B2B Portal', category: 'Enterprise', description: 'A foundational scaffold for a custom business-to-business portal.', price: 149999, isPopular: false, imageUrl: 'https://placehold.co/300x200/1f2937/ffffff?text=Enterprise+B2B', features: ['User Roles & Permissions', 'API Ready', 'Dedicated Support'] },
];


// --- COMPONENTS ---

const Header: React.FC = () => (
  <header className="absolute top-0 left-0 right-0 z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      {/* Logo */}
      <a href="#" className="flex items-center space-x-2 text-2xl font-bold text-gray-800">
        <span className="text-indigo-600">ABECSA</span>
      </a>
      
      {/* Navigation Links (Desktop) */}
      <nav className="hidden md:flex space-x-8 items-center text-sm font-medium">
        <a href="#" className="text-gray-600 hover:text-indigo-600 transition">Features</a>
        <a href="#packages" className="text-gray-600 hover:text-indigo-600 transition font-bold">Packages & Pricing</a>
        <a href="#" className="text-gray-600 hover:text-indigo-600 transition">Contact</a>
        <a 
          href="#packages" 
          className="px-5 py-2 border border-transparent text-sm font-medium rounded-full shadow-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300"
        >
          Start Building
        </a>
      </nav>
      
      {/* Mobile Menu Icon (Placeholder for functionality) */}
      <button className="md:hidden text-gray-800 p-2 rounded-lg hover:bg-gray-100">
        {/* Menu Icon SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </header>
);

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border border-gray-100">
    <div className="p-4 bg-indigo-50 rounded-full mb-4">
      {feature.iconSvg}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
    <p className="text-gray-500 text-sm">{feature.description}</p>
  </div>
);

interface PackageCardProps {
  pkg: Package;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  
  // Removed client-side handleBuyClick function to resolve Server Component error

  return (
    <div className={`flex flex-col rounded-xl shadow-xl overflow-hidden transition duration-300 ${pkg.isPopular ? 'bg-white border-2 border-indigo-500' : 'bg-white border border-gray-200'}`}>
      {pkg.isPopular && (
        <div className="bg-indigo-600 text-white text-center py-2 text-sm font-semibold tracking-wider">
          Most Popular
        </div>
      )}
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex justify-between items-center mb-2">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${pkg.isPopular ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}>
                  {pkg.category}
              </span>
              <img 
                  src={pkg.imageUrl} 
                  alt={`Preview for ${pkg.name}`} 
                  className="w-16 h-12 object-cover rounded-md border"
                  // onError removed previously
              />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{pkg.name}</h3>
          <p className="text-sm text-gray-500 mb-6">{pkg.description}</p>
          
          <div className="space-y-3">
            {pkg.features.map((feature, index) => (
              <div key={index} className="flex items-start text-gray-700">
                <CheckIcon className={`w-5 h-5 mr-2 flex-shrink-0 ${pkg.isPopular ? 'text-indigo-500' : 'text-green-500'}`} />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-3xl font-extrabold text-gray-900">
            {/* Currency Change: $ to ₹ (Indian Rupee Symbol) */}
            <span className="text-xl font-normal align-top">₹</span>
            {pkg.price.toLocaleString('en-IN')} {/* Formatting price with Indian locale */}
            <span className="text-base font-medium text-gray-500"> / one-time fee</span>
          </p>
          {/* FIX: Replaced interactive button with static anchor tag to eliminate the onClick event handler and resolve the Server Component error. */}
          <a 
            href={`#buy-package-${pkg.name.replace(/\s/g, '-')}`} // Static placeholder link
            className={`mt-4 w-full py-3 text-center inline-block rounded-full text-base font-semibold shadow-md transition duration-300 ${pkg.isPopular 
              ? 'bg-indigo-600 text-white hover:bg-indigo-700 transform hover:scale-[1.02]' 
              : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}
          >
            Buy Now & Get Deployed
          </a>
        </div>
      </div>
    </div>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-gray-800 text-white py-12 mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-gray-700 pb-8 mb-8">
        {/* Logo and Tagline */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-2xl font-bold mb-2 text-indigo-400">ABECSA</h3>
          <p className="text-gray-400 text-sm">Build your vision. Code-free.</p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-3 text-white">Product</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-indigo-400">Features</a></li>
            <li><a href="#packages" className="hover:text-indigo-400">Packages</a></li>
            <li><a href="#" className="hover:text-indigo-400">Deployment</a></li>
            <li><a href="#" className="hover:text-indigo-400">Integrations</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-white">Company</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-indigo-400">About Us</a></li>
            <li><a href="#" className="hover:text-indigo-400">Careers</a></li>
            <li><a href="#" className="hover:text-indigo-400">Press Kit</a></li>
            <li><a href="#" className="hover:text-indigo-400">Legal</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-white">Support</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-indigo-400">Help Center</a></li>
            <li><a href="#" className="hover:text-indigo-400">Community</a></li>
            <li><a href="#" className="hover:text-indigo-400">Tutorials</a></li>
          </ul>
        </div>
        
        {/* Social Links */}
        <div className="flex space-x-4">
          <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-indigo-400 transition">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.254 5.922c-.752.333-1.564.558-2.413.656a4.563 4.563 0 002.008-.772 9.074 9.074 0 01-2.716 1.033c-.708-.752-1.72-1.222-2.85-1.222-2.152 0-3.9 1.748-3.9 3.9 0 .307.034.605.1.895A11.052 11.052 0 005.105 5.17c-.318.547-.497 1.182-.497 1.862 0 1.348.683 2.545 1.716 3.242A3.886 3.886 0 013.25 9.77v.05c0 1.886 1.34 3.456 3.125 3.824a3.9 3.9 0 01-1.765.068 3.94 3.94 0 003.67 2.72c-1.332 1.048-3.008 1.674-4.834 1.674-.314 0-.623-.018-.926-.053A10.857 10.857 0 0021.72 6.57c-.55.245-1.144.39-1.77.443z" /></svg>
          </a>
          <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-indigo-400 transition">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14 11h3v-3c0-.621.567-1.125 1.25-1.125h2.5c.683 0 1.25.504 1.25 1.125v3h3v3h-3v7h-3v-7h-3v-3z" /></svg>
          </a>
          <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-indigo-400 transition">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.136-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.723 7 2.205v7.03z" /></svg>
          </a>
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Abecsa, Inc. All rights reserved.
      </div>
    </div>
  </footer>
);

// --- MAIN APPLICATION COMPONENT ---

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased text-gray-800">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        {/* Background Gradient & Shape */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white"></div>
        <div className="absolute right-0 top-0 w-1/3 h-full bg-indigo-100/50 transform skew-x-12 origin-top-right hidden lg:block"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left pt-20 lg:pt-0">
              <span className="inline-block px-3 py-1 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-full mb-3">
                The Future of Web Building
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                Build Your Vision. <br className="hidden md:inline"/>
                <span className="text-indigo-600">Code-Free.</span>
              </h1>
              <p className="mt-4 text-xl text-gray-500 max-w-lg mx-auto lg:mx-0">
                Launch professional, blazing-fast websites with our intuitive drag-and-drop software. Get online in minutes, not months.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
                <a 
                  href="#packages" 
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
                >
                  Explore Packages
                </a>
                <a 
                  href="#" 
                  className="inline-flex items-center justify-center px-8 py-3 border border-indigo-200 text-base font-medium rounded-full text-indigo-700 bg-white hover:bg-indigo-50 transition duration-300"
                >
                  Watch Demo
                </a>
              </div>
            </div>

            {/* Illustration/Image */}
            <div className="mt-16 lg:mt-0 relative flex justify-center lg:justify-end">
              {/* Simple isometric illustration using SVGs or a placeholder image */}
              <img 
                src="https://placehold.co/600x400/3e71d4/ffffff?text=Abecsa+Editor+Mockup" 
                alt="Abecsa software interface mockup" 
                className="rounded-xl shadow-2xl w-full max-w-lg lg:max-w-none transform rotate-3 hover:rotate-0 transition duration-500"
                style={{ filter: 'drop-shadow(0 25px 25px rgba(0, 0, 0, 0.25))' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section (Keep for high-level benefits) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900">
              The ABECSA Advantage
            </h2>
            <p className="mt-3 text-xl text-gray-500">
              Powerful tools designed for speed, flexibility, and stunning results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {FEATURES.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Website Packages & Pricing Section (New/Updated) */}
      <section id="packages" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900">
              Ready-to-Deploy Website Packages
            </h2>
            <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
              Choose the perfect package based on your business needs. Includes design, build, and first-year deployment services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PACKAGES.map((pkg, index) => (
              <PackageCard key={index} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial/CTA Banner */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-700 rounded-3xl p-10 md:p-16 text-center shadow-xl">
            <blockquote className="max-w-4xl mx-auto">
              <p className="text-2xl md:text-3xl font-semibold text-white">
                "Abecsa made launching my dream site a breeze. I had zero coding knowledge and was fully published within a single afternoon."
              </p>
              <footer className="mt-6">
                <p className="text-lg font-medium text-indigo-200">
                  Jane Doe, Founder of Creative Collective
                </p>
              </footer>
            </blockquote>
            <div className="mt-10">
              <a 
                href="#packages" 
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-indigo-700 bg-white hover:bg-indigo-100 transition duration-300 transform hover:scale-105"
              >
                Join Over 50k Creators Today
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default App;