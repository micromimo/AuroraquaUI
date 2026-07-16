import { ChevronLeft } from 'lucide-react';
import PillTabBar from '../ui/PillTabBar';

const tabs = [
  { id: 'discover', label: 'Discover' },
  { id: 'following', label: 'Following' },
  { id: 'video', label: 'Video' },
  { id: 'maimai', label: 'MaiMaiDX' },
];

function SocialHeader({ activeTab, onTabChange, showBackButton }) {
  return (
    <div className="liquid-glass rounded-2xl p-4 sticky top-0 z-30 backdrop-blur-md">
      <div className="flex items-center gap-4 mb-4">
        {showBackButton && (
          <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/20 text-body transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        <h2 className="text-lg font-bold text-heading">{tabs.find(t => t.id === activeTab)?.label || 'Discover'}</h2>
      </div>

      <PillTabBar tabs={tabs} activeTab={activeTab} onChange={onTabChange} />
    </div>
  );
}

export default SocialHeader;