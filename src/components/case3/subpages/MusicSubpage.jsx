import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkipBack, SkipForward, Play, Pause, Volume2, VolumeX, Volume1, Repeat, Shuffle, Home, Search, Radio, Library, ListMusic, Heart, Airplay, MessageSquare, MoreHorizontal } from 'lucide-react';
import { defaultSongs } from '../../../data/case3/music';
import Slider from '../../ui/Slider';
import SidebarNavItem from '../SidebarNavItem';
import ParticleEffect from '../../ui/ParticleEffect';
import RippleButton from '../../ui/RippleButton';
import { FadeInCard, StaggerItem } from '../../ui/animations';

export default function MusicSubpage() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState('home');
  const [showLyrics, setShowLyrics] = useState(false);
  const [songs] = useState(defaultSongs);
  const [likedSongs, setLikedSongs] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [likeParticles, setLikeParticles] = useState({ active: false, x: 0, y: 0 });

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + 0.5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrev = () => {
    setCurrentSongIndex(prev => (prev === 0 ? songs.length - 1 : prev - 1));
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentSongIndex(prev => (prev === songs.length - 1 ? 0 : prev + 1));
    setProgress(0);
  };

  const handleVolumeChange = (value) => {
    setVolume(value);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleLike = (songId, e) => {
    e.stopPropagation();
    const wasLiked = likedSongs.has(songId);

    setLikedSongs(prev => {
      const newSet = new Set(prev);
      if (wasLiked) {
        newSet.delete(songId);
      } else {
        newSet.add(songId);
      }
      return newSet;
    });

    if (!wasLiked && e && e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      setLikeParticles({
        active: true,
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
  };

  const formatTime = (percent) => {
    const totalSeconds = currentSong.duration.split(':');
    const total = parseInt(totalSeconds[0]) * 60 + parseInt(totalSeconds[1]);
    const current = Math.floor((percent / 100) * total);
    const minutes = Math.floor(current / 60);
    const seconds = Math.floor(current % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const filteredSongs = songs.filter(song => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex gap-4">
      <FadeInCard className="w-64 shrink-0 liquid-glass rounded-2xl p-4 flex flex-col" delay={0.1}>
        {/* 左侧边栏 */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center shadow-lg avatar-border">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
          <span className="text-xl font-bold text-heading">Arisu Music</span>
        </div>

        <nav className="flex-1 space-y-1">
          {[
            { id: 'home', label: '首页', icon: Home },
            { id: 'browse', label: '浏览', icon: Search },
            { id: 'radio', label: '电台', icon: Radio },
            { id: 'library', label: '资料库', icon: Library },
            { id: 'playlists', label: '播放列表', icon: ListMusic },
          ].map(item => (
            <SidebarNavItem
              key={item.id}
              itemId={item.id}
              label={item.label}
              icon={item.icon}
              to="/case3/music"
              active={activeSidebar === item.id}
            />
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t border-white/20">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white text-sm font-medium avatar-border">
              M
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-heading truncate">micromimo🎀👿</p>
              <p className="text-xs text-muted">个人资料库</p>
            </div>
          </div>
        </div>
      </FadeInCard>

      {/* 主内容区 */}
      <FadeInCard className="flex-1 flex flex-col min-w-0 relative" delay={0.2}>
        <div className="liquid-glass rounded-2xl flex-1 flex flex-col min-h-0">
          {/* 顶部工具栏 */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-4">
              <div className="flex items-center p-1 rounded-full bg-white/10 border border-white/20">
              <button className="p-1.5 rounded-full hover:bg-white/20 text-muted transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <div className="w-px h-4 bg-white/20"></div>
              <button className="p-1.5 rounded-full hover:bg-white/20 text-muted transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
            </div>

            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  type="text"
                  placeholder="搜索歌曲、艺人或专辑..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/30 border border-white/40 text-sm text-heading placeholder-muted focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:bg-white/40 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <RippleButton
                onClick={() => setShowLyrics(!showLyrics)}
                className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 transition-all ${
                  showLyrics ? 'text-pink-700 bg-white/40' : 'text-body hover:text-heading hover:bg-white/20'
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                  <line x1="9" y1="19" x2="15" y2="19" />
                </svg>
                <span>歌词</span>
              </RippleButton>
            </div>
          </div>

          {/* 内容区 - 歌曲列表 + 歌词面板 */}
          <div className="flex-1 flex min-h-0 overflow-hidden h-full">
            {/* 歌曲列表 */}
            <motion.div 
              animate={{ width: showLyrics ? '50%' : '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="flex flex-col min-w-0 h-full"
            >
              <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 pb-24">
                <div className="space-y-2">
                {filteredSongs.map((song, index) => {
                  const originalIndex = songs.findIndex(s => s.id === song.id);
                  const isCurrentSong = originalIndex === currentSongIndex;
                  const isLiked = likedSongs.has(song.id);

                  return (
                    <StaggerItem
                      key={song.id}
                      index={index}
                      direction="up"
                      onClick={() => {
                        setCurrentSongIndex(originalIndex);
                        setProgress(0);
                        setIsPlaying(true);
                      }}
                      className={`group flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all ${
                        isCurrentSong
                          ? 'bg-gradient-to-r from-pink-400/20 to-purple-400/20 border border-pink-400/30'
                          : 'bg-white/10 hover:bg-white/20 border border-transparent'
                      }`}
                    >
                        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 relative shadow-lg">
                          {song.cover ? (
                            <img src={song.cover} alt={song.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-pink-400/80 to-purple-400/80 flex items-center justify-center text-2xl">
                              {song.thumbnail}
                            </div>
                          )}
                          {isCurrentSong && isPlaying && (
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center gap-0.5">
                              <div className="w-1 h-3 bg-pink-500 rounded-full animate-pulse" />
                              <div className="w-1 h-4 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
                              <div className="w-1 h-2 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                              <div className="w-1 h-5 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className={`text-sm font-medium truncate ${isCurrentSong ? 'text-pink-700' : 'text-heading'}`}>
                            {song.title}
                          </h4>
                          <p className="text-xs text-muted truncate">{song.artist}</p>
                        </div>

                        <div className="text-xs text-muted hidden sm:block">
                          {song.album}
                        </div>

                        <div className="text-xs text-muted w-12 text-right">
                          {song.duration}
                        </div>

                        <button
                          onClick={(e) => toggleLike(song.id, e)}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 ${
                            isLiked ? 'opacity-100 text-pink-600' : 'text-muted hover:text-pink-600'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                        </button>
                      </StaggerItem>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* 歌词面板 - 从右侧滑出 */}
            <AnimatePresence>
              {showLyrics && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '50%', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden border-l border-white/10"
                >
                  <div className="h-full flex flex-col items-center justify-center p-8">
                    <h3 className="text-2xl font-bold text-heading mb-2">{currentSong.title}</h3>
                    <p className="text-body mb-8">{currentSong.artist}</p>
                    <div className="space-y-4 text-center max-w-md w-full">
                      {currentSong.lyrics?.map((line, index) => {
                        const isActive = index === Math.floor(progress / 10);
                        return (
                          <motion.div
                            key={index}
                            animate={{ 
                              color: isActive ? '#be185d' : '#818cf8',
                              scale: isActive ? 1.05 : 1,
                              fontWeight: isActive ? 500 : 400
                            }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            className="text-lg"
                          >
                            {line}
                          </motion.div>
                        );
                      })}
                      {!currentSong.lyrics && (
                        <div className="text-muted">暂无歌词</div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 底部播放控制栏 - 移出 .liquid-glass，放到主内容区 */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="rounded-full px-3 py-1 shadow-2xl backdrop-blur-xl bg-white/10 border border-white/50">
            {/* 控制按钮 + 歌曲信息 + 功能按钮/音量 */}
            <div className="flex items-center gap-2">
              {/* 左侧控制按钮 */}
              <div className="flex items-center gap-0.5">
                <motion.button whileTap={{ scale: 0.85 }} className="p-1 rounded-full text-muted hover:text-heading hover:bg-white/20 transition-colors">
                  <Shuffle className="w-4 h-4" />
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.85 }}
                  onClick={handlePrev}
                  className="p-1 rounded-full text-muted hover:text-heading hover:bg-white/20 transition-colors"
                >
                  <SkipBack className="w-4 h-4" />
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePlayPause}
                  className={`w-8 h-8 rounded-full border border-white/30 bg-white/10 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all ${isPlaying ? 'animate-pulse-glow' : ''}`}
                  style={{ color: '#D298F2' }}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.85 }}
                  onClick={handleNext}
                  className="p-1 rounded-full text-muted hover:text-heading hover:bg-white/20 transition-colors"
                >
                  <SkipForward className="w-4 h-4" />
                </motion.button>
                <motion.button whileTap={{ scale: 0.85 }} className="p-1 rounded-full text-muted hover:text-heading hover:bg-white/20 transition-colors">
                  <Repeat className="w-4 h-4" />
                </motion.button>
              </div>

              {/* 中间歌曲信息 + 进度条 */}
              <div className="flex-1 min-w-0 flex flex-col items-center">
                <div className="flex items-center justify-between w-full">
                  <RippleButton 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setShowLyrics(!showLyrics)}
                  >
                    <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 shadow-lg transition-transform hover:scale-105">
                      {currentSong.cover ? (
                        <img src={currentSong.cover} alt={currentSong.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-pink-400/80 to-purple-400/80 flex items-center justify-center text-base">
                          {currentSong.thumbnail}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[10px] font-medium text-heading truncate">{currentSong.title}</h4>
                      <p className="text-[10px] text-muted truncate">{currentSong.artist}</p>
                    </div>
                  </RippleButton>
                  
                  {/* 喜欢按钮 - 放在进度条右上方 */}
                  <button 
                    onClick={(e) => toggleLike(currentSong.id, e)}
                    className={`p-1 rounded-full transition-colors ${
                      likedSongs.has(currentSong.id) ? 'text-pink-600 bg-white/30' : 'text-muted hover:text-heading hover:bg-white/20'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${likedSongs.has(currentSong.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                
                {/* 进度条 - 占满容器 */}
                <div className="w-full mt-0.5 slider-hover-thumb group">
                  <Slider
                    value={progress}
                    onChange={setProgress}
                    showValue={false}
                    showLabel={false}
                    thumbSize={{ width: 15, height: 8 }}
                    trackGradient={`linear-gradient(to right, #ec4899 0%, #FEBEBE ${progress}%, rgba(255, 255, 255, 0.25) ${progress}%, rgba(255, 255, 255, 0.25) 100%)`}
                  />
                </div>
              </div>

              {/* 右侧功能按钮和音量 */}
              <div className="flex items-center gap-0.5">
                <motion.button whileTap={{ scale: 0.85 }} className="p-1 rounded-full text-muted hover:text-heading hover:bg-white/20 transition-colors">
                  <Airplay className="w-4 h-4" />
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setShowLyrics(!showLyrics)}
                  className={`p-1 rounded-full transition-colors ${
                    showLyrics ? 'text-pink-600 bg-white/30' : 'text-muted hover:text-heading hover:bg-white/20'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                </motion.button>
                <motion.button whileTap={{ scale: 0.85 }} className="p-1 rounded-full text-muted hover:text-heading hover:bg-white/20 transition-colors">
                  <ListMusic className="w-4 h-4" />
                </motion.button>
                <motion.button whileTap={{ scale: 0.85 }} className="p-1 rounded-full text-muted hover:text-heading hover:bg-white/20 transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.85 }}
                  onClick={toggleMute}
                  className="p-1 rounded-full text-muted hover:text-heading hover:bg-white/20 transition-colors"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4" />
                  ) : volume < 50 ? (
                    <Volume1 className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </motion.button>
                <div className="w-14">
                  <Slider
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    showValue={false}
                    showLabel={false}
                    thumbSize={{ width: 12, height: 6 }}
                    trackGradient={`linear-gradient(to right, #ec4899 0%, #FEBEBE ${isMuted ? 0 : volume}%, rgba(255, 255, 255, 0.25) ${isMuted ? 0 : volume}%, rgba(255, 255, 255, 0.25) 100%)`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <ParticleEffect 
          active={likeParticles.active} 
          x={likeParticles.x} 
          y={likeParticles.y}
          onComplete={() => setLikeParticles({ active: false, x: 0, y: 0 })}
        />
      </FadeInCard>
    </div>
  );
}
