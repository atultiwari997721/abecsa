import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './3d/Scene';

const Background3D = () => {
  // Simple check for mobile to cap pixel ratio
  const isMobile = window.innerWidth < 768;

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100vh', 
      zIndex: -1, 
      pointerEvents: 'none', 
      backgroundColor: '#050511', // Fallback
      backgroundImage: "url('/bg-space.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
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
      {/* Dark overlay to ensure text readability if needed, though Scene handles background color */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        background: 'radial-gradient(circle at center, transparent 0%, #050511 90%)',
        opacity: 0.3
      }} />
    </div>
  );
};

export default Background3D;
