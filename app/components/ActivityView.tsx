import React from 'react';
import Image from 'next/image';

interface ActivityViewProps {
  username: string;
  walletAddress: string;
  stats: {
    mentoring: number;
    rating: number;
    reviews: number;
  };
  badges: Array<{
    id: string;
    image: string;
  }>;
  reviews: Array<{
    username: string;
    walletAddress: string;
    text: string;
    date: string;
  }>;
}

export const ActivityView: React.FC<ActivityViewProps> = ({
  username,
  walletAddress,
  stats,
  badges,
  reviews
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Profile Section */}
      <div className="relative">
        <div className="w-32 h-32 mx-auto rounded-full border-4 border-black overflow-hidden bg-[#E2FF5C]">
          <div className="w-full h-full flex items-center justify-center text-4xl font-bold">
            {username.charAt(0)}
          </div>
        </div>
        <h2 className="text-center mt-4 text-2xl font-bold">{username}</h2>
        <p className="text-center text-sm font-mono">{walletAddress}</p>
      </div>

      {/* Stats Section */}
      <div className="flex justify-center gap-4">
        <div className="w-24 p-3 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-3xl font-bold text-center">{stats.mentoring}</p>
          <p className="text-xs text-center">Nº Mentoring</p>
        </div>
        <div className="w-24 p-3 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-3xl font-bold text-center">{stats.rating}</p>
          <p className="text-xs text-center">Average rating</p>
        </div>
        <div className="w-24 p-3 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-3xl font-bold text-center">{stats.reviews}</p>
          <p className="text-xs text-center">Nº reviews</p>
        </div>
      </div>

      {/* Badges Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">List Badges</h3>
          <button className="text-sm font-bold hover:underline">See all</button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {badges.map((badge) => (
            <div 
              key={badge.id}
              className="aspect-square bg-white border-4 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="w-full h-full bg-[#E2FF5C] flex items-center justify-center">
                {/* Placeholder for badge image */}
                <div className="w-12 h-12 bg-black/10"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">List Reviews</h3>
          <button className="text-sm font-bold hover:underline">See all</button>
        </div>
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div 
              key={index}
              className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-[#E2FF5C] rounded-full border-2 border-black flex items-center justify-center font-bold">
                  {review.username.charAt(0)}
                </div>
                <div>
                  <p className="font-bold">{review.username}</p>
                  <p className="text-xs font-mono">{review.walletAddress}</p>
                </div>
              </div>
              <p className="mb-2">{review.text}</p>
              <p className="text-right text-sm">{review.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 