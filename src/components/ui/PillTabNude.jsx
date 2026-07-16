import { useRef, useLayoutEffect, useEffect, useCallback, useState } from 'react';
import { Hash, Users } from 'lucide-react';

export default function PillTabNude({ tabs = [], activeTab, onChange, className = '' }) {
  const containerRef = useRef(null);
  const tabRefs = useRef({});
  const [indicator, setIndicator] = useState({ top: 0, left: 0, width: 0, height: 0, opacity: 1 });

  const updateIndicator = useCallback(() => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const activeTabEl = tabRefs.current[activeTab];

    if (activeTabEl) {
      const tabRect = activeTabEl.getBoundingClientRect();
      setIndicator({
        top: tabRect.top - containerRect.top,
        left: tabRect.left - containerRect.left,
        width: tabRect.width,
        height: tabRect.height,
        opacity: 1,
      });
    }
  }, [activeTab]);

  useLayoutEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  useEffect(() => {
    const handleResize = () => updateIndicator();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateIndicator]);

  return (
    <div ref={containerRef} className={`flex rounded-full overflow-hidden border border-white/20 p-0.5 liquid-glass relative ${className}`}>
      <div
        className="absolute rounded-full bg-gradient-to-r from-white/25 to-white/10 border border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.25),0_2px_4px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out z-0 pointer-events-none"
        style={{
          top: indicator.top,
          left: indicator.left,
          width: indicator.width,
          height: indicator.height,
          opacity: indicator.opacity,
        }}
      />
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              if (el) tabRefs.current[tab.id] = el;
            }}
            onClick={() => onChange?.(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium rounded-full transition-colors relative z-10 ${
              isActive ? 'text-heading' : 'text-muted hover:text-body'
            }`}
          >
            {tab.icon && <span className="inline-flex items-center">{tab.icon}</span>}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
