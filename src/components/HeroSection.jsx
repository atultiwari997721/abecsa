import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text3D, Center, Float, Stars, Sparkles } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import '../styles/animations.css';

// Custom 3D Logo Component matching the design
const AbecsaLogo = () => {
  const fontUrl = 'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json';
  
  const letters = [
    { char: 'A', color: '#2b7de9', x: -3.5 }, // Blue
    { char: 'B', color: '#e93e3a', x: -2.0 }, // Red
    { char: 'E', color: '#f5b700', x: -0.8 }, // Yellow
    { char: 'C', color: '#2b7de9', x: 0.5 },  // Blue
    { char: 'S', color: '#4caf50', x: 1.8 },  // Green
    { char: 'A', color: '#e93e3a', x: 3.0 }   // Red
  ];

  return (
    <Center>
      <group>
        {letters.map((item, index) => (
          <Text3D
            key={index}
            font={fontUrl}
            size={1.5}
            height={0.4}
            curveSegments={24}
            bevelEnabled
            bevelThickness={0.1}
            bevelSize={0.05}
            bevelOffset={0}
            bevelSegments={8}
            position={[item.x, 0, 0]}
          >
            {item.char}
            <meshPhysicalMaterial 
              color={item.color}
              emissive={item.color}
              emissiveIntensity={0.8}
              metalness={0.5}
              roughness={0.1}
              clearcoat={1}
              clearcoatRoughness={0}
              reflectivity={1}
            />
          </Text3D>
        ))}
        
        <Text3D
          font={fontUrl}
          size={0.4}
          height={0.1}
          position={[-2.5, -1.5, 0]}
        >
          Software Solutions
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#ffffff"
            emissiveIntensity={0.5}
          />
        </Text3D>
      </group>
    </Center>
  );
};

const Logo3D = ({ isHovered }) => {
  const groupRef = useRef();
  const { viewport } = useThree();
  const isMobile = viewport.width < 5; // Adjust threshold as needed

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { pointer } = state;

    // Mobile-specific behavior
    if (isMobile) {
      // No auto-rotation for mobile as requested
      // Optional: slight sway can remain or be removed. Removing for now to be safe.
      groupRef.current.rotation.y = 0;
      groupRef.current.rotation.x = 0;
    } else {
      // Desktop hover behavior
      const targetY = isHovered ? pointer.x * 0.5 : 0;
      const targetX = isHovered ? -pointer.y * 0.5 : 0;

      // Smooth rotation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.1);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.1);
    }
    
    // Floating animation
    groupRef.current.position.y = Math.sin(time / 1.5) * 0.1;
  });

  // Reduced scale for mobile
  const scale = isMobile ? 0.45 : 1; 
  const positionY = isMobile ? 0.5 : 0;

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, positionY, 0]}>
      <AbecsaLogo />
    </group>
  );
};

import { useTheme } from '../context/ThemeContext';

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { is3DMode } = useTheme();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <section 
      id="home" 
      style={{ 
        height: isMobile ? '60vh' : '80vh', 
        position: 'relative', 
        overflow: 'hidden',
        background: is3DMode ? 'transparent' : 'var(--bg-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {is3DMode ? (
        <>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
              <ambientLight intensity={2} />
              <pointLight position={[10, 10, 10]} intensity={3} />
              <pointLight position={[-10, -10, 10]} intensity={2} color="#ffffff" />
              <spotLight position={[0, 10, 0]} angle={0.5} intensity={3} penumbra={1} />
              <Stars radius={100} depth={50} count={5000} factor={7} saturation={0} fade speed={1} />
              <Sparkles count={100} scale={10} size={4} speed={0.4} opacity={0.5} color="#00f3ff" />
              <Logo3D isHovered={isHovered} />
            </Canvas>
          </div>
          <div style={{ 
            position: 'absolute', 
            bottom: isMobile ? '5%' : '10%', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            zIndex: 2, 
            textAlign: 'center',
            pointerEvents: 'none'
          }}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              style={{ fontSize: '1.2rem', color: '#fff', opacity: 0.8 }}
            >
              Scroll to explore
            </motion.p>
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', zIndex: 2, padding: '2rem' }}>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              fontSize: isMobile ? '3rem' : '5rem', 
              marginBottom: '1rem',
              fontWeight: '800',
              letterSpacing: '-2px',
              display: 'flex',
              justifyContent: 'center',
              gap: '0.2rem'
            }}
          >
            <span style={{ color: '#2b7de9' }}>A</span>
            <span style={{ color: '#e93e3a' }}>B</span>
            <span style={{ color: '#f5b700' }}>E</span>
            <span style={{ color: '#2b7de9' }}>C</span>
            <span style={{ color: '#4caf50' }}>S</span>
            <span style={{ color: '#e93e3a' }}>A</span>
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ 
              fontSize: isMobile ? '1.5rem' : '2.5rem', 
              color: 'var(--text-color)',
              fontWeight: '300'
            }}
          >
            Software Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ 
              marginTop: isMobile ? '1rem' : '2rem', 
              fontSize: isMobile ? '1rem' : '1.2rem', 
              color: 'var(--text-color)', 
              opacity: 0.8,
              maxWidth: '600px',
              margin: isMobile ? '1rem auto 0' : '2rem auto 0'
            }}
          >
            Building the future of web development with modern technologies and premium designs.
          </motion.p>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
