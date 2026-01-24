import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './3d/Scene';
import { useTheme } from '../context/ThemeContext';

const Background3D = () => {
  // Simple check for mobile to cap pixel ratio
  const isMobile = window.innerWidth < 768;
  const { theme } = useTheme();

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100vh', 
      zIndex: -1, 
      pointerEvents: 'none', 
      display: theme === 'dark' ? 'block' : 'none', // forceful hide
      backgroundColor: theme === 'dark' ? '#050511' : 'transparent', // Transparent in light mode
      backgroundImage: theme === 'dark' ? "url('/bg-space.png')" : 'none', // No space bg in light mode
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      transition: 'background-color 0.3s ease'
    }}>
      {/* Only show 3D scene in dark mode if desired, or keep it but ensure it works on white. 
          The user wants "White and Blue", likely implying a clean look without the dark 3D space scene.
          We'll hide the canvas in light mode to ensure pure white/blue look. 
      */}
      {theme === 'dark' && (
        <Canvas
          dpr={isMobile ? [1, 1] : [1, 2]} // Force 1.0 DPR on mobile for absolute stability
          gl={{ 
            antialias: false, 
            alpha: false, // Opaque is more stable than transparent on mobile
            powerPreference: "high-performance",
            preserveDrawingBuffer: true, // Prevents flickering
            stencil: false,
            depth: true
          }}
          camera={{ position: [0, 0, 10], fov: 50 }}
          performance={{ min: 0.5 }} // Allow downgrading performance if FPS drops
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      )}
      
      {/* Dark overlay only in dark mode */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        background: 'radial-gradient(circle at center, transparent 0%, #050511 90%)',
        opacity: theme === 'dark' ? 0.3 : 0,
        transition: 'opacity 0.3s ease'
      }} />
    </div>
  );
};

export default Background3D;
