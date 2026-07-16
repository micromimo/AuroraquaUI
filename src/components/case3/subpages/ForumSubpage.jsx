import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { forumCategories, defaultPosts, defaultNewPost } from '../../../data/case3/forum';
import AnimatedNumber from '../../ui/AnimatedNumber';
import { StaggerItem } from '../../ui/animations';

export default function ForumSubpage() {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [expandedPost, setExpandedPost] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [posts, setPosts] = useState(defaultPosts);
  const [newPost, setNewPost] = useState(defaultNewPost);
  const [replyInput, setReplyInput] = useState({});
  const [errors, setErrors] = useState({});

  const filteredPosts = selectedCategory === '全部' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const togglePost = (id) => {
    setExpandedPost(expandedPost === id ? null : id);
  };

  const handleLike = (id) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleReply = (postId) => {
    setReplyInput(prev => ({
      ...prev,
      [postId]: (prev[postId] || '')
    }));
  };

  const submitReply = (postId, content) => {
    if (!content.trim()) return;
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          replies: post.replies + 1,
          comments: [...post.comments, {
            id: Date.now(),
            author: 'Anonymous',
            content: content.trim(),
            time: '刚刚'
          }]
        };
      }
      return post;
    }));
    
    setReplyInput(prev => ({
      ...prev,
      [postId]: ''
    }));
  };

  const handleForward = (post) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.content.substring(0, 100) + '...',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${post.title}\n${window.location.href}`).then(() => {
        alert('链接已复制到剪贴板');
      });
    }
  };

  const validatePost = () => {
    const newErrors = {};
    if (!newPost.title.trim()) {
      newErrors.title = '请输入标题';
    } else if (newPost.title.length < 5) {
      newErrors.title = '标题至少需要5个字符';
    }
    if (!newPost.content.trim()) {
      newErrors.content = '请输入内容';
    } else if (newPost.content.length < 10) {
      newErrors.content = '内容至少需要10个字符';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePostSubmit = () => {
    if (!validatePost()) return;
    
    const post = {
      id: Date.now(),
      title: newPost.title.trim(),
      content: newPost.content.trim(),
      category: newPost.category,
      author: 'Anonymous',
      replies: 0,
      views: 0,
      time: '刚刚',
      likes: 0,
      isLiked: false,
      comments: []
    };
    
    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', category: '设计' });
    setShowPostModal(false);
    setErrors({});
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-heading">论坛</h2>
        <button 
          onClick={() => setShowPostModal(true)}
          className="glass-button hover:text-pink-700 flex items-center gap-2"
        >
          <span>+</span>
          <span>发帖</span>
        </button>
      </div>

      <div className="flex gap-2">
        {forumCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all relative overflow-hidden ${
              selectedCategory === category
                ? 'text-pink-700'
                : 'bg-white/30 text-body hover:bg-white/50'
            }`}
            style={selectedCategory === category ? {
              background: 'linear-gradient(135deg, rgba(255, 211, 219, 0.8), rgba(255, 211, 219, 0.4))',
              boxShadow: '0 0 20px rgba(244, 114, 182, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
            } : {}}
          >
            {selectedCategory === category && (
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </div>
            )}
            <span className="relative z-10">{category}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 liquid-glass rounded-2xl p-6 overflow-auto">
        <div className="space-y-4">
          {filteredPosts.map((post, index) => (
            <StaggerItem
              key={post.id}
              index={index}
              direction="up"
              className="rounded-xl bg-white/20 transition-all duration-300"
            >
              <div 
                onClick={() => togglePost(post.id)}
                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-white/30 transition-colors rounded-xl"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-heading hover:text-pink-600 transition-colors flex items-center gap-2">
                    {post.title}
                    <svg 
                      className={`w-4 h-4 text-muted transition-transform duration-300 ${expandedPost === post.id ? 'rotate-180' : ''}`} 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-muted mt-1">
                    <span className="px-2 py-0.5 rounded-lg bg-pink-100/50 text-pink-600">{post.category}</span>
                    <span>{post.author}</span>
                    <span>{post.time}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-body"><AnimatedNumber value={post.replies}>{post.replies}</AnimatedNumber> 回复</div>
                  <div className="text-xs text-muted"><AnimatedNumber value={post.views}>{post.views}</AnimatedNumber> 浏览</div>
                </div>
              </div>

              {expandedPost === post.id && (
                <div className="px-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-body text-sm leading-relaxed whitespace-pre-line">{post.content}</p>
                    
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/20">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleLike(post.id); }}
                        className={`flex items-center gap-1.5 text-sm transition-all ${post.isLiked ? 'text-pink-600' : 'text-muted hover:text-pink-600'}`}
                      >
                        <svg className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        <AnimatedNumber value={post.likes}>{post.likes}</AnimatedNumber>
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleReply(post.id); }}
                        className="flex items-center gap-1.5 text-sm text-muted hover:text-blue-600 transition-colors"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        <span>回复</span>
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleForward(post); }}
                        className="flex items-center gap-1.5 text-sm text-muted hover:text-green-600 transition-colors"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="18" cy="5" r="3" />
                          <circle cx="6" cy="12" r="3" />
                          <circle cx="18" cy="19" r="3" />
                          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                        </svg>
                        <span>转发</span>
                      </button>
                    </div>

                    {(replyInput[post.id] !== undefined) && (
                      <div className="mt-4">
                        <textarea
                          value={replyInput[post.id] || ''}
                          onChange={(e) => setReplyInput(prev => ({ ...prev, [post.id]: e.target.value }))}
                          placeholder="输入回复内容..."
                          className="w-full p-3 bg-white/30 rounded-xl border border-white/40 text-sm text-body resize-none focus:outline-none focus:border-pink-400/50 transition-all"
                          rows={3}
                        />
                        <div className="flex justify-end gap-2 mt-2">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setReplyInput(prev => ({ ...prev, [post.id]: undefined })); }}
                            className="modal-action-button-secondary text-sm"
                          >
                            取消
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); submitReply(post.id, replyInput[post.id]); }}
                            className="modal-action-button text-sm"
                          >
                            发送
                          </button>
                        </div>
                      </div>
                    )}

                    {post.comments.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-white/20 space-y-3">
                        <h4 className="text-sm font-medium text-body">回复 ({post.comments.length})</h4>
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="bg-white/10 rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-body">{comment.author}</span>
                              <span className="text-xs text-muted">{comment.time}</span>
                            </div>
                            <p className="text-sm text-muted">{comment.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              </StaggerItem>
            ))}
        </div>
      </div>

      <AnimatePresence>
        {showPostModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center modal-overlay"
            onClick={() => setShowPostModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl mx-4 modal-panel p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="modal-title">发布新帖</h3>
                <button onClick={() => setShowPostModal(false)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <svg className="w-5 h-5 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="modal-label mb-1.5 block">标题</label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                    className={`w-full p-3 bg-white/30 rounded-xl border text-sm text-heading focus:outline-none transition-all ${errors.title ? 'border-red-400/50' : 'border-white/40 focus:border-pink-400/50'}`}
                    placeholder="请输入帖子标题..."
                  />
                  {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="modal-label mb-1.5 block">分类</label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-3 bg-white/30 rounded-xl border border-white/40 text-sm text-heading focus:outline-none focus:border-pink-400/50 transition-all"
                  >
                    {forumCategories.filter(c => c !== '全部').map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="modal-label mb-1.5 block">内容</label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                    className={`w-full p-3 bg-white/30 rounded-xl border text-sm text-heading resize-none focus:outline-none transition-all ${errors.content ? 'border-red-400/50' : 'border-white/40 focus:border-pink-400/50'}`}
                    placeholder="请输入帖子内容..."
                    rows={6}
                  />
                  {errors.content && <p className="text-xs text-red-500 mt-1">{errors.content}</p>}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowPostModal(false)}
                    className="flex-1 modal-action-button-secondary"
                  >
                    取消
                  </button>
                  <button
                    onClick={handlePostSubmit}
                    className="flex-1 modal-action-button"
                  >
                    发布
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}