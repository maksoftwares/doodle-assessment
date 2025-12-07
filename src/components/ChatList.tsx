import { forwardRef } from 'react';
import type { Message } from '../types';

interface ChatListProps {
  messages: Message[];
  loading: boolean;
  currentUserName: string;
}

const ChatList = forwardRef<HTMLDivElement, ChatListProps>(({ messages, loading, currentUserName }, ref) => {
  if (loading) return <div>Loading messages...</div>;

  return (
    <div className="chat-list" ref={ref}>
      {messages.map((msg) => {
        const isOwnMessage = msg.author === currentUserName;
        return (
          <div key={msg._id} className={`message ${isOwnMessage ? 'message-sent' : 'message-received'}`}>
            <div className="message-header">
              <strong>{msg.author}</strong>
              <span className="timestamp">
                {new Date(msg.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="message-text">{msg.message}</p>
          </div>
        );
      })}
    </div>
  );
});

ChatList.displayName = 'ChatList';

export default ChatList;