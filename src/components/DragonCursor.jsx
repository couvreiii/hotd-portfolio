import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const DragonCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', mouseMove);

    // Add hover listeners for interactive elements
    const handleMouseOver = (e) => {
      if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.cursor-pointer')) {
        setCursorVariant('hover');
      }
    };

    const handleMouseOut = () => {
      setCursorVariant('default');
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      scale: 1,
    },
    hover: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1.5,
    },
  };

  return (
    <>
      {/* Main cursor - glowing ember */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] mix-blend-screen"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        style={{
          background: 'radial-gradient(circle, #ff6b35 0%, #d4af37 50%, transparent 100%)',
          boxShadow: '0 0 20px #ff6b35, 0 0 40px #d4af37, 0 0 60px #8a1c1c',
        }}
      />
      
      {/* Outer glow ring */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-[9998] border border-gold/30"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: cursorVariant === 'hover' ? 2 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{
          boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)',
        }}
      />
      
      {/* Particle trail effect */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9997]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: [0.8, 0.4, 0],
          scale: [1, 1.5, 2],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          background: '#ff6b35',
          boxShadow: '0 0 10px #ff6b35',
        }}
      />
    </>
  );
};

export default DragonCursor;