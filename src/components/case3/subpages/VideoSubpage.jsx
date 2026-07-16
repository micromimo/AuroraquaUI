import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, MessageCircle } from 'lucide-react';
import LiveChat from '../LiveChat';
import ParticleEffect from '../../ui/ParticleEffect';
import AnimatedNumber from '../../ui/AnimatedNumber';
import { ToastContainer, useToast } from '../../ui/ToastContainer';
import PillTabBar from '../../ui/PillTabBar';
import { defaultComments, uploaderInfo, videoInfo, favoriteFolders, relatedVideos } from '../../../data/case3/video';
import { FadeInCard, StaggerItem } from '../../ui/animations';

function VideoSubpageInner() {
  const { addToast } = useToast();
  const [likes, setLikes] = useState(1250);
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(uploaderInfo.subscribers);
  const [showDescription, setShowDescription] = useState(false);
  const [sortBy, setSortBy] = useState('hot');
  const [showFavoriteMenu, setShowFavoriteMenu] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteFolder, setFavoriteFolder] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [comments, setComments] = useState(defaultComments);
  const [likeParticles, setLikeParticles] = useState({ active: false, x: 0, y: 0 });
  const [subscribeParticles, setSubscribeParticles] = useState({ active: false, x: 0, y: 0 });
  const [videoLoadFailed, setVideoLoadFailed] = useState(false);
  const likeButtonRef = useRef(null);
  const subscribeButtonRef = useRef(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollToTop();

    const observer = new MutationObserver(() => {
      requestAnimationFrame(scrollToTop);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    const scrollHandler = () => {
      if (window.scrollY !== 0) {
        scrollToTop();
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: false });

    const interval = setInterval(() => {
      if (window.scrollY !== 0) {
        scrollToTop();
      }
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      window.removeEventListener('scroll', scrollHandler);
      observer.disconnect();
    }, 2000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', scrollHandler);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let loaded = false;
    let timeoutId;

    const handleLoad = () => {
      loaded = true;
      clearTimeout(timeoutId);
    };

    iframe.addEventListener('load', handleLoad);

    timeoutId = setTimeout(() => {
      if (!loaded) {
        setVideoLoadFailed(true);
        addToast('影片加载失败，请确保您不在中国｜朝鲜｜伊朗｜土库曼斯坦｜厄立特里亚', 'error', 0);
      }
    }, 3000);

    return () => {
      iframe.removeEventListener('load', handleLoad);
      clearTimeout(timeoutId);
    };
  }, [addToast]);

  const uploader = {
    ...uploaderInfo,
    subscribers: subscriberCount,
  };

  const handleCommentLike = (commentId) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          isLiked: !comment.isLiked,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
        };
      }
      return comment;
    }));
  };

  const handleLike = (e) => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
      
      if (e && likeButtonRef.current) {
        const rect = likeButtonRef.current.getBoundingClientRect();
        setLikeParticles({
          active: true,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    }
  };

  const handleShare = () => {
    setShowShareModal(true);
    navigator.clipboard.writeText(window.location.href);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      setCommentText('');
    }
  };

  const handleSubscribe = () => {
    if (!isSubscribed) {
      setIsSubscribed(true);
      setSubscriberCount(prev => prev + 1);
      addToast('订阅成功！', 'check', 3000);
      
      if (subscribeButtonRef.current) {
        const rect = subscribeButtonRef.current.getBoundingClientRect();
        setSubscribeParticles({
          active: true,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    } else {
      setIsSubscribed(false);
      setSubscriberCount(prev => prev - 1);
    }
  };

  const handleFavorite = (folder) => {
    setIsFavorited(true);
    setFavoriteFolder(folder);
    setShowFavoriteMenu(false);
  };

  const toggleFavoriteMenu = () => {
    setShowFavoriteMenu(!showFavoriteMenu);
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === 'hot') {
      return b.likes - a.likes;
    } else {
      return b.timestamp - a.timestamp;
    }
  });

  const formatSubscribers = (count) => {
    if (count >= 10000) {
      return (count / 10000).toFixed(1) + '万';
    }
    return count.toLocaleString();
  };

  return (
      <div className="h-full flex flex-col gap-4 relative">
      <div className="flex-1 grid grid-cols-3 gap-4 min-h-0">
        <div className="col-span-2 flex flex-col gap-4 relative">
          <FadeInCard className="liquid-glass rounded-2xl p-2 overflow-hidden relative" delay={0.1}>
            {videoLoadFailed ? (
              <div className="w-full h-full aspect-video rounded-xl bg-white/10 flex items-center justify-center">
                <p className="text-sm text-muted">⚠️影片加载失败，请确保您不在中国｜朝鲜｜伊朗｜土库曼斯坦｜厄立特里亚</p>
              </div>
            ) : (
              <iframe
                ref={iframeRef}
                src="https://www.youtube-nocookie.com/embed/mkP5Myd-YZU"
                title="めめしぃ / すりぃ feat.可不"
                className="w-full h-full aspect-video rounded-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            )}
          </FadeInCard>

          <FadeInCard className="liquid-glass rounded-2xl p-4 space-y-4" delay={0.2}>
            <div>
              <h3 className="font-bold text-heading mb-2">{videoInfo.title}</h3>
              <div className="flex items-center gap-4 text-xs text-muted">
                <AnimatedNumber value={videoInfo.views}>{videoInfo.views}</AnimatedNumber> 观看
                <span>{videoInfo.duration}</span>
                <span>上传于 {videoInfo.uploadDate}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-sm text-white font-semibold avatar-border">
                  {uploader.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sm text-heading">{uploader.name}</span>
                    {uploader.verified && (
                      <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    )}
                  </div>
                  <AnimatedNumber value={subscriberCount}>
                    <span className="text-xs text-muted">{formatSubscribers(subscriberCount)} 订阅者</span>
                  </AnimatedNumber>
                </div>
              </div>
              <button
                ref={subscribeButtonRef}
                onClick={handleSubscribe}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  isSubscribed
                    ? 'bg-white/30 text-body hover:bg-white/50'
                    : 'text-white shadow-lg hover:shadow-xl'
                }`}
                style={!isSubscribed ? { background: 'linear-gradient(to right, #ec4899 0%, #FEBEBE 100%)' } : {}}
              >
                <svg className={`w-4 h-4 transition-transform duration-300 ${isSubscribed ? '' : 'hover:scale-110'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {isSubscribed ? (
                    <path d="M18 6 6 18M6 6l12 12"/>
                  ) : (
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  )}
                </svg>
                <span>{isSubscribed ? '已订阅' : '订阅'}</span>
              </button>
            </div>

            <div className="flex gap-3">
              <button 
                ref={likeButtonRef}
                onClick={handleLike}
                className={`glass-button text-sm flex items-center gap-2 transition-all duration-300 ${isLiked ? 'text-red-600 bg-red-500/10' : ''}`}
              >
                <svg className={`w-5 h-5 transition-all duration-300 ${isLiked ? 'fill-red-500 scale-110' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <AnimatedNumber value={likes}>{likes.toLocaleString()}</AnimatedNumber>
              </button>
              <button className="glass-button text-sm flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </button>
              <button onClick={handleShare} className="glass-button text-sm flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </button>
              <button 
                onClick={toggleFavoriteMenu}
                className={`glass-button text-sm flex items-center justify-center transition-all duration-300 ${isFavorited ? 'text-yellow-600 bg-yellow-500/10' : ''}`}
              >
                <Star className={`w-5 h-5 transition-all duration-300 ${isFavorited ? 'fill-yellow-500 scale-110' : ''}`} />
              </button>
            </div>

            <div className="border-t border-white/60 pt-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded bg-pink-100/50 text-pink-600 text-xs font-medium">{videoInfo.category}</span>
                {videoInfo.tags.map((tag, index) => (
                  <span key={index} className="text-xs text-pink-600">#{tag}</span>
                ))}
              </div>
              <motion.div
                className="overflow-hidden"
                initial={false}
                animate={{ height: showDescription ? 'auto' : '68px' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <div className="text-sm text-body leading-relaxed whitespace-pre-wrap">
                  {videoInfo.description}
                </div>
              </motion.div>
              {videoInfo.description.split('\n').length > 3 && (
                <button
                  onClick={() => setShowDescription(!showDescription)}
                  className="mt-2 text-xs text-pink-600 hover:text-pink-700 transition-colors flex items-center gap-1 group"
                >
                  <span>{showDescription ? '收起详细信息' : '展开详细信息'}</span>
                  <svg className={`w-3 h-3 transition-transform duration-300 ${showDescription ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              )}
            </div>
          </FadeInCard>

          <FadeInCard className="flex-1 liquid-glass rounded-2xl p-4 overflow-auto" delay={0.3}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-heading">评论 (<AnimatedNumber value={comments.length}>{comments.length}</AnimatedNumber>)</h3>
              <PillTabBar
                tabs={[
                  { id: 'hot', label: '按热度排序' },
                  { id: 'time', label: '按时间排序' }
                ]}
                activeTab={sortBy}
                onChange={setSortBy}
              />
            </div>
            <div className="mb-4">
              <form onSubmit={handleCommentSubmit} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-xs text-white shrink-0 avatar-border">
                  M
                </div>
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="写下你的评论..."
                  className="flex-1 input-glass text-sm"
                />
                <button type="submit" className="glass-button w-12 h-12 flex items-center justify-center p-0">
                  <Send className="w-6 h-6" />
                </button>
              </form>
            </div>
            <div className="space-y-4">
              {sortedComments.map((comment) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-xs text-white avatar-border">
                    {comment.user[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-heading">{comment.user}</span>
                      <span className="text-xs text-muted">{comment.time}</span>
                    </div>
                    <p className="text-sm text-body mt-1">{comment.content}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <button 
                        onClick={() => handleCommentLike(comment.id)}
                        className={`glass-button text-xs flex items-center gap-1 transition-all duration-300 ${
                          comment.isLiked 
                            ? 'text-pink-600 bg-pink-500/10' 
                            : 'text-pink-500 hover:text-pink-700'
                        }`}
                      >
                        <svg className={`w-3.5 h-3.5 transition-all duration-300 ${comment.isLiked ? 'fill-current scale-110' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        <motion.span 
                          key={comment.likes}
                          initial={{ scale: 1 }}
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 0.3 }}
                          className={`transition-all duration-300 ${comment.isLiked ? 'font-bold' : ''}`}
                        >
                          <AnimatedNumber value={comment.likes}>{comment.likes}</AnimatedNumber>
                        </motion.span>
                      </button>
                      <button 
                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                        className="glass-button flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>回复</span>
                      </button>
                    </div>
                    <AnimatePresence>
                      {replyingTo === comment.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <form 
                            onSubmit={(e) => { e.preventDefault(); setReplyingTo(null); }} 
                            className="flex gap-2 mt-3"
                          >
                            <input
                              type="text"
                              placeholder={`回复 ${comment.user}...`}
                              className="flex-1 input-glass text-xs"
                            />
                            <button type="submit" className="glass-button w-10 h-10 flex items-center justify-center p-0">
                              <Send className="w-5 h-5" />
                            </button>
                          </form>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeInCard>
          <ToastContainer />
        </div>

        <div className="flex flex-col gap-3 overflow-auto">
          {relatedVideos.map((video, index) => (
            <StaggerItem
              key={video.id}
              index={index}
              direction="up"
              whileHover={{ x: 4 }}
              className="flex gap-3 p-2 rounded-xl hover:bg-white/20 transition-colors cursor-pointer"
            >
              <motion.div 
                whileHover={{ scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="w-28 h-16 rounded-lg bg-gradient-to-r from-pink-400/80 to-purple-400/80 flex items-center justify-center text-2xl shrink-0 avatar-border overflow-hidden"
              >
                {video.thumbnail}
              </motion.div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-body truncate">{video.title}</h4>
                <div className="text-xs text-muted mt-1"><AnimatedNumber value={video.views}>{video.views}</AnimatedNumber> 观看</div>
                <div className="text-xs text-muted">{video.duration}</div>
              </div>
              </StaggerItem>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showShareModal && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ backgroundColor: 'rgba(0, 0, 0, 0)', backdropFilter: 'blur(0px)' }}
            animate={{ backgroundColor: 'rgba(0, 0, 0, 0.25)', backdropFilter: 'blur(12px)' }}
            exit={{ backgroundColor: 'rgba(0, 0, 0, 0)', backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="modal-panel p-6 w-full max-w-sm"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <h3 className="modal-title mb-5">分享视频</h3>
              <div className="modal-input p-3 mb-4">
                <input
                  type="text"
                  value={window.location.href}
                  readOnly
                  className="w-full bg-transparent text-sm text-body font-mono break-all outline-none"
                />
              </div>
              <p className="text-sm text-body mb-5 text-center">链接已复制到剪贴板！</p>
              <button 
                onClick={() => setShowShareModal(false)} 
                className="w-full modal-action-button"
              >
                关闭
              </button>
            </motion.div>
          </motion.div>
        )}
        {showFavoriteMenu && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ backgroundColor: 'rgba(0, 0, 0, 0)', backdropFilter: 'blur(0px)' }}
            animate={{ backgroundColor: 'rgba(0, 0, 0, 0.25)', backdropFilter: 'blur(12px)' }}
            exit={{ backgroundColor: 'rgba(0, 0, 0, 0)', backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="modal-panel p-6 w-full max-w-sm"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <h3 className="modal-title mb-5">选择收藏夹</h3>
              <div className="space-y-2">
                {favoriteFolders.map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => handleFavorite(folder)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/30 transition-colors text-sm"
                  >
                    <span className="text-xl">{folder.icon}</span>
                    <span className="text-body">{folder.name}</span>
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setShowFavoriteMenu(false)} 
                className="w-full mt-5 modal-action-button-secondary"
              >
                取消
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ParticleEffect 
        active={likeParticles.active} 
        x={likeParticles.x} 
        y={likeParticles.y}
        onComplete={() => setLikeParticles({ active: false, x: 0, y: 0 })}
      />
      <ParticleEffect 
        active={subscribeParticles.active} 
        x={subscribeParticles.x} 
        y={subscribeParticles.y}
        onComplete={() => setSubscribeParticles({ active: false, x: 0, y: 0 })}
      />

      <LiveChat />
    </div>
  );
}

export default function VideoSubpage() {
  return <VideoSubpageInner />;
}