import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, User } from 'lucide-react';

const initialMessages = [
  { id: 1, user: 'Chino', content: '这首歌真好听！', time: '刚刚', isLive: true },
  { id: 2, user: 'Sarah', content: '期待下一首', time: '1秒前', isLive: true },
  { id: 3, user: 'James', content: '支持原创音乐！', time: '2秒前', isLive: true },
  { id: 4, user: 'Emily', content: '画面太美了', time: '3秒前', isLive: true },
  { id: 5, user: 'Manami', content: '收藏了！', time: '5秒前', isLive: true },
];

const randomUsers = ['Luna', 'Alex', 'Riku', 'Yuki', 'Hana', 'Kaito', 'Miku', 'Sora'];
const randomMessages = [
  '好听！', '太棒了！', '支持！', '爱了爱了', '继续加油！', '325',
  '这首歌太治愈了', '循环播放中', '期待更多作品', '赞！', '好听哭了',
];

function LiveChat() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newMessage = {
        id: Date.now(),
        user: randomUsers[Math.floor(Math.random() * randomUsers.length)],
        content: randomMessages[Math.floor(Math.random() * randomMessages.length)],
        time: '刚刚',
        isLive: true,
      };
      setMessages(prev => [...prev.slice(-20), newMessage]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage = {
      id: Date.now(),
      user: '我',
      content: inputText,
      time: '刚刚',
      isLive: true,
    };
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const getRandomColor = (name) => {
    const colors = ['from-pink-400 to-rose-400', 'from-purple-400 to-violet-400', 'from-blue-400 to-cyan-400', 'from-green-400 to-emerald-400', 'from-orange-400 to-amber-400'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
      className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${isExpanded ? 'w-80' : 'w-48'}`}
    >
      <div className="liquid-glass rounded-2xl overflow-hidden shadow-xl">
        <div 
          className="flex items-center justify-between p-3 cursor-pointer hover:bg-white/10 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-bold text-heading">直播聊天</span>
            <span className="text-xs text-muted">({messages.length})</span>
          </div>
          <svg 
            className={`w-4 h-4 text-muted transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-80' : 'max-h-40'}`}>
          <div ref={messagesContainerRef} className="p-3 space-y-2 overflow-y-auto max-h-64 scrollbar-hide">
            {messages.map((message) => (
              <div key={message.id} className="flex gap-2">
                <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${getRandomColor(message.user)} flex items-center justify-center text-[8px] text-white shrink-0`}>
                  {message.user === '我' ? <User className="w-3 h-3" /> : message.user[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-medium text-heading">{message.user}</span>
                    <span className="text-[10px] text-muted">{message.time}</span>
                  </div>
                  <p className="text-xs text-body mt-0.5">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          {isExpanded && (
            <div className="p-3 border-t border-white/20">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="发送消息..."
                  className="flex-1 input-glass text-xs py-2"
                />
                <button type="submit" className="glass-button w-10 h-10 flex items-center justify-center p-0">
                  <Send className="w-4.5 h-4.5" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default LiveChat;