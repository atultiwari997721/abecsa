import React, { useEffect, Suspense, lazy } from 'react';
import Hero3D from '../components/Hero3D';
import TrustBar from '../components/TrustBar';

// Lazy load heavy sections below the fold
const ServicesSection = lazy(() => import('../components/ServicesSection'));
const PortfolioSection = lazy(() => import('../components/PortfolioSection'));
const SocialProof = lazy(() => import('../components/SocialProof'));
const Packages = lazy(() => import('../components/Packages'));
const PartnersMarquee = lazy(() => import('../components/PartnersMarquee'));

const Home = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-[#0B1120] text-slate-900 dark:text-white transition-colors duration-300">
      {/* Hero is priority (loaded immediately) */}
      <Hero3D />
      
      {/* Heavy sections are suspended */}
      <Suspense fallback={<div className="h-40 flex items-center justify-center text-slate-400">Loading...</div>}>
          <ServicesSection />
          <PortfolioSection />
          <SocialProof />
          <Packages />
          <PartnersMarquee />
      </Suspense>

      <TrustBar />
    </main>
  );
};

export default Home;
