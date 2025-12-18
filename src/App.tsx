import { useState, useEffect } from 'react';
import ChatList from './components/ChatList';
import MessageInput from './components/MessageInput';
import { fetchMessages, sendMessage } from './api/messages';
import type { Message } from './types';
import './App.css';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [showNameModal, setShowNameModal] = useState(true);

  const loadMessages = async () => {
    try {
      const data = await fetchMessages();
      // Sort messages by createdAt to ensure chronological order (oldest first)
      const sortedMessages = data.sort((a, b) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      setMessages(sortedMessages);
      setError(null);
    } catch (err) {
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
    
    // Optional: Poll for new messages every 5 seconds
    const interval = setInterval(loadMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = async (message: string) => {
    const newMessage = await sendMessage({ author: userName, message });
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleNameSubmit = (name: string) => {
    if (name.trim()) {
      setUserName(name.trim());
      setShowNameModal(false);
      localStorage.setItem('chatUserName', name.trim());
    }
  };

  // Check for saved username on mount
  useEffect(() => {
    const savedName = localStorage.getItem('chatUserName');
    if (savedName) {
      setUserName(savedName);
      setShowNameModal(false);
    }
  }, []);

  return (
    <div className="app">
      {showNameModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Welcome to Doodle Chat!</h2>
            <p>Please enter your name to continue</p>
            <form onSubmit={(e) => {
              e.preventDefault();
              const input = e.currentTarget.elements.namedItem('name') as HTMLInputElement;
              handleNameSubmit(input.value);
            }}>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                autoFocus
                required
                minLength={1}
                maxLength={50}
              />
              <button type="submit">Start Chatting</button>
            </form>
          </div>
        </div>
      )}
      
      {error && <div className="error">{error}</div>}
      
      <ChatList messages={messages} loading={loading} currentUserName={userName} />
      <MessageInput onSend={handleSend} userName={userName} />
    </div>
  );
}

export default App;