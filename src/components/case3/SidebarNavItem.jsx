import { Link } from 'react-router-dom';

export default function SidebarNavItem({ itemId, label, icon: Icon, to, className = '', active = false }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group relative overflow-hidden ${
        active
          ? 'text-pink-700'
          : 'text-body hover:bg-white/20 hover:text-heading'
      } ${className}`}
      style={active ? {
        background: 'linear-gradient(135deg, rgba(255, 211, 219, 0.8), rgba(255, 211, 219, 0.4))',
        boxShadow: '0 0 20px rgba(244, 114, 182, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
      } : { color: 'var(--text-body)' }}
    >
      {active && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </div>
      )}
      {Icon && <Icon className={`w-5 h-5 relative z-10 ${active ? 'drop-shadow-[0_0_8px_rgba(244,114,182,0.6)]' : ''}`} />}
      <span className="relative z-10">{label}</span>
    </Link>
  );
}
