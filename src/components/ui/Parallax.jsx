import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function useParallax(speed = 0.5) {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -100 * speed]);
  
  return { ref, y };
}

export function ParallaxBackground({ children, speed = 0.5, className = '' }) {
  const { ref, y } = useParallax(speed);
  
  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxContent({ children, speed = 0.3, className = '' }) {
  const { ref, y } = useParallax(speed);
  
  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
