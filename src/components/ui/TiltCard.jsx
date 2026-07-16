import { useRef } from 'react';
import { motion } from 'framer-motion';

export function TiltCard({ 
  children, 
  className = '', 
  tiltAmount = 8, 
  scaleAmount = 1.02,
  perspective = 1000,
  speed = 0.1,
  ...props 
}) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -tiltAmount;
    const rotateY = ((x - centerX) / centerX) * tiltAmount;
    card.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scaleAmount}, ${scaleAmount}, ${scaleAmount})`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <motion.div
      ref={cardRef}
      className={`cursor-default ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        transformStyle: 'preserve-3d', 
        transition: `transform ${speed}s ease-out` 
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
