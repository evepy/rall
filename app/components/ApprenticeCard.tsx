import React from 'react';
import { Card } from "@/components/ui/card";

interface ApprenticeCardProps {
  username: string;
  level: string;
  interests: string[];
  bio: string;
  avatarUrl?: string;
}

export const ApprenticeCard: React.FC<ApprenticeCardProps> = ({
  username,
  level,
  interests,
  bio,
  avatarUrl
}) => {
  return (
    <Card className="flex-shrink-0 w-72 p-4 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
      {/* Avatar and Level */}
      <div className="relative mb-4">
        <div className="w-full h-40 bg-gray-200 rounded-lg border-4 border-black overflow-hidden">
          {avatarUrl ? (
            <img src={avatarUrl} alt={username} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-[#E2FF5C] flex items-center justify-center">
              <span className="text-4xl font-bold">{username.charAt(0)}</span>
            </div>
          )}
        </div>
        <div className="absolute top-2 right-2 bg-white border-4 border-black rounded-full px-3 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {level}
        </div>
      </div>

      {/* Username */}
      <h3 className="text-xl font-bold mb-2">{username}</h3>

      {/* Interest Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {interests.map((tag, index) => (
          <span 
            key={index} 
            className="px-3 py-1 bg-[#E2FF5C] border-2 border-black rounded-full text-sm font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Bio */}
      <p className="text-gray-700 line-clamp-3">{bio}</p>
    </Card>
  );
}; 