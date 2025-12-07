import { useState, type FormEvent } from 'react';

interface MessageInputProps {
  onSend: (message: string) => Promise<void>;
  userName: string;
}

export default function MessageInput({ onSend, userName }: MessageInputProps) {
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
    <form onSubmit={handleSubmit} className="message-input">
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={sending}
        required
      />
      <button type="submit" disabled={sending}>
        {sending ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}