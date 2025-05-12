'use client';

import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { useEffect, useState } from 'react';

interface Profile {
  id: string;
  name: string;
  role: 'mentor' | 'learner';
  expertise?: string[];
  interests?: string[];
  experience?: string;
  goals?: string;
  level?: string;
  rating?: number;
  bio: string;
}

export default function ProfilePage({ params }: { params: { id: string } }) {
  const { context } = useMiniKit();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    // Aquí normalmente harías una llamada a la API
    // Por ahora usamos datos mock
    setProfile({
      id: params.id,
      name: 'Juan Pérez',
      role: 'mentor',
      expertise: ['Smart Contracts', 'Solidity', 'DeFi'],
      experience: '5 años',
      rating: 4.8,
      bio: 'Desarrollador Web3 apasionado por enseñar y compartir conocimiento.'
    });
  }, [params.id]);

  if (!profile) return <div>Cargando...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6 space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gray-200" />
          <div>
            <h1 className="text-xl font-bold">{profile.name}</h1>
            <p className="text-gray-600">{profile.role === 'mentor' ? 'Mentor' : 'Aprendiz'}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="font-semibold mb-2">Biografía</h2>
            <p className="text-gray-600">{profile.bio}</p>
          </div>

          {profile.role === 'mentor' ? (
            <>
              <div>
                <h2 className="font-semibold mb-2">Experiencia</h2>
                <p className="text-gray-600">{profile.experience}</p>
              </div>
              <div>
                <h2 className="font-semibold mb-2">Especialidades</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.expertise?.map((skill) => (
                    <span 
                      key={skill}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <h2 className="font-semibold mb-2">Nivel</h2>
                <p className="text-gray-600">{profile.level}</p>
              </div>
              <div>
                <h2 className="font-semibold mb-2">Objetivos</h2>
                <p className="text-gray-600">{profile.goals}</p>
              </div>
            </>
          )}
        </div>

        <button 
          onClick={() => window.location.href = `/chat/new?${profile.role}=${profile.id}`}
          className="w-full bg-blue-500 text-white py-2 rounded-lg"
        >
          Iniciar Conversación
        </button>
      </div>
    </div>
  );
} 