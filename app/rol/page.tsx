"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

export default function RoleSelectionPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#E2FF5C]">
      <h1 className="text-3xl font-bold mb-8">Select your role</h1>
      <div className="flex gap-8">
        <button
          className="px-8 py-4 bg-white border-4 border-black font-bold text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#d4ff2a]"
          onClick={() => router.push('/mentores')}
        >
          I am an Apprentice
        </button>
        <button
          className="px-8 py-4 bg-white border-4 border-black font-bold text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#d4ff2a]"
          onClick={() => router.push('/aprendices')}
        >
          I am a Mentor
        </button>
      </div>
    </div>
  );
} 