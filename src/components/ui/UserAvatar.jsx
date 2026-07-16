import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UserAvatar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menuItems = [
    { label: 'Account', icon: 'user' },
    { label: 'Profile', icon: 'user-circle' },
    { label: 'Change User', icon: 'refresh-cw' },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <img
          src="/avater.jpg"
          alt="User Avatar"
          className="w-full h-full object-cover"
        />
      </button>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.16, 1, 0.3, 1],
              opacity: { duration: 0.3 },
              y: { duration: 0.3 },
              scale: { duration: 0.3 }
            }}
            className="absolute right-0 top-full mt-2 w-60 z-50"
          >
            <div className="liquid-glass rounded-2xl p-4 shadow-2xl border border-white/30">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/20">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/60">
                  <img
                    src="/avater.jpg"
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-heading truncate">@micromimo</div>
                  <div className="text-xs text-muted truncate">micromimo@proton.me</div>
                </div>
              </div>

              <div className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-body hover:bg-white/30 hover:text-heading transition-all duration-200"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {item.icon === 'user' && <>
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </>}
                        {item.icon === 'user-circle' && <>
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4" />
                          <path d="M12 8h.01" />
                        </>}
                        {item.icon === 'refresh-cw' && <>
                          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                          <path d="M3 3v5h5" />
                          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                          <path d="M16 21h5v-5" />
                        </>}
                      </svg>
                    <span>{item.label}</span>
                  </button>
                ))}

                <div className="my-2 border-t border-white/20" />

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-500/10 hover:text-red-700 transition-all duration-200"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21h6" /><path d="M12 17V3" /><path d="M4 12l8-8 8 8" />
                  </svg>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}