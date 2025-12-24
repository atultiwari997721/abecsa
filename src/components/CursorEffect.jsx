import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { useTheme } from '../context/ThemeContext';

const CursorEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { is3DMode } = useTheme();

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    }
  };

  if (!is3DMode || (typeof window !== 'undefined' && window.innerWidth < 768)) return null;

  return (
    <motion.div
      variants={variants}
      animate="default"
      transition={{
        type: "spring",
        mass: 0.6,
        stiffness: 100,
        damping: 10
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        border: '2px solid var(--primary-color)',
        pointerEvents: 'none',
        zIndex: 9999,
        boxShadow: '0 0 10px var(--primary-color)'
      }}
    />
  );
};

export default CursorEffect;
