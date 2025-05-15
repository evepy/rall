import React from 'react';
import { ActivityView } from '../../components/ActivityView';

const mockData = {
  username: 'John Doe',
  walletAddress: '0x1234...5678',
  stats: {
    mentoring: 15,
    rating: 4.8,
    reviews: 12,
  },
  badges: [
    { id: '1', image: '/badges/mentor.png' },
    { id: '2', image: '/badges/expert.png' },
    { id: '3', image: '/badges/helpful.png' },
    { id: '4', image: '/badges/innovative.png' },
    { id: '5', image: '/badges/trusted.png' },
    { id: '6', image: '/badges/leader.png' },
  ],
  reviews: [
    {
      username: 'Alice Smith',
      walletAddress: '0x9876...4321',
      text: 'Excellent mentor! Really helped me understand Web3 development concepts.',
      date: '2 days ago',
    },
    {
      username: 'Bob Johnson',
      walletAddress: '0x5432...8765',
      text: 'Great communication and very knowledgeable about smart contracts.',
      date: '1 week ago',
    },
    {
      username: 'Carol White',
      walletAddress: '0x3456...7890',
      text: 'Patient and thorough in explaining complex blockchain concepts.',
      date: '2 weeks ago',
    },
  ],
};

export default function ActivityPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <ActivityView {...mockData} />
    </div>
  );
} 