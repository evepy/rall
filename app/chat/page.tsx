'use client';

import React from 'react';
import { ChatPreview } from '../components/ChatPreview';

const mockChats = [
  {
    id: '1',
    username: 'John Doe',
    walletAddress: '0x1234...5678',
    lastMessage: 'Hey, I would love to learn more about Web3 development!',
    timestamp: '10:30 AM',
    unreadCount: 2,
  },
  {
    id: '2',
    username: 'Alice Smith',
    walletAddress: '0x9876...4321',
    lastMessage: 'Thanks for the great mentoring session!',
    timestamp: '9:45 AM',
    unreadCount: 0,
  },
  // Add more mock chats as needed
];

export default function ChatPage() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-gray-600">Your conversations with mentors and apprentices</p>
      </div>

      <div className="space-y-4">
        {mockChats.map((chat) => (
          <ChatPreview
            key={chat.id}
            id={chat.id}
            username={chat.username}
            walletAddress={chat.walletAddress}
            lastMessage={chat.lastMessage}
            timestamp={chat.timestamp}
            unreadCount={chat.unreadCount}
          />
        ))}
      </div>
    </div>
  );
} 