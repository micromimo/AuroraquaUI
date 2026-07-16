import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import SocialSidebar from '../SocialSidebar';
import SocialHeader from '../SocialHeader';
import SocialPost from '../SocialPost';
import SocialRightPanel from '../SocialRightPanel';
import SocialProfilePage from '../SocialProfilePage';
import SocialSettingsPage from '../SocialSettingsPage';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { socialPosts } from '../../../data/case3/social';
import { FadeInCard } from '../../ui/animations';
import { ToastContainer, useToast } from '../../ui/ToastContainer';

export default function SocialSubpage({ sidebarOpen }) {
  const location = useLocation();
  const { addToast } = useToast();
  const addToastRef = useRef(addToast);
  addToastRef.current = addToast;
  const [activeTab, setActiveTab] = useState('discover');
  const [activeSidebarItem, setActiveSidebarItem] = useState('home');
  const [postsState, setPostsState] = useState(socialPosts);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const imageErrorShownRef = useRef(false);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/profile')) {
      setActiveSidebarItem('profile');
    } else if (path.includes('/settings')) {
      setActiveSidebarItem('settings');
    } else {
      setActiveSidebarItem('home');
    }
  }, [location.pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const images = document.querySelectorAll('img[src^="http"]');
      const hasUnloaded = Array.from(images).some(img => !img.complete || img.naturalWidth === 0);
      if (hasUnloaded) {
        addToastRef.current('图片加载失败，请确保您不在中国｜朝鲜｜俄罗斯｜伊朗｜土库曼斯坦｜厄立特里亚', 'error', 0);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleLike = (postId) => {
    setPostsState(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    }));
  };

  const handleFollow = (postId) => {
    setPostsState(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isFollowed: !post.isFollowed,
        };
      }
      return post;
    }));
  };

  const handleRepost = (postId) => {
    setPostsState(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isReposted: !post.isReposted,
          reposts: post.isReposted ? post.reposts - 1 : post.reposts + 1,
        };
      }
      return post;
    }));
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  const handleImageLoadFail = () => {
    // 页面级 5 秒检测统一处理 toast，此处仅记录
    console.log('Image load failed');
  };

  const handleNewPost = () => {
    setShowNewPostModal(true);
  };

  const submitNewPost = () => {
    if (!newPostContent.trim()) return;
    const newPost = {
      id: Date.now(),
      user: 'micromimo',
      handle: 'micromimo.prysm',
      avatar: 'https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:vg4lorilmjn5ztscb5fh7y2n/bafkreiek3mwh7pqivzsviwnbnw6ewzqgsva4767rx2dbups24s3bf523a',
      time: '刚刚',
      content: newPostContent.trim(),
      image: '',
      likes: 0,
      comments: 0,
      shares: 0,
      reposts: 0,
      isLiked: false,
      isFollowed: false,
      isReposted: false,
    };
    setPostsState(prev => [newPost, ...prev]);
    setNewPostContent('');
    setShowNewPostModal(false);
  };

  const renderContent = () => {
    if (location.pathname.includes('/profile')) {
      return <SocialProfilePage onImageClick={handleImageClick} onImageLoadFail={handleImageLoadFail} />;
    }
    if (location.pathname.includes('/settings')) {
      return <SocialSettingsPage />;
    }

    return (
      <div className="min-h-full">
        <SocialHeader activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="mt-4 space-y-4">
          <AnimatePresence mode="wait">
            {postsState.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <SocialPost
                  post={post}
                  onLike={handleLike}
                  onFollow={handleFollow}
                  onRepost={handleRepost}
                  onImageClick={handleImageClick}
                  onImageLoadFail={handleImageLoadFail}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  return (
    <div className={`h-full flex relative transition-all duration-300 ${sidebarOpen ? 'xl:gap-0' : 'gap-6'}`}>
      <FadeInCard className={`${sidebarOpen ? 'hidden xl:flex' : 'hidden lg:flex'} w-72 flex-col shrink-0 sticky top-6 self-start z-30 h-[calc(100vh-7.5rem)] min-h-0`} delay={0.1}>
        <SocialSidebar activeItem={activeSidebarItem} onItemClick={setActiveSidebarItem} onNewPost={handleNewPost} />
      </FadeInCard>
      
      <button 
        onClick={() => setMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl liquid-glass flex items-center justify-center text-body md:top-6 md:left-6"
      >
        <Menu className="w-5 h-5" />
      </button>
      
      <main className="flex-1 px-6 py-6 min-h-0 overflow-y-auto scrollbar-hide relative">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {renderContent()}
        </motion.div>

        <ToastContainer />
      </main>

      {!location.pathname.includes('/profile') && !location.pathname.includes('/settings') && (
        <FadeInCard className={`${sidebarOpen ? 'hidden xl:flex' : 'hidden lg:flex'} w-full ${sidebarOpen ? 'max-w-[13rem]' : 'max-w-[22rem]'} min-w-0 flex-col shrink-0 sticky top-6 self-start z-30 max-h-[calc(100vh-7.5rem)]`} delay={0.2}>
          <SocialRightPanel />
        </FadeInCard>
      )}

      <AnimatePresence>
        {showImageModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              className="relative max-w-4xl max-h-[80vh] p-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              {selectedImage.startsWith('http') ? (
                <img
                  src={selectedImage}
                  alt="Full size"
                  className="max-w-full max-h-[80vh] object-contain rounded-2xl"
                />
              ) : (
                <div className="w-80 h-80 rounded-2xl bg-gradient-to-br from-pink-400/50 to-purple-400/50 flex items-center justify-center text-9xl">
                  {selectedImage}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-72 bg-white/95 backdrop-blur-xl p-6 shadow-2xl overflow-y-auto"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-heading">菜单</h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/20 text-body"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <SocialSidebar 
                activeItem={activeSidebarItem} 
                onItemClick={(item) => {
                  setActiveSidebarItem(item);
                  setMobileMenuOpen(false);
                }}
                onNewPost={handleNewPost}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showNewPostModal && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowNewPostModal(false)}
            />
            <motion.div 
              className="relative w-full max-w-lg liquid-glass rounded-2xl p-6 shadow-2xl"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-heading">新贴文</h3>
                <button 
                  onClick={() => setShowNewPostModal(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/20 text-muted hover:text-body transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="分享你的新鲜事..."
                  className="w-full h-32 rounded-xl border border-white/30 bg-white/40 p-4 text-sm text-heading placeholder:text-muted/60 resize-none focus:outline-none focus:ring-2 focus:ring-pink-400/50"
                  autoFocus
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => { setShowNewPostModal(false); setNewPostContent(''); }} 
                  className="flex-1 modal-action-button-secondary"
                >
                  取消
                </button>
                <button 
                  onClick={submitNewPost} 
                  className="flex-1 modal-action-button"
                  disabled={!newPostContent.trim()}
                >
                  发布
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}