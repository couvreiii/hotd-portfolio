import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// speed: negative moves up faster, positive moves down slower, 0 is static
const ParallaxLayer = ({ children, speed = 0, className = "" }) => {
  const ref = useRef(null);
  
  // Track scroll progress relative to this specific element
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Transform the Y position based on scroll and speed
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 300]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

export default ParallaxLayer;