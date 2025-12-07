import { forwardRef } from 'react';
import type { Message } from '../types';

interface ChatListProps {
  messages: Message[];
  loading: boolean;
  currentUserName: string;
}

const ChatList = forwardRef<HTMLDivElement, ChatListProps>(({ messages, loading, currentUserName }, ref) => {
  if (loading) return <div>Loading messages...</div>;

  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day} ${month} ${year} ${hours}:${minutes}`;
  };

  return (
    <div className="chat-list" ref={ref}>
      {messages.map((msg) => {
        const isOwnMessage = msg.author === currentUserName;
        return (
          <div key={msg._id} className={`message ${isOwnMessage ? 'message-sent' : 'message-received'}`}>
            <div className="message-header">
              <strong>{msg.author}</strong>
            </div>
            <p className="message-text">{msg.message}</p>
              <span className="timestamp">
                {formatTimestamp(msg.createdAt)}
              </span>
          </div>
        );
      })}
    </div>
  );
});

ChatList.displayName = 'ChatList';

export default ChatList;