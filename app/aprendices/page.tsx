import React, { useState } from 'react';
import { ApprenticeCard } from '../components/ApprenticeCard';
import { ChatPreview } from '../components/ChatPreview';
import { ActivityView } from '../components/ActivityView';

const MOCK_APPRENTICES = [
  {
    username: '@UserK_651651',
    level: 'Beginner',
    interests: ['React', 'Web3', 'DeFi'],
    bio: 'Passionate about blockchain technology and eager to learn from experienced mentors.',
    avatarUrl: '/path/to/avatar.jpg',
  },
  {
    username: '@UserK_999999',
    level: 'Intermediate',
    interests: ['Solidity', 'NFTs'],
    bio: 'Learning smart contracts and NFT standards.',
    avatarUrl: '/path/to/avatar2.jpg',
  },
];

const mockChats = [
  {
    id: '1',
    username: 'Alice Smith',
    walletAddress: '0x9876...4321',
    lastMessage: 'Thanks for the great mentoring session!',
    timestamp: '9:45 AM',
    unreadCount: 0,
  },
];

const mockActivity = {
  username: 'Mentor User',
  walletAddress: '0x9999...8888',
  stats: { mentoring: 22, rating: 4.9, reviews: 18 },
  badges: [
    { id: '1', image: '/badges/mentor.png' },
    { id: '2', image: '/badges/expert.png' },
  ],
  reviews: [
    { username: 'John Doe', walletAddress: '0x1234...5678', text: 'Great mentor!', date: '1 day ago' },
  ],
};

type Section = 'apprentices' | 'messaging' | 'activity';
const sectionLabels: Record<Section, string> = {
  apprentices: 'Apprentices seeking help',
  messaging: 'Messaging',
  activity: 'Activity',
};

export default function ApprenticesPage() {
  const [currentSection, setCurrentSection] = useState<Section>('apprentices');
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      {/* Contextual dropdown menu */}
      <div className="relative mb-8 flex justify-center">
        <button
          className="px-6 py-3 bg-[#E2FF5C] border-4 border-black font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {sectionLabels[currentSection]}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </button>
        {menuOpen && (
          <div className="absolute top-full mt-2 w-56 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50">
            {(['apprentices', 'messaging', 'activity'] as Section[]).filter(s => s !== currentSection).map((section) => (
              <button
                key={section}
                className="block w-full text-left px-4 py-2 hover:bg-[#E2FF5C] font-bold"
                onClick={() => { setCurrentSection(section); setMenuOpen(false); }}
              >
                {sectionLabels[section]}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Section content */}
      {currentSection === 'apprentices' && (
        <div className="flex flex-col items-center">
          <div className="mb-8 w-full flex justify-center">
            <ApprenticeCard {...MOCK_APPRENTICES[currentIndex]} />
          </div>
          <div className="flex justify-center space-x-8">
            <button
              onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
              disabled={currentIndex === 0}
              className="w-16 h-16 bg-white border-4 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-2xl disabled:opacity-50"
            >
              &#60;
            </button>
            <button
              onClick={() => setCurrentIndex((i) => Math.min(i + 1, MOCK_APPRENTICES.length - 1))}
              disabled={currentIndex === MOCK_APPRENTICES.length - 1}
              className="w-16 h-16 bg-white border-4 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-2xl disabled:opacity-50"
            >
              &#62;
            </button>
          </div>
        </div>
      )}
      {currentSection === 'messaging' && (
        <div className="space-y-4">
          {mockChats.map((chat) => (
            <ChatPreview key={chat.id} {...chat} />
          ))}
        </div>
      )}
      {currentSection === 'activity' && (
        <ActivityView {...mockActivity} />
      )}
    </div>
  );
} 