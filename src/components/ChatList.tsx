import type { Message } from '../types';
import './ChatList.css';

interface ChatListProps {
  messages: Message[];
  loading: boolean;
  currentUserName: string;
}

export default function ChatList({ messages, loading, currentUserName }: ChatListProps) {
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
    <div className="chat-list" data-testid="chat-list">
      {messages.map((msg) => {
        const isOwnMessage = msg.author === currentUserName;
        return (
          <div key={msg._id} className={`message ${isOwnMessage ? 'message-sent' : 'message-received'}`} data-testid="message-item">
            {!isOwnMessage && (
              <div className="message-header" data-testid="message-author">
                {msg.author}
              </div>
            )}
            <p className="message-text" data-testid="message-text">{msg.message}</p>
              <span className="timestamp" data-testid="message-timestamp">
                {formatTimestamp(msg.createdAt)}
              </span>
          </div>
        );
      })}
    </div>
  );
}