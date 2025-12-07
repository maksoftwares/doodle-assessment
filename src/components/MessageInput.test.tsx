import { expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MessageInput from './MessageInput';

describe('MessageInput', () => {
  it('should render input and send button', () => {
    const mockOnSend = vi.fn();
    render(<MessageInput onSend={mockOnSend} userName="John" />);
    
    expect(screen.getByTestId('message-input')).toBeInTheDocument();
    expect(screen.getByTestId('send-button')).toBeInTheDocument();
  });

  it('should update input value when typing', async () => {
    const mockOnSend = vi.fn();
    const user = userEvent.setup();
    render(<MessageInput onSend={mockOnSend} userName="John" />);
    
    const input = screen.getByTestId('message-input');
    await user.type(input, 'Hello, World!');
    
    expect(input).toHaveValue('Hello, World!');
  });

  it('should call onSend when form is submitted', async () => {
    const mockOnSend = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    render(<MessageInput onSend={mockOnSend} userName="John" />);
    
    const input = screen.getByTestId('message-input');
    await user.type(input, 'Test message');
    
    const sendButton = screen.getByTestId('send-button');
    await user.click(sendButton);
    
    await waitFor(() => {
      expect(mockOnSend).toHaveBeenCalledWith('Test message');
    });
  });

  it('should clear input after successful send', async () => {
    const mockOnSend = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    render(<MessageInput onSend={mockOnSend} userName="John" />);
    
    const input = screen.getByTestId('message-input');
    await user.type(input, 'Test message');
    await user.click(screen.getByTestId('send-button'));
    
    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });

  it('should not submit empty message', async () => {
    const mockOnSend = vi.fn();
    const user = userEvent.setup();
    render(<MessageInput onSend={mockOnSend} userName="John" />);
    
    const sendButton = screen.getByTestId('send-button');
    await user.click(sendButton);
    
    expect(mockOnSend).not.toHaveBeenCalled();
  });

  it('should disable input and button while sending', async () => {
    const mockOnSend = vi.fn((): Promise<void> => new Promise(resolve => setTimeout(resolve, 100)));
    const user = userEvent.setup();
    render(<MessageInput onSend={mockOnSend} userName="John" />);
    
    const input = screen.getByTestId('message-input');
    const button = screen.getByTestId('send-button');
    
    await user.type(input, 'Test');
    await user.click(button);
    
    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Sending...');
  });

  it('should not submit whitespace-only messages', async () => {
    const mockOnSend = vi.fn();
    render(<MessageInput onSend={mockOnSend} userName="John" />);
    
    const input = screen.getByTestId('message-input');
    const form = screen.getByTestId('message-input-form');
    
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.submit(form);
    
    expect(mockOnSend).not.toHaveBeenCalled();
  });
});
