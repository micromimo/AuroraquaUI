import { useState } from 'react';
import { ChevronRight, Bell, Lock, Globe, Palette, Volume2, Shield, HelpCircle, LogOut, User, Mail, MapPin, Link, ChevronLeft, MessageSquare } from 'lucide-react';
import Switch from '../ui/Switch';
import { socialSettingsValues } from '../../data/case3/social';
import { FadeInCard } from '../ui/animations';

function SocialSettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [privateAccount, setPrivateAccount] = useState(false);

  const settingsGroups = [
    {
      title: '账户',
      items: [
        { id: 'profile', label: '编辑个人资料', icon: User, arrow: true },
        { id: 'email', label: '电子邮箱', icon: Mail, value: socialSettingsValues.email, arrow: true },
        { id: 'location', label: '位置', icon: MapPin, value: socialSettingsValues.location, arrow: true },
        { id: 'link', label: '个人链接', icon: Link, value: socialSettingsValues.link, arrow: true },
      ],
    },
    {
      title: '隐私与安全',
      items: [
        { id: 'private', label: '私密账户', icon: Lock, toggle: true, value: privateAccount, onChange: setPrivateAccount },
        { id: 'notifications', label: '通知', icon: Bell, toggle: true, value: notificationsEnabled, onChange: setNotificationsEnabled },
        { id: 'security', label: '安全设置', icon: Shield, arrow: true },
        { id: 'privacy', label: '隐私设置', icon: Globe, arrow: true },
      ],
    },
    {
      title: '偏好设置',
      items: [
        { id: 'sound', label: '声音', icon: Volume2, toggle: true, value: soundEnabled, onChange: setSoundEnabled },
        { id: 'theme', label: '主题', icon: Palette, value: socialSettingsValues.theme, arrow: true },
      ],
    },
    {
      title: '帮助与支持',
      items: [
        { id: 'help', label: '帮助中心', icon: HelpCircle, arrow: true },
        { id: 'feedback', label: '意见反馈', icon: MessageSquare, arrow: true },
      ],
    },
  ];

  return (
    <div className="min-h-full">
      <div className="sticky top-0 z-30 px-4 pb-2 bg-gradient-to-b from-background via-background/95 to-transparent">
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <button className="w-10 h-10 rounded-xl liquid-glass flex items-center justify-center text-body">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-bold text-heading">設定</h2>
          <div className="w-10" />
        </div>
      </div>

      <div className="px-4 pb-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {settingsGroups.flatMap((group, index) => {
            const groupElement = (
              <FadeInCard key={group.title} className="liquid-glass rounded-2xl overflow-hidden" delay={index * 0.1}>
                <div className="px-5 py-3 bg-white/10 border-b border-white/10">
                  <h4 className="text-sm font-bold text-heading">{group.title}</h4>
                </div>
                <div className="divide-y divide-white/10">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => item.onChange && item.onChange(!item.value)}
                        className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/10 transition-colors"
                      >
                        <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 text-left">
                          <span className="text-sm font-medium text-body">{item.label}</span>
                          {item.value && !item.toggle && (
                            <span className="text-xs text-muted ml-2">{item.value}</span>
                          )}
                        </div>
                        {item.toggle ? (
                          <Switch
                            checked={item.value}
                            onChange={() => item.onChange(!item.value)}
                          />
                        ) : item.arrow ? (
                          <ChevronRight className="w-5 h-5 text-muted" />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </FadeInCard>
            );
            if (index === 0) {
              return [
                groupElement,
                <FadeInCard key="logout" className="w-full liquid-glass rounded-2xl p-4 text-red-500 hover:text-red-600 hover:bg-red-500/10 transition-colors flex items-center gap-4" delay={0.4}>
                  <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <LogOut className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">登出</span>
                </FadeInCard>,
              ];
            }
            return [groupElement];
          })}
        </div>
      </div>
    </div>
  );
}

export default SocialSettingsPage;