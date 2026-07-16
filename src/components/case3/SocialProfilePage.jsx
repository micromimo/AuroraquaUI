import { useState, useRef } from 'react';
import { MessageCircle, Repeat, Heart, MoreHorizontal, Edit3, ExternalLink, Calendar, UserPlus, UserCheck, X, ChevronLeft } from 'lucide-react';
import SocialPost from './SocialPost';
import { socialProfileUser, socialProfilePosts } from '../../data/case3/social';
import PillTabBar from '../ui/PillTabBar';
import ParticleEffect from '../ui/ParticleEffect';
import { FadeInCard } from '../ui/animations';

function SocialProfilePage({ onImageClick, onImageLoadFail }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [postsState, setPostsState] = useState(socialProfilePosts);
  const [followParticles, setFollowParticles] = useState({ active: false, x: 0, y: 0 });
  const followButtonRef = useRef(null);

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

  const handleLocalFollow = () => {
    if (followButtonRef.current) {
      const rect = followButtonRef.current.getBoundingClientRect();
      setFollowParticles({
        active: true,
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
    setIsFollowing(!isFollowing);
  };

  const tabs = [
    { id: 'posts', label: '贴文', count: socialProfileUser.posts },
    { id: 'replies', label: '回覆', count: 0 },
    { id: 'likes', label: '喜歡', count: 0 },
  ];

  return (
    <div className="min-h-full">
      <div className="sticky top-0 z-30 px-4 pb-2 bg-gradient-to-b from-background via-background/95 to-transparent">
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <button className="w-10 h-10 rounded-xl liquid-glass flex items-center justify-center text-body">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-bold text-heading">{socialProfileUser.name}</h2>
          <div className="w-10" />
        </div>

        <div className="max-w-3xl mx-auto">
          <FadeInCard className="liquid-glass rounded-2xl p-4 sticky top-0 z-30 backdrop-blur-md" delay={0.1}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden avatar-border">
                  <img src={socialProfileUser.avatar} alt={socialProfileUser.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-heading">{socialProfileUser.name}</h3>
                  <p className="text-sm text-muted">{socialProfileUser.handle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  ref={followButtonRef}
                  onClick={handleLocalFollow}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    isFollowing
                      ? 'bg-white/30 text-body'
                      : 'text-[#FAFAFA] hover:shadow-lg hover:shadow-pink-400/30'
                  }`}
                  style={!isFollowing ? {
                    background: 'linear-gradient(to right, #ec4899 0%, #FEBEBE 100%)'
                  } : {}}
                >
                  {isFollowing ? (
                    <>
                      <UserCheck className="w-4 h-4" />
                      <span>Followed</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>Follow</span>
                    </>
                  )}
                </button>
                <button className="w-9 h-9 rounded-xl bg-white/30 flex items-center justify-center text-body hover:bg-white/50 transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="w-9 h-9 rounded-xl bg-white/30 flex items-center justify-center text-body hover:bg-white/50 transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          </FadeInCard>
        </div>
      </div>

      <div className="px-4 pb-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <FadeInCard className="liquid-glass rounded-2xl p-5" delay={0.2}>
            <p className="text-sm text-body mb-4">{socialProfileUser.bio}</p>
            
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5 text-sm text-body">
                <Calendar className="w-4 h-4" />
                <span>加入于 {socialProfileUser.joined}</span>
              </div>
              {socialProfileUser.badges.map((badge, index) => (
                <span key={index} className="text-lg">{badge}</span>
              ))}
            </div>

            <div className="flex gap-6">
              <div className="cursor-pointer hover:text-blue-500 transition-colors">
              <span className="font-bold text-heading">{socialProfileUser.following}</span>
              <span className="text-sm text-muted ml-1">Follow中</span>
            </div>
            <div className="cursor-pointer hover:text-blue-500 transition-colors">
              <span className="font-bold text-heading">{socialProfileUser.followers}</span>
              <span className="text-sm text-muted ml-1">追隨者</span>
            </div>
            </div>
          </FadeInCard>

          <PillTabBar
            tabs={tabs}
            activeTab={activeTab}
            onChange={(id) => setActiveTab(id)}
          />

          <div className="space-y-4">
            {postsState.map((post) => (
              <SocialPost
                key={post.id}
                post={post}
                onLike={handleLike}
                onFollow={handleFollow}
                onRepost={handleRepost}
                onImageClick={onImageClick}
                onImageLoadFail={onImageLoadFail}
              />
            ))}
          </div>
        </div>
      </div>

      <ParticleEffect 
        active={followParticles.active} 
        x={followParticles.x} 
        y={followParticles.y}
        onComplete={() => setFollowParticles({ active: false, x: 0, y: 0 })}
      />
    </div>
  );
}

export default SocialProfilePage;