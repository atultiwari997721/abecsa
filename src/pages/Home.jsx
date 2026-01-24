import React, { useEffect } from 'react';
import Hero3D from '../components/Hero3D';
import ServicesSection from '../components/ServicesSection';
import PortfolioSection from '../components/PortfolioSection';
import TrustBar from '../components/TrustBar';
import SocialProof from '../components/SocialProof';
import Packages from '../components/Packages';
import PartnersMarquee from '../components/PartnersMarquee';

const Home = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-[#0B1120] text-slate-900 dark:text-white selection:bg-blue-200 dark:selection:bg-electricBlue selection:text-slate-900 dark:selection:text-white transition-colors duration-300">
      <Hero3D />
      
      <ServicesSection />
      <PortfolioSection />
      <SocialProof />
      <Packages />
      <PartnersMarquee />
      <TrustBar />
    </main>
  );
};

export default Home;
