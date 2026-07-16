import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Repeat, Heart, Share2, MoreHorizontal, ZoomIn } from 'lucide-react';
import ParticleEffect from '../ui/ParticleEffect';
import AnimatedNumber from '../ui/AnimatedNumber';
import RippleButton from '../ui/RippleButton';

function SocialPost({ post, onLike, onFollow, onRepost, onImageClick, onImageLoadFail }) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageRatio, setImageRatio] = useState(16 / 9);
  const [localShares, setLocalShares] = useState(post.shares);
  const [isShared, setIsShared] = useState(false);
  const [localReposts, setLocalReposts] = useState(post.reposts);
  const [isLocalReposted, setIsLocalReposted] = useState(post.isReposted);
  const [likeParticles, setLikeParticles] = useState({ active: false, x: 0, y: 0 });
  const [followParticles, setFollowParticles] = useState({ active: false, x: 0, y: 0 });
  const [repostParticles, setRepostParticles] = useState({ active: false, x: 0, y: 0 });
  const [commentLikes, setCommentLikes] = useState({});
  const likeButtonRef = useRef(null);
  const followButtonRef = useRef(null);
  const repostButtonRef = useRef(null);

  const handleCommentLike = (commentId) => {
    setCommentLikes(prev => {
      const current = prev[commentId] || 0;
      const newState = { ...prev, [commentId]: current + 1 };
      return newState;
    });
  };

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    setNewComment('');
    setShowComments(false);
  };

  useEffect(() => {
    setLocalShares(post.shares);
  }, [post.shares]);

  useEffect(() => {
    setLocalReposts(post.reposts);
    setIsLocalReposted(post.isReposted);
  }, [post.reposts, post.isReposted]);

  const handleLocalLike = () => {
    if (post.isLiked) {
      onLike && onLike(post.id);
    } else {
      onLike && onLike(post.id);
      if (likeButtonRef.current) {
        const rect = likeButtonRef.current.getBoundingClientRect();
        setLikeParticles({
          active: true,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    }
  };

  const handleLocalFollow = () => {
    if (followButtonRef.current) {
      const rect = followButtonRef.current.getBoundingClientRect();
      setFollowParticles({
        active: true,
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
    onFollow && onFollow(post.id);
  };

  const handleLocalRepost = () => {
    if (isLocalReposted) {
      onRepost && onRepost(post.id);
    } else {
      onRepost && onRepost(post.id);
      if (repostButtonRef.current) {
        const rect = repostButtonRef.current.getBoundingClientRect();
        setRepostParticles({
          active: true,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    }
  };

  const handleShareToggle = () => {
    if (isShared) {
      setLocalShares(prev => prev - 1);
      setIsShared(false);
    } else {
      setLocalShares(prev => prev + 1);
      setIsShared(true);
    }
  };

  const formatContent = (content) => {
    return content.replace(/#(\w+)/g, '<span class="text-blue-500 font-medium">#$1</span>');
  };

  return (
    <div className="liquid-glass rounded-2xl p-5 liquid-glass-hover-fade transition-shadow duration-500">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-full overflow-hidden avatar-border shrink-0">
          <img src={post.avatar} alt={post.user} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-heading">{post.user}</span>
            {post.handle && (
              <span className="text-sm text-muted">@{post.handle.replace(/^@/, '')}</span>
            )}
            {post.verified && (
              <span className="text-yellow-500 text-xs">✓</span>
            )}
          </div>
          <div className="text-xs text-muted mt-0.5">{post.time}</div>
        </div>

        <button 
          ref={followButtonRef}
          onClick={handleLocalFollow}
          className={`ml-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            post.isFollowed 
                ? 'bg-white/30 text-body' 
              : 'bg-gradient-to-r from-pink-400/80 to-purple-400/80 text-[#FAFAFA] hover:shadow-lg hover:shadow-pink-400/30'
          }`}
        >
          {post.isFollowed ? 'Followed' : '+ Follow'}
        </button>

        <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/20 text-muted hover:text-body transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <p 
        className="text-sm text-body leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
      />

      {post.image && post.image.startsWith('http') && (
        <div 
          className="w-full rounded-xl overflow-hidden mb-4 cursor-pointer group relative bg-gradient-to-br from-pink-400/20 to-purple-400/20 border border-white/20 flex items-center justify-center"
          onClick={() => onImageClick && onImageClick(post.image)}
          style={{ maxHeight: '600px', aspectRatio: imageRatio }}
        >
          {!imageLoaded && (
            <div className="w-full h-full bg-gradient-to-br from-pink-400/20 to-purple-400/20 animate-pulse flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-white/30 border-t-white/60 rounded-full animate-spin" />
            </div>
          )}
          <img 
            src={post.image} 
            alt="Post image" 
            className={`max-w-full max-h-[600px] object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={(e) => {
              setImageLoaded(true);
              const ratio = e.target.naturalWidth / e.target.naturalHeight;
              setImageRatio(ratio);
            }}
            onError={() => {
              onImageLoadFail?.();
            }}
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-lg">
              <ZoomIn className="w-6 h-6 text-pink-600" />
            </div>
          </div>
        </div>
      )}

      {post.image && !post.image.startsWith('http') && post.image !== '' && (
        <div className="w-full rounded-xl overflow-hidden mb-4">
          <div className="w-full aspect-video bg-gradient-to-br from-pink-400/30 to-purple-400/30 flex items-center justify-center text-6xl">
            {post.image}
          </div>
        </div>
      )}

      <div className="flex items-center gap-8 pt-4 border-t border-white/20">
        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 text-sm text-muted hover:text-blue-500 hover:bg-blue-500/10 px-3 py-2 rounded-xl transition-all"
        >
          <MessageCircle className="w-5 h-5" />
          <AnimatedNumber value={post.comments}>{post.comments}</AnimatedNumber>
        </button>

        <button 
          ref={repostButtonRef}
          onClick={handleLocalRepost}
          className={`flex items-center gap-2 text-sm transition-all px-3 py-2 rounded-xl ${
            isLocalReposted 
              ? 'text-green-500 bg-green-500/10' 
              : 'text-muted hover:text-green-500 hover:bg-green-500/10'
          }`}
        >
          <Repeat className={`w-5 h-5 ${isLocalReposted ? 'fill-current' : ''}`} />
          <AnimatedNumber value={localReposts}>{localReposts}</AnimatedNumber>
        </button>

        <button 
          ref={likeButtonRef}
          onClick={handleLocalLike}
          className={`flex items-center gap-2 text-sm transition-all px-3 py-2 rounded-xl ${
            post.isLiked 
              ? 'text-pink-500 bg-pink-500/10' 
              : 'text-muted hover:text-pink-500 hover:bg-pink-500/10'
          }`}
        >
          <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
          <AnimatedNumber value={post.likes}>{post.likes}</AnimatedNumber>
        </button>
      </div>

      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-white/20 space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-xs text-[#FAFAFA] shrink-0">
                  M
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit()}
                    placeholder="写下评论..."
                    className="input-glass w-full text-sm"
                  />
                </div>
                <button 
                  onClick={handleCommentSubmit}
                  className="glass-button text-sm px-4 text-blue-500"
                >
                  发送
                </button>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden avatar-border shrink-0">
                  <img src={post.avatar} alt={post.user} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-heading">{post.user}</span>
                    <span className="text-[10px] text-muted">刚刚</span>
                  </div>
                  <p className="text-sm text-body mt-1">Great work! 👏</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button 
                      onClick={() => handleCommentLike('demo-comment')}
                      className="flex items-center gap-1 text-xs text-muted hover:text-pink-500 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                      <motion.span
                        key={commentLikes['demo-comment']}
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.3 }}
                        className="inline-block"
                      >
                        <AnimatedNumber value={commentLikes['demo-comment'] || 0}>{(commentLikes['demo-comment'] || 0)}</AnimatedNumber>
                      </motion.span>
                    </button>
                    <button className="text-xs text-muted hover:text-blue-500 transition-colors">回复</button>
                  </div>
                </div>
              </div>
            </div>
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
        active={followParticles.active} 
        x={followParticles.x} 
        y={followParticles.y}
        onComplete={() => setFollowParticles({ active: false, x: 0, y: 0 })}
      />
      <ParticleEffect 
        active={repostParticles.active} 
        x={repostParticles.x} 
        y={repostParticles.y}
        onComplete={() => setRepostParticles({ active: false, x: 0, y: 0 })}
      />
    </div>
  );
}

export default SocialPost;
