import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Paperclip, Smile, Send } from 'lucide-react';
import { defaultMessages, chatConfig, contacts, channels, members } from '../../../data/case3/chat';
import ChatSidebar from '../ChatSidebar';
import ChatMembersPanel from '../ChatMembersPanel';
import { FadeInCard } from '../../ui/animations';

function ChatArea({ contact, messages, inputValue, onInputChange, onSend, onAttach, onEmoji }) {
  const fileInputRef = useRef(null);

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onAttach) {
      onAttach(file);
    }
    e.target.value = '';
  };

  return (
    <div className="h-full flex flex-col gap-4 relative">
      {/* Header - Contact Info */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg shadow-lg avatar-border">
          {contact.avatar}
        </div>
        <div>
          <h2 className="text-lg font-bold text-heading">{contact.name}</h2>
          <div className="flex items-center gap-2 text-xs text-muted">
            <div className={`w-2 h-2 rounded-full ${contact.status === 'online' ? 'bg-green-500' : contact.status === 'idle' ? 'bg-yellow-500' : 'bg-gray-400'}`} />
            <span>{contact.status === 'online' ? 'Online' : contact.status === 'idle' ? 'Idle' : 'Offline'}</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 liquid-glass rounded-2xl p-6 overflow-auto space-y-4 min-h-0">
        {messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.3, 
              delay: index * 0.05,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className={`flex gap-3 ${msg.isMe ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-semibold text-sm shrink-0 shadow-md avatar-border ${
                msg.isMe
                  ? 'bg-gradient-to-br from-blue-400 to-cyan-400'
                  : 'bg-gradient-to-br from-pink-400 to-purple-400'
              }`}
            >
              {msg.isMe ? 'Me' : contact.avatar}
            </div>
            <div className={`max-w-[70%] ${msg.isMe ? 'items-end' : 'items-start'}`}>
              <div
                className={`px-4 py-3 rounded-2xl ${
                  msg.isMe
                    ? 'bg-gradient-to-r from-pink-400/80 to-purple-400/80 text-white rounded-br-md'
                    : 'bg-white/50 text-body rounded-bl-md'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
              <div className={`text-[10px] text-muted mt-1 ${msg.isMe ? 'text-right' : ''}`}>
                {msg.time}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input - Capsule shape */}
      <div className="shrink-0 pb-1">
        <div className="liquid-glass rounded-full px-2 py-2 flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            onClick={handleAttachmentClick}
            className="w-9 h-9 rounded-full flex items-center justify-center text-muted hover:text-heading hover:bg-white/20 transition-colors shrink-0"
            title="附件"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSend()}
            placeholder="输入消息..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-heading placeholder:text-muted h-9 px-2"
          />

          <button
            onClick={onEmoji}
            className="w-9 h-9 rounded-full flex items-center justify-center text-muted hover:text-heading hover:bg-white/20 transition-colors shrink-0"
            title="表情"
          >
            <Smile className="w-4 h-4" />
          </button>
          <button
            onClick={onSend}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0 transition-all relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 211, 219, 0.8), rgba(255, 211, 219, 0.4))',
              boxShadow: 'rgba(244, 114, 182, 0.3) 0px 0px 20px, rgba(255, 255, 255, 0.6) 0px 1px 0px inset',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = 'rgba(244, 114, 182, 0.5) 0px 0px 30px, rgba(255, 255, 255, 0.7) 0px 1px 0px inset';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'rgba(244, 114, 182, 0.3) 0px 0px 20px, rgba(255, 255, 255, 0.6) 0px 1px 0px inset';
            }}
          >
            <Send className="w-4 h-4 relative z-10" style={{ color: '#be185d' }} />
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              style={{ animation: 'none' }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ChatSubpage() {
  const [messages, setMessages] = useState(defaultMessages);
  const [inputValue, setInputValue] = useState('');
  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [activeChannel, setActiveChannel] = useState(null);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMessage = {
      id: messages.length + 1,
      user: 'Me',
      content: inputValue,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };
    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const handleAttach = (file) => {
    const newMessage = {
      id: messages.length + 1,
      user: 'Me',
      content: `[附件] ${file.name}`,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };
    setMessages([...messages, newMessage]);
  };

  const handleEmoji = () => {
    const emojis = ['😀', '😂', '😍', '🤔', '👍', '👋', '🎉', '🔥'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    setInputValue((prev) => prev + randomEmoji);
  };

  const handleSelectContact = (contact) => {
    setActiveContact(contact);
    setActiveChannel(null);
    setMessages(defaultMessages);
  };

  const handleSelectChannel = (channel) => {
    setActiveChannel(channel);
    setActiveContact(null);
    setMessages(defaultMessages);
  };

  const servers = [
    { id: 'aurora', name: 'Auroráqua', color: 'from-pink-400 to-purple-400' },
  ];

  return (
    <div className="h-full flex gap-4 min-h-0 items-stretch">
      {/* Left Sidebar */}
      <FadeInCard className="shrink-0 h-full min-h-0" delay={0.1}>
        <ChatSidebar
          servers={servers}
          channels={channels}
          activeChannel={activeChannel}
          onSelectChannel={handleSelectChannel}
          contacts={contacts}
          activeContact={activeContact}
          onSelectContact={handleSelectContact}
        />
      </FadeInCard>

      {/* Chat Area - Preserved Original Div */}
      <div className="flex-1 min-h-0 h-full">
        <ChatArea
          contact={activeContact}
          messages={messages}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSend={handleSend}
          onAttach={handleAttach}
          onEmoji={handleEmoji}
        />
      </div>

      {/* Right Members Panel */}
      <FadeInCard className="shrink-0 h-full min-h-0" delay={0.2}>
        <ChatMembersPanel members={members} title="成员" />
      </FadeInCard>
    </div>
  );
}
