import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const COLORS = ['#ec4899', '#8b5cf6', '#f59e0b', '#22c55e', '#3b82f6', '#f97316'];

export default function ParticleEffect({ active, x, y, onComplete }) {
  const [particles, setParticles] = useState([]);
  const [mounted, setMounted] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!active) return;

    const newParticles = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      angle: (Math.PI * 2 * i) / 12,
      distance: 30 + Math.random() * 40,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 3 + Math.random() * 4,
    }));

    setParticles(newParticles);

    const timer = setTimeout(() => {
      setParticles([]);
      onCompleteRef.current?.();
    }, 600);

    return () => clearTimeout(timer);
  }, [active, x, y]);

  if (!mounted || !active || particles.length === 0) return null;

  return createPortal(
    <span className="fixed inset-0 pointer-events-none z-[9999]">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: x,
            top: y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            '--tx': `${Math.cos(p.angle) * p.distance}px`,
            '--ty': `${Math.sin(p.angle) * p.distance}px`,
            animation: 'particle-fly 0.6s ease-out forwards',
          }}
        />
      ))}
    </span>,
    document.body
  );
}
