export const defaultMessages = [
  { id: 1, user: 'Manami', content: 'Hello, how can I help you today?', time: '10:23', isMe: false },
  { id: 2, user: 'Me', content: 'Hi, I need help with product setup.', time: '10:24', isMe: true },
  { id: 3, user: 'Manami', content: 'Sure! Which product are you using?', time: '10:25', isMe: false },
  { id: 4, user: 'Me', content: 'The latest model. I am having issues with the settings.', time: '10:26', isMe: true },
  { id: 5, user: 'Manami', content: 'Let me guide you step by step. First, please ensure you are connected to the network...', time: '10:27', isMe: false },
];

export const chatConfig = {
  contactName: 'Manami',
  isOnline: true,
};

export const contacts = [
  { id: 'manami', name: 'Manami', avatar: 'M', status: 'online', lastMessage: 'Let me guide you step by step...', time: '10:27', unread: 0 },
  { id: 'kaito', name: 'Kaito', avatar: 'K', status: 'online', lastMessage: 'Sounds good!', time: '09:15', unread: 2 },
  { id: 'luna', name: 'Luna', avatar: 'L', status: 'idle', lastMessage: 'See you tomorrow.', time: '昨天', unread: 0 },
  { id: 'yuki', name: 'Yuki', avatar: 'Y', status: 'offline', lastMessage: 'Thanks for the help.', time: '昨天', unread: 0 },
  { id: 'hina', name: 'Hina', avatar: 'H', status: 'online', lastMessage: 'Can we reschedule?', time: '星期一', unread: 1 },
  { id: 'rio', name: 'Rio', avatar: 'R', status: 'offline', lastMessage: 'Got it.', time: '星期日', unread: 0 },
];

export const channels = [
  { id: 'general', name: 'general', type: 'text' },
  { id: 'random', name: 'random', type: 'text' },
  { id: 'support', name: 'support', type: 'text' },
  { id: 'voice', name: 'Voice Chat', type: 'voice' },
];

export const members = [
  { id: 'blahaj', name: 'Blåhaj', role: 'Admin', status: 'online', avatar: 'B' },
  { id: 'candy', name: 'Candy', role: 'Moderator', status: 'online', avatar: 'C' },
  { id: 'iamnumber4', name: 'iamnumber4', role: 'Moderator', status: 'idle', avatar: 'i' },
  { id: 'esmil', name: 'esmil', role: 'Sponsor', status: 'offline', avatar: 'e' },
  { id: 'aexvir', name: 'aexvir', role: 'Supporter', status: 'online', avatar: 'a' },
  { id: 'helloyunho', name: 'helloyunho', role: 'Contributor', status: 'idle', avatar: 'h' },
  { id: 'marcprux', name: 'marcprux', role: 'Contributor', status: 'offline', avatar: 'm' },
  { id: 'dyno', name: 'Dyno', role: 'Bot', status: 'online', avatar: 'D' },
  { id: 'nqn', name: 'NQN', role: 'Bot', status: 'online', avatar: 'N' },
];
