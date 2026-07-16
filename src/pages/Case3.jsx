import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Search, Home, Settings, Info } from 'lucide-react';
import UserAvatar from '../components/ui/UserAvatar';
import { useBackground } from '../context/BackgroundContext';
import Case3Sidebar, { sidebarItems } from '../components/case3/Case3Sidebar';
import DashboardSubpage from '../components/case3/subpages/DashboardSubpage';
import ManagementSubpage from '../components/case3/subpages/ManagementSubpage';
import ChatSubpage from '../components/case3/subpages/ChatSubpage';
import MarkdownSubpage from '../components/case3/subpages/MarkdownSubpage';
import MindmapSubpage from '../components/case3/subpages/MindmapSubpage';
import VideoSubpage from '../components/case3/subpages/VideoSubpage';
import SocialSubpage from '../components/case3/subpages/SocialSubpage';
import ForumSubpage from '../components/case3/subpages/ForumSubpage';
import MusicSubpage from '../components/case3/subpages/MusicSubpage';

function Case3() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSubpage, setCurrentSubpage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { getBackgroundStyle, currentScheme } = useBackground();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    const prevPath = prevPathRef.current;
    const currentPath = location.pathname;

    // 从非 social 页面切换到 social 页面时，1.0 秒后自动收起侧边栏
    if (!prevPath.startsWith('/case3/social') && currentPath.startsWith('/case3/social')) {
      const timer = setTimeout(() => {
        setSidebarOpen(false);
      }, 1000);
      return () => clearTimeout(timer);
    }

    prevPathRef.current = currentPath;
  }, [location.pathname]);

  useEffect(() => {
    const path = location.pathname.replace('/case3/', '');
    const found = sidebarItems.find(item => item.path === location.pathname);
    if (found) {
      setCurrentSubpage(found.id);
    } else if (location.pathname.startsWith('/case3/social/')) {
      setCurrentSubpage('social');
    } else {
      setCurrentSubpage('dashboard');
    }
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const found = sidebarItems.find(item => 
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (found) {
        navigate(found.path);
        setSearchQuery('');
      }
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderSubpage = () => {
    switch (currentSubpage) {
      case 'dashboard':
        return <DashboardSubpage />;
      case 'management':
        return <ManagementSubpage />;
      case 'chat':
        return <ChatSubpage />;
      case 'markdown':
        return <MarkdownSubpage />;
      case 'mindmap':
        return <MindmapSubpage />;
      case 'video':
        return <VideoSubpage />;
      case 'social':
        return <SocialSubpage sidebarOpen={sidebarOpen} />;
      case 'forum':
        return <ForumSubpage />;
      case 'music':
        return <MusicSubpage />;
      default:
        return <DashboardSubpage />;
    }
  };

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -150]);
  const contentY = useTransform(scrollY, [0, 1000], [0, -50]);

  return (
    <div className="w-screen h-screen flex relative overflow-hidden" style={getBackgroundStyle()}>
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: backgroundY }}
      >
        {currentScheme.scheme.gradientOverlay?.map((overlay, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full animate-gradient-drift"
            style={{
              width: overlay.width,
              height: overlay.height,
              opacity: overlay.opacity,
              top: overlay.top,
              right: overlay.right,
              bottom: overlay.bottom,
              left: overlay.left,
              background: `radial-gradient(circle, ${overlay.color} 0%, transparent 70%)`,
              animationDelay: `${index * 2}s`,
              animationDuration: `${15 + index * 3}s`,
            }}
          />
        ))}
      </motion.div>

      <Case3Sidebar 
        sidebarOpen={sidebarOpen} 
        onToggle={toggleSidebar}
        currentSubpage={currentSubpage}
      />

      <motion.div 
        className={`flex-1 relative transition-all duration-300 ${sidebarOpen ? 'pl-[304px]' : 'pl-16'}`}
        style={{ y: contentY }}
      >
        <header className={`fixed top-0 right-0 h-16 z-40 px-6 flex items-center justify-end transition-all duration-300 ${sidebarOpen ? 'left-[304px]' : 'left-16'}`}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                placeholder=""
                className="input-glass pl-9 pr-4 py-2.5 text-sm w-64"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            </div>
            <Link to="/settings" className="glass-button text-sm flex items-center gap-2 hover:text-pink-700">
              <Settings className="w-4 h-4" />
              <span>设置</span>
            </Link>
            <Link to="/about" className="glass-button text-sm flex items-center gap-2 hover:text-pink-700">
              <Info className="w-4 h-4" />
              <span>关于</span>
            </Link>
            <Link to="/init" className="glass-button text-sm flex items-center gap-2 hover:text-pink-700">
              <Home className="w-4 h-4" />
              <span>Init</span>
            </Link>
            <UserAvatar />
          </div>
        </header>

        <main className="pt-20 px-6 pb-6 h-full overflow-auto">
          <div className="h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSubpage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="h-full"
              >
                {renderSubpage()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </motion.div>
    </div>
  );
}

export default Case3;