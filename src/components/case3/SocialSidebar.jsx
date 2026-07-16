import { useNavigate } from 'react-router-dom';
import { Home, Search, Bell, MessageSquare, Hash, List, Bookmark, User, Settings, Plus, ArrowUp } from 'lucide-react';

const menuItems = [
  { id: 'home', label: '首页', icon: Home, path: '/case3/social/main' },
  { id: 'explore', label: '探索', icon: Search, path: '/case3/social/main' },
  { id: 'notifications', label: '通知', icon: Bell, path: '/case3/social/main' },
  { id: 'messages', label: '對話', icon: MessageSquare, path: '/case3/social/main' },
  { id: 'feed', label: '動態源', icon: Hash, path: '/case3/social/main' },
  { id: 'lists', label: '列表', icon: List, path: '/case3/social/main' },
  { id: 'bookmarks', label: '收藏', icon: Bookmark, path: '/case3/social/main' },
  { id: 'profile', label: '個人檔案', icon: User, path: '/case3/social/profile' },
  { id: 'settings', label: '設定', icon: Settings, path: '/case3/social/settings' },
];

function SocialSidebar({ activeItem, onItemClick, onNewPost }) {
  const navigate = useNavigate();

  const scrollToTop = () => {
    const scrollableParent = document.querySelector('.overflow-auto');
    if (scrollableParent) {
      scrollableParent.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleClick = (item) => {
    onItemClick(item.id);
    navigate(item.path);
  };

  return (
    <aside className="w-full h-full min-h-0 flex flex-col p-2">
      <div className="liquid-glass rounded-2xl p-4 flex flex-col flex-1 min-h-0">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl overflow-hidden avatar-border">
            <img
              src="/avater.jpg"
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-sm font-bold gradient-text">Prysm™</h1>
            <p className="text-[10px] text-muted">Reflect every lifestyle.</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleClick(item)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${
                  isActive
                    ? 'text-pink-700'
                    : 'text-body hover:text-heading hover:bg-white/20'
                }`}
                style={isActive ? {
                  background: 'linear-gradient(135deg, rgba(255, 211, 219, 0.8), rgba(255, 211, 219, 0.4))',
                  boxShadow: 'rgba(244, 114, 182, 0.3) 0px 0px 20px, rgba(255, 255, 255, 0.6) 0px 1px 0px inset'
                } : {}}
              >
                {isActive && (
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  </div>
                )}
                <Icon className={`w-5 h-5 ${isActive ? 'drop-shadow-[0_0_8px_rgba(244,114,182,0.6)]' : ''}`} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <button onClick={onNewPost} className="mt-4 w-full glass-button flex items-center justify-center gap-2 text-blue-500 hover:text-blue-600">
          <Plus className="w-5 h-5" />
          <span className="font-medium">新贴文</span>
        </button>

        <button
          onClick={scrollToTop}
          className="mt-4 w-10 h-10 mx-auto rounded-full liquid-glass flex items-center justify-center text-muted hover:text-body hover:scale-110 transition-all duration-300"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}

export default SocialSidebar;