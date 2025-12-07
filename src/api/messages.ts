import type { Message, CreateMessagePayload } from '../types';

const API_BASE = 'http://localhost:3000/api/v1';
const AUTH_TOKEN = 'super-secret-doodle-token';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${AUTH_TOKEN}`,
};

export async function fetchMessages(): Promise<Message[]> {
  const response = await fetch(`${API_BASE}/messages`, { headers });
  if (!response.ok) throw new Error('Failed to fetch messages');
  return response.json();
}

export async function sendMessage(payload: CreateMessagePayload): Promise<Message> {
  const response = await fetch(`${API_BASE}/messages`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Failed to send message');
  return response.json();
}