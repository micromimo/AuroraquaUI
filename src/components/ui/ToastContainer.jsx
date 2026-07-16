import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const toastVariants = {
  initial: { opacity: 0, y: 20, scale: 0.9 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    scale: 0.9,
    transition: { duration: 0.2, ease: 'easeIn' }
  }
};

export function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleAddToast = (event) => {
      const toast = event.detail;
      setToasts((prev) => [...prev, toast]);

      if (toast.duration && toast.duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== toast.id));
        }, toast.duration);
      }
    };

    const handleRemoveToast = (event) => {
      const { id } = event.detail;
      setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    window.addEventListener('add-toast', handleAddToast);
    window.addEventListener('remove-toast', handleRemoveToast);

    return () => {
      window.removeEventListener('add-toast', handleAddToast);
      window.removeEventListener('remove-toast', handleRemoveToast);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-50 flex flex-col-reverse items-center justify-center gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast, index) => (
          <motion.div
            key={toast.id}
            variants={toastVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            layout
            className="liquid-glass rounded-full px-6 py-3 shadow-xl flex items-center gap-3 pointer-events-auto"
          >
            {toast.type === 'check' && (
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            )}
            {toast.type === 'error' && (
              <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
            )}
            {toast.type === 'info' && (
              <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </div>
            )}
            <span className="text-sm text-heading font-medium whitespace-nowrap">{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function useToast() {
  const addToast = (message, type = 'check', duration = 3000) => {
    const toastId = Date.now() + Math.random();
    const toast = { id: toastId, message, type: type, duration };
    
    const event = new CustomEvent('add-toast', { detail: toast });
    window.dispatchEvent(event);
    
    return toastId;
  };

  const removeToast = (id) => {
    const event = new CustomEvent('remove-toast', { detail: { id } });
    window.dispatchEvent(event);
  };

  return { addToast, removeToast };
}
