import { useState } from 'react';
import { Hash, Volume2, Users, Plus, Search } from 'lucide-react';
import PillTabNude from '../ui/PillTabNude';

const getRandomColor = (name) => {
  const colors = [
    'from-pink-400 to-rose-400',
    'from-purple-400 to-violet-400',
    'from-blue-400 to-cyan-400',
    'from-green-400 to-emerald-400',
    'from-orange-400 to-amber-400',
    'from-teal-400 to-cyan-400',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const statusColorMap = {
  online: 'bg-green-500',
  idle: 'bg-yellow-500',
  offline: 'bg-gray-400',
  dnd: 'bg-red-500',
};

export { getRandomColor, statusColorMap };

export default function ChatSidebar({
  servers = [],
  channels = [],
  activeChannel,
  onSelectChannel,
  contacts = [],
  activeContact,
  onSelectContact,
}) {
  const [view, setView] = useState('channels'); // 'channels' | 'dms'
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChannels = channels.filter((ch) =>
    ch.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const serverColors = [
    'from-pink-400 to-purple-400',
    'from-blue-400 to-cyan-400',
    'from-green-400 to-emerald-400',
    'from-orange-400 to-amber-400',
    'from-violet-400 to-purple-400',
    'from-red-400 to-rose-400',
    'from-teal-400 to-cyan-400',
    'from-indigo-400 to-blue-400',
  ];

  const demoContacts = [
    { id: 'c1', name: 'Auroráqua', avatar: 'A', color: 'from-pink-400 to-purple-400', status: 'online', unread: 0, time: '10:23', lastMessage: '欢迎来到服务器！' },
    { id: 'c2', name: 'Gaming Hub', avatar: 'G', color: 'from-blue-400 to-cyan-400', status: 'online', unread: 3, time: '09:45', lastMessage: '今晚开黑吗？' },
    { id: 'c3', name: 'Music Lounge', avatar: 'M', color: 'from-green-400 to-emerald-400', status: 'idle', unread: 0, time: '昨天', lastMessage: '推荐一首好听的歌' },
    { id: 'c4', name: 'Dev Talk', avatar: 'D', color: 'from-orange-400 to-amber-400', status: 'online', unread: 1, time: '08:12', lastMessage: '新版本发布了' },
    { id: 'c5', name: 'Study Group', avatar: 'S', color: 'from-violet-400 to-purple-400', status: 'offline', unread: 0, time: '周一', lastMessage: '下周考试加油' },
    { id: 'c6', name: 'Art Studio', avatar: 'A', color: 'from-red-400 to-rose-400', status: 'dnd', unread: 0, time: '周日', lastMessage: '新作品完成了' },
  ];

  return (
    <aside className="w-[260px] h-full min-h-0 flex flex-col shrink-0 self-stretch">
      <div className="liquid-glass rounded-2xl flex flex-col h-full min-h-0 overflow-hidden">
        {/* Header */}
        <div className="p-3 border-b border-white/20 shrink-0">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder=""
                className="w-full input-glass pl-8 pr-3 py-1.5 text-xs rounded-lg"
              />
            </div>
          </div>

          {/* View Toggle */}
          <PillTabNude
            activeTab={view}
            onChange={(id) => setView(id)}
            tabs={[
              { id: 'channels', label: '频道', icon: <Hash className="w-3.5 h-3.5 inline mr-1" /> },
              { id: 'dms', label: '私信', icon: <Users className="w-3.5 h-3.5 inline mr-1" /> },
            ]}
          />
        </div>

        {/* Servers (left mini rail) */}
        {view === 'channels' && (
          <div className="flex-1 flex min-h-0">
            {/* Server Rail */}
            <div className="w-[52px] shrink-0 border-r border-white/10 py-3 flex flex-col items-center gap-2 overflow-y-auto scrollbar-hide">
              <button className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold text-sm shadow-lg hover:rounded-xl transition-all duration-300 avatar-border">
                A
              </button>
              <div className="w-6 h-[2px] bg-white/20 rounded-full mx-auto" />
              {demoContacts.slice(0, 6).map((server, idx) => (
                <button
                  key={server.id}
                  className="w-10 h-10 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-sm shadow-md hover:rounded-xl transition-all duration-300 hover:scale-105 avatar-border"
                  style={{ background: `linear-gradient(135deg, ${server.color || serverColors[idx % serverColors.length]})` }}
                  title={server.name}
                >
                  {server.avatar}
                </button>
              ))}
              <button className="w-10 h-10 rounded-2xl border border-dashed border-white/30 flex items-center justify-center text-muted hover:border-white/60 hover:text-body transition-all duration-300 hover:rounded-xl">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Channel List */}
            <div className="flex-1 overflow-y-auto py-2 scrollbar-hide">
              <div className="px-2 mb-2">
                <div className="flex items-center justify-between px-2 py-1">
                  <span className="text-[10px] font-semibold text-muted uppercase tracking-wider">
                    服务器频道
                  </span>
                  <button className="text-muted hover:text-body transition-colors">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div className="space-y-0.5 px-1">
                {filteredChannels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => onSelectChannel?.(channel)}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-all duration-200 ${
                      activeChannel?.id === channel.id
                        ? 'bg-white/25 text-heading'
                        : 'text-muted hover:bg-white/10 hover:text-body'
                    }`}
                  >
                    {channel.type === 'voice' ? (
                      <Volume2 className="w-3.5 h-3.5 shrink-0" />
                    ) : (
                      <Hash className="w-3.5 h-3.5 shrink-0" />
                    )}
                    <span className="text-xs font-medium truncate">{channel.name}</span>
                    {channel.unread > 0 && (
                      <span className="ml-auto text-[10px] font-bold text-pink-500 bg-pink-500/20 px-1.5 py-0.5 rounded-full">
                        {channel.unread}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Direct Messages section */}
              <div className="px-2 mt-4 mb-2">
                <div className="flex items-center justify-between px-2 py-1">
                  <span className="text-[10px] font-semibold text-muted uppercase tracking-wider">
                    私信
                  </span>
                </div>
              </div>
              <div className="space-y-0.5 px-1">
                {filteredContacts.slice(0, 5).map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => onSelectContact?.(contact)}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-all duration-200 ${
                      activeContact?.id === contact.id
                        ? 'bg-white/25 text-heading'
                        : 'text-muted hover:bg-white/10 hover:text-body'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${getRandomColor(contact.name)} flex items-center justify-center text-[8px] text-white font-semibold avatar-border`}>
                        {contact.avatar}
                      </div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-[#1a1a2e] ${statusColorMap[contact.status] || 'bg-gray-400'}`} />
                    </div>
                    <span className="text-xs font-medium truncate">{contact.name}</span>
                    {contact.unread > 0 && (
                      <span className="ml-auto text-[10px] font-bold text-pink-500 bg-pink-500/20 px-1.5 py-0.5 rounded-full">
                        {contact.unread}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* DM List View */}
        {view === 'dms' && (
          <div className="flex-1 overflow-y-auto py-2 scrollbar-hide">
            <div className="px-2 mb-2">
              <div className="flex items-center justify-between px-2 py-1">
                <span className="text-[10px] font-semibold text-muted uppercase tracking-wider">
                  好友列表
                </span>
                <button className="text-muted hover:text-body transition-colors">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
            <div className="space-y-0.5 px-2">
              {filteredContacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => onSelectContact?.(contact)}
                  className={`w-full flex items-center gap-3 px-2 py-2 rounded-xl text-left transition-all duration-200 ${
                    activeContact?.id === contact.id
                      ? 'bg-white/25 text-heading'
                      : 'text-muted hover:bg-white/10 hover:text-body'
                  }`}
                >
                  <div className="relative shrink-0">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getRandomColor(contact.name)} flex items-center justify-center text-xs text-white font-semibold shadow-md avatar-border`}>
                      {contact.avatar}
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#1a1a2e] ${statusColorMap[contact.status] || 'bg-gray-400'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium truncate">{contact.name}</span>
                      <span className="text-[10px] text-muted">{contact.time}</span>
                    </div>
                    <p className="text-xs text-muted truncate mt-0.5">{contact.lastMessage}</p>
                  </div>
                  {contact.unread > 0 && (
                    <span className="text-[10px] font-bold text-white bg-pink-500 px-1.5 py-0.5 rounded-full">
                      {contact.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* User Panel (bottom) */}
        <div className="p-2 border-t border-white/20 shrink-0">
          <div className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white text-xs font-bold shadow-md shrink-0 avatar-border">
              M
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-heading truncate">micromimo🎀👿</div>
              <div className="text-[10px] text-muted">在线</div>
            </div>
            <div className="flex items-center gap-0.5">
              <button className="w-6 h-6 rounded-md hover:bg-white/20 flex items-center justify-center text-muted hover:text-body transition-colors">
                <Volume2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
