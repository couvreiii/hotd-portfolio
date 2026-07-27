import { motion } from 'framer-motion';

const FadeIn = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Starts invisible and 50px lower
      whileInView={{ opacity: 1, y: 0 }} // Fades in and moves to normal position
      viewport={{ once: true, margin: "-100px" }} // Only animates once when it enters the screen
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;