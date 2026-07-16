import { motion, AnimatePresence } from 'framer-motion';

export default function AnimatedNumber({ value, children, className }) {
  if (value === undefined || value === null) {
    return <>{children}</>;
  }

  return (
    <span className={`inline-flex ${className || ''}`}>
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="inline-block"
        >
          {children}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
