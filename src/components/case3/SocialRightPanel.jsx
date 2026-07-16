import { useState } from 'react';
import { Plus, MoreHorizontal, ChevronRight } from 'lucide-react';
import { socialRightPanelFeeds, socialRightPanelTrends } from '../../data/case3/social';
import RippleButton from '../ui/RippleButton';

function SocialRightPanel() {
  const [followedFeeds, setFollowedFeeds] = useState([]);

  const toggleFollowFeed = (feedId) => {
    setFollowedFeeds(prev => 
      prev.includes(feedId) 
        ? prev.filter(id => id !== feedId)
        : [...prev, feedId]
    );
  };

  return (
    <aside className="w-full h-full min-h-0 flex flex-col p-2">
      <div className="liquid-glass rounded-2xl p-4 flex flex-col flex-1 min-h-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-heading">Dynamic</h3>
          <button className="text-sm text-blue-500 hover:text-blue-600">+ more source</button>
        </div>

        <div className="space-y-2 flex-1 overflow-y-auto">
          {socialRightPanelFeeds.map((feed) => (
            <div 
              key={feed.id} 
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/20 transition-colors cursor-pointer"
            >
              <span className="text-lg">{feed.icon}</span>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-heading truncate">{feed.name}</span>
              </div>
              <RippleButton 
                onClick={() => toggleFollowFeed(feed.id)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                  followedFeeds.includes(feed.id)
                    ? 'bg-blue-500 text-[#FAFAFA]'
                    : 'bg-white/30 text-muted hover:bg-white/50'
                }`}
              >
                <Plus className="w-4 h-4" />
              </RippleButton>
            </div>
          ))}
        </div>
      </div>

      <div className="liquid-glass rounded-2xl p-4 flex flex-col flex-1 min-h-0 mt-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-heading">Trending</h3>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/20 text-muted hover:text-body transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 flex-1 overflow-y-auto">
          {socialRightPanelTrends.map((trend) => (
            <div 
              key={trend.rank}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/20 transition-colors cursor-pointer"
            >
              <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-pink-400/30 to-purple-400/30 flex items-center justify-center text-xs font-bold text-muted">
                {trend.rank}
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-heading truncate">{trend.tag}</span>
                <div className="text-xs text-muted">{trend.posts} 贴文</div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted" />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default SocialRightPanel;
