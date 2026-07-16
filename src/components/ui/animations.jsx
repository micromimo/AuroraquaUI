import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export function useRipple() {
  const [ripples, setRipples] = useState([]);

  const addRipple = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();
    
    setRipples(prev => [...prev, { id, x, y }]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 600);
  }, []);

  return { ripples, addRipple };
}

export function RippleEffect({ ripples }) {
  return (
    <>
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/40 pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
            animation: 'ripple-animation 0.6s ease-out forwards',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </>
  );
}

export function FadeInCard({ children, className = '', delay = 0, style, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, index = 0, direction = 'up', className = '', style, ...props }) {
  const axis = direction === 'left' ? 'x' : 'y';
  const distance = direction === 'left' ? -20 : 20;

  return (
    <motion.div
      initial={{ opacity: 0, [axis]: distance }}
      animate={{ opacity: 1, [axis]: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}
