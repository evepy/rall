import React from 'react';
import { ActivityView } from '../components/ActivityView';

const mockActivity = {
  username: 'Usuario',
  walletAddress: '0x1111...2222',
  stats: { mentoring: 10, rating: 4.7, reviews: 8 },
  badges: [
    { id: '1', image: '/badges/mentor.png' },
    { id: '2', image: '/badges/expert.png' },
  ],
  reviews: [
    { username: 'Alice', walletAddress: '0xaaaa...bbbb', text: '¡Excelente!', date: '3 días atrás' },
  ],
};

export default function ActividadPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <ActivityView {...mockActivity} />
    </div>
  );
} 