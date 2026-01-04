import React from 'react';
import Hero3D from '../components/Hero3D';
import Packages from '../components/Packages';
import About from './About';

const Home = () => {
  return (
    <main>
      <Hero3D />
      <Packages />
      <About />
      {/* Add more sections here if needed */}
    </main>
  );
};

export default Home;
