'use client';

import React from 'react';
import Link from 'next/link';

interface ChatPreviewProps {
  id: string;
  username: string;
  walletAddress: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
}

export const ChatPreview: React.FC<ChatPreviewProps> = ({
  id,
  username,
  walletAddress,
  lastMessage,
  timestamp,
  unreadCount
}) => {
  return (
    <Link href={`/chat/${id}`}>
      <div className="p-4 bg-white border-4 border-black hover:bg-gray-50 transition-colors cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#E2FF5C] rounded-full border-4 border-black flex items-center justify-center font-bold">
            {username.charAt(0)}
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">{username}</h3>
                <p className="text-xs font-mono text-gray-600">{walletAddress}</p>
              </div>
              <span className="text-sm text-gray-500">{timestamp}</span>
            </div>
            
            <div className="flex justify-between items-center mt-1">
              <p className="text-sm text-gray-600 truncate max-w-[70%]">{lastMessage}</p>
              {unreadCount && unreadCount > 0 && (
                <span className="bg-[#E2FF5C] px-2 py-1 rounded-full text-xs font-bold border-2 border-black">
                  {unreadCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}; 