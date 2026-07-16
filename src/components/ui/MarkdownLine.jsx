import { motion } from 'framer-motion';

const lineVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      delay: i * 0.03,
      ease: 'easeOut'
    }
  })
};

export function MarkdownLine({ children, index, className = '' }) {
  return (
    <motion.div
      custom={index}
      variants={lineVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MarkdownBlock({ children, index, className = '' }) {
  return (
    <motion.div
      custom={index}
      variants={{
        hidden: { opacity: 0, y: 15 },
        visible: (i) => ({
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.4,
            delay: i * 0.05,
            ease: 'easeOut'
          }
        })
      }}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}
