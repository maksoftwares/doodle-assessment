import { useState, type FormEvent } from 'react';

interface MessageInputProps {
  onSend: (message: string) => Promise<void>;
  userName: string;
}

export default function MessageInput({ onSend }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSending(true);
    try {
      await onSend(message);
      setMessage('');
    } catch (error) {
      alert('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-input" data-testid="message-input-form">
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={sending}
        required
        data-testid="message-input"
      />
      <button type="submit" disabled={sending} data-testid="send-button">
        {sending ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}