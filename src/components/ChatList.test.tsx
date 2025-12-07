import { expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChatList from './ChatList';
import type { Message } from '../types';

describe('ChatList', () => {
  const mockMessages: Message[] = [
    {
      _id: '1',
      message: 'Hello, World!',
      author: 'John',
      createdAt: '2025-12-07T10:00:00.000Z',
    },
    {
      _id: '2',
      message: 'How are you?',
      author: 'Jane',
      createdAt: '2025-12-07T10:05:00.000Z',
    },
  ];

  it('should render loading state', () => {
    render(<ChatList messages={[]} loading={true} currentUserName="John" />);
    expect(screen.getByText('Loading messages...')).toBeInTheDocument();
  });

  it('should render messages', () => {
    render(<ChatList messages={mockMessages} loading={false} currentUserName="John" />);
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
    expect(screen.getByText('How are you?')).toBeInTheDocument();
  });

  it('should display author name for received messages only', () => {
    render(<ChatList messages={mockMessages} loading={false} currentUserName="John" />);
    
    // Jane's message should show author (not current user)
    const authors = screen.getAllByTestId('message-author');
    expect(authors).toHaveLength(1);
    expect(authors[0]).toHaveTextContent('Jane');
  });

  it('should apply correct CSS classes for sent vs received messages', () => {
    render(<ChatList messages={mockMessages} loading={false} currentUserName="John" />);
    
    const messageItems = screen.getAllByTestId('message-item');
    expect(messageItems[0]).toHaveClass('message-sent'); // John's message
    expect(messageItems[1]).toHaveClass('message-received'); // Jane's message
  });

  it('should format timestamps correctly', () => {
    render(<ChatList messages={mockMessages} loading={false} currentUserName="John" />);
    
    const timestamps = screen.getAllByTestId('message-timestamp');
    expect(timestamps[0]).toHaveTextContent(/7 Dec 2025 \d{2}:\d{2}/);
  });

  it('should render empty list when no messages', () => {
    render(<ChatList messages={[]} loading={false} currentUserName="John" />);
    
    const chatList = screen.getByTestId('chat-list');
    expect(chatList).toBeInTheDocument();
    expect(screen.queryAllByTestId('message-item')).toHaveLength(0);
  });
});
