import { useMemo } from 'react';
import { getRandomColor, statusColorMap } from './ChatSidebar';

export default function ChatMembersPanel({ members = [], title = '成员' }) {
  const grouped = useMemo(() => {
    const groups = {};
    members.forEach((m) => {
      const role = m.role || '在线';
      if (!groups[role]) groups[role] = [];
      groups[role].push(m);
    });
    return groups;
  }, [members]);

  const roleOrder = ['Admin', 'Moderator', 'Sponsor', 'Supporter', 'Contributor', 'Bot', '在线'];

  return (
    <aside className="w-[240px] h-full min-h-0 flex flex-col shrink-0">
      <div className="liquid-glass rounded-2xl flex flex-col h-full min-h-0 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-white/20 shrink-0">
          <h3 className="text-xs font-semibold text-muted uppercase tracking-wider">
            {title} — {members.length}
          </h3>
        </div>

        {/* Member List */}
        <div className="flex-1 overflow-y-auto py-2 scrollbar-hide">
          {roleOrder.filter((r) => grouped[r]).map((role) => (
            <div key={role} className="mb-3">
              <div className="px-4 py-1">
                <span className="text-[10px] font-semibold text-muted uppercase tracking-wider">
                  {role} — {grouped[role].length}
                </span>
              </div>
              <div className="space-y-0.5 px-2">
                {grouped[role].map((member) => (
                  <button
                    key={member.id}
                    className="w-full flex items-center gap-3 px-2 py-1.5 rounded-lg text-left transition-all duration-200 hover:bg-white/10 group"
                  >
                    <div className="relative shrink-0">
                      <div
                        className={`w-8 h-8 rounded-full bg-gradient-to-br ${getRandomColor(member.name)} flex items-center justify-center text-xs text-white font-semibold shadow-md avatar-border`}
                      >
                        {member.avatar}
                      </div>
                      <div
                        className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#1a1a2e] ${statusColorMap[member.status] || 'bg-gray-400'}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium text-heading truncate group-hover:text-pink-600 transition-colors">
                          {member.name}
                        </span>
                        {member.status === 'dnd' && (
                          <span className="text-[10px] text-red-400 shrink-0">DND</span>
                        )}
                      </div>
                      {member.status === 'online' && (
                        <span className="text-[10px] text-green-400">在线</span>
                      )}
                      {member.status === 'idle' && (
                        <span className="text-[10px] text-yellow-400">离开</span>
                      )}
                      {member.status === 'offline' && (
                        <span className="text-[10px] text-muted">离线</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
