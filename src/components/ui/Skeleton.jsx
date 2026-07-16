import { motion } from 'framer-motion';

const shimmer = {
  hidden: { opacity: 0.3 },
  visible: {
    opacity: [0.3, 0.6, 0.3],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export function Skeleton({ className = '', style = {} }) {
  return (
    <motion.div
      variants={shimmer}
      initial="hidden"
      animate="visible"
      className={`rounded-xl bg-white/20 ${className}`}
      style={style}
    />
  );
}

export function SkeletonCard({ className = '' }) {
  return (
    <div className={`liquid-glass rounded-2xl p-5 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-2 w-2 rounded-full" />
      </div>
      <Skeleton className="h-8 w-24 mb-2" />
      <Skeleton className="h-3 w-16" />
    </div>
  );
}

export function SkeletonText({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`} />
      ))}
    </div>
  );
}

export function SkeletonChart({ className = '' }) {
  return (
    <div className={`liquid-glass rounded-2xl p-6 ${className}`}>
      <Skeleton className="h-6 w-32 mb-6" />
      <Skeleton className="w-full h-48" />
    </div>
  );
}

export function SkeletonList({ items = 5, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full shrink-0" />
          <div className="flex-1">
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonAvatar({ className = '' }) {
  return <Skeleton className={`h-10 w-10 rounded-full shrink-0 ${className}`} />;
}

export function SkeletonButton({ className = '' }) {
  return <Skeleton className={`h-9 w-24 rounded-lg ${className}`} />;
}
