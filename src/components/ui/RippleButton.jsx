import { useRef } from 'react';

export default function RippleButton({ children, onClick, className, ...props }) {
  const buttonRef = useRef(null);

  const handleClick = (e) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      transform: translate(-50%, -50%);
      pointer-events: none;
      animation: ripple-animation 0.6s ease-out forwards;
    `;

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    if (onClick) onClick(e);
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={`relative overflow-hidden ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
}
