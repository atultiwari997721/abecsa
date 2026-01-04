import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, Sparkles, Stars, Text3D, Center } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

// Subtle floating data nodes/crystals
const FloatingNodes = ({ isMobile }) => {
  const group = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const scrollY = window.scrollY;
    
    // Very slow, majestic rotation
    group.current.rotation.y = t * 0.02 + scrollY * 0.0005;
    group.current.rotation.x = Math.sin(t * 0.05) * 0.02 + scrollY * 0.0002;
  });

  // Reduced count for cleaner look, spread out more
  const particleCount = isMobile ? 15 : 25;
  
  // Memoize nodes to prevent re-creation on every render
  const nodes = useMemo(() => Array.from({ length: particleCount }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 25,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 15 - 8 // Push further back
    ],
    scale: Math.random() * 0.4 + 0.1,
    rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0]
  })), [particleCount]);

  return (
    <group ref={group}>
      {nodes.map((data, i) => (
        <Float key={i} speed={1} rotationIntensity={1} floatIntensity={1.5}>
          <mesh position={data.position} rotation={data.rotation} scale={data.scale}>
            {/* Icosahedron for a more "tech" feel */}
            <icosahedronGeometry args={[1, 0]} />
            <meshPhysicalMaterial 
              color="#2a2a35" // Darker base
              emissive="#00F3FF"
              emissiveIntensity={0.2} // Subtle glow
              transmission={0.6}
              opacity={0.3}
              metalness={0.8}
              roughness={0.2}
              transparent
              wireframe={Math.random() > 0.7} // Some are wireframe for variety
              thickness={1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

// Premium 3D Extruded Logo
const PremiumFloatingLogo = ({ isMobile }) => {
  const group = useRef();
  const fontUrl = 'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json';
  
  const letters = [
    { char: 'A', color: '#0047AB', x: -3.5 }, // Deep Cobalt Blue
    { char: 'B', color: '#D50000', x: -2.0 }, // Deep Bold Red
    { char: 'E', color: '#FFD600', x: -0.8 }, // Vivid Yellow
    { char: 'C', color: '#0047AB', x: 0.5 },  // Deep Cobalt Blue
    { char: 'S', color: '#00C853', x: 1.8 },  // Bold Green
    { char: 'A', color: '#D50000', x: 3.0 }   // Deep Bold Red
  ];

  const mobileScale = 0.5;
  const desktopScale = 0.8; // Slightly smaller than hero to fit background

  useFrame((state) => {
    if (!isMobile && group.current) {
       const t = state.clock.getElapsedTime();
       // Gentle floating rotation
       group.current.rotation.y = Math.sin(t * 0.2) * 0.1;
       group.current.rotation.x = Math.cos(t * 0.15) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.2, 0.2]}>
      <group 
        ref={group}
        // Positioned higher up to float above typical content areas
        position={isMobile ? [0, 2.5, -5] : [0, 2, -6]} 
        scale={isMobile ? [mobileScale, mobileScale, mobileScale] : [desktopScale, desktopScale, desktopScale]}
      > 
        <Center>
          <group>
            {letters.map((item, index) => (
              <Text3D
                key={index}
                font={fontUrl}
                size={1.5}
                height={0.4}
                curveSegments={12} // Reduced for background performance
                bevelEnabled
                bevelThickness={0.1}
                bevelSize={0.05}
                bevelOffset={0}
                bevelSegments={4} // Reduced for background performance
                position={[item.x, 0, 0]}
              >
                {item.char}
                <meshPhysicalMaterial 
                  color={item.color}
                  emissive={item.color}
                  emissiveIntensity={3.0} // Even stronger glow
                  toneMapped={false} // Neon glow effect
                  metalness={0.9} // Very metallic/bold
                  roughness={0.1}
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
      </group>
    </Float>
  );
};

const Scene = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
      
      {/* Deep Space Lighting */}
      <ambientLight intensity={0.2} color="#001133" />
      <pointLight position={[10, 10, 5]} intensity={1} color="#00F3FF" distance={20} />
      <pointLight position={[-10, -5, -5]} intensity={1} color="#bc13fe" distance={20} />
      <spotLight position={[0, 10, 0]} angle={0.5} intensity={2} penumbra={1} color="#ffffff" />
      
      {/* Environment - Revert to City for stability */}
      <Environment preset="city" />
      
      {/* Stars - Deep and slow */}
      <Stars 
        radius={100} 
        depth={50} 
        count={isMobile ? 1000 : 3000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={0.5} 
      /> 
      
      {/* Sparkles - Subtle data dust */}
      <Sparkles 
        count={isMobile ? 100 : 200} 
        scale={15} 
        size={3} 
        speed={0.4} 
        opacity={0.4} 
        color="#00F3FF" 
      />

      {/* Main 3D Content */}
      <FloatingNodes isMobile={isMobile} />
      <PremiumFloatingLogo isMobile={isMobile} />
      
      {/* Post Processing - Commented out to isolate potential crash */}
      {/* <EffectComposer disableNormalPass>
        <Bloom 
          luminanceThreshold={0.5} 
          luminanceSmoothing={0.9} 
          height={300} 
          intensity={isMobile ? 0.2 : 0.4} 
        />
        <Noise opacity={0.03} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer> */}
    </>
  );
};

export default Scene;
