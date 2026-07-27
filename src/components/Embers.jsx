import { motion } from 'framer-motion';

// Generate embers data ONCE outside the component (not during render)
const generateEmbersData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    duration: Math.random() * 5 + 5,
    delay: Math.random() * 5,
  }));
};

// Generate it once and store it
const EMBERS_DATA = generateEmbersData();

const Embers = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {EMBERS_DATA.map((ember) => (
        <motion.div
          key={ember.id}
          className="absolute rounded-full bg-gold/40 blur-[1px]"
          style={{
            width: ember.size,
            height: ember.size,
            left: `${ember.left}%`,
            bottom: `-10px`,
            boxShadow: `0 0 ${ember.size * 2}px rgba(212, 175, 55, 0.8)`
          }}
          animate={{
            y: [0, -1000],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: ember.duration,
            repeat: Infinity,
            delay: ember.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export default Embers;