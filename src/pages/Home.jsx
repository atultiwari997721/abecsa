import React from 'react';
import HeroSection from '../components/HeroSection';
import Packages from '../components/Packages';
import About from './About';

const Home = () => {
  return (
    <main>
      <HeroSection />
      <Packages />
      <About />
      {/* Add more sections here if needed */}
    </main>
  );
};

export default Home;
