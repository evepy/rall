'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowLeft, Send } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isMine: boolean;
}

export default function ChatDetail({ params }: { params: { id: string } }) {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [newMessage, setNewMessage] = React.useState('');
  
  // Mock data - replace with real data fetching
  React.useEffect(() => {
    setMessages([
      {
        id: '1',
        sender: 'John Doe',
        content: 'Hey, I would love to learn more about Web3 development!',
        timestamp: '10:30 AM',
        isMine: false,
      },
      {
        id: '2',
        sender: 'Me',
        content: 'Of course! I specialize in smart contract development. What specific areas are you interested in?',
        timestamp: '10:32 AM',
        isMine: true,
      },
    ]);
  }, []);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      sender: 'Me',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMine: true,
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center p-4 border-b-4 border-black bg-white">
        <button 
          onClick={() => window.history.back()}
          className="mr-4 p-2 hover:bg-[#E2FF5C] border-2 border-black rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center">
          <div className="w-12 h-12 bg-[#E2FF5C] rounded-full border-4 border-black flex items-center justify-center font-bold">
            J
          </div>
          <div className="ml-3">
            <h2 className="font-bold">John Doe</h2>
            <p className="text-sm font-mono">0x1234...5678</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                ${message.isMine ? 'bg-[#E2FF5C]' : 'bg-white'}`}
            >
              <p className="mb-1">{message.content}</p>
              <p className="text-right text-xs">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t-4 border-black bg-white">
        <div className="flex gap-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-4 border-4 border-black focus:outline-none focus:ring-2 focus:ring-[#E2FF5C]"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="p-4 bg-[#E2FF5C] border-4 border-black hover:bg-[#d4ff2a] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
} 