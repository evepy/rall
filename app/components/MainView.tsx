import { MentorCard } from './MentorCard';
import { LearnerCard } from './LearnerCard';
import { Progress } from './Progress';
import { useCallback } from 'react';
import { Button } from './DemoComponents';
import { useAuthenticate } from '@coinbase/onchainkit/minikit';
import { useRouter } from 'next/navigation';

// Datos de ejemplo
const MOCK_MENTORS = [
  {
    id: '1',
    name: 'Juan Pérez',
    expertise: ['Smart Contracts', 'Solidity', 'DeFi'],
    experience: '5 años',
    rating: 4.8
  },
  {
    id: '2',
    name: 'María García',
    expertise: ['Frontend', 'React', 'Web3'],
    experience: '3 años',
    rating: 4.9
  },
  {
    id: '3',
    name: 'Carlos Rodríguez',
    expertise: ['NFTs', 'GameFi', 'Unity'],
    experience: '4 años',
    rating: 4.7
  }
];

const MOCK_LEARNERS = [
  {
    id: '1',
    name: 'Ana Martínez',
    interests: ['Frontend', 'Web3'],
    goals: 'Aprender desarrollo de dApps',
    level: 'Principiante'
  },
  {
    id: '2',
    name: 'Luis González',
    interests: ['Smart Contracts', 'DeFi'],
    goals: 'Crear mi primer contrato inteligente',
    level: 'Intermedio'
  },
  {
    id: '3',
    name: 'Sofía Ramírez',
    interests: ['NFTs', 'GameFi'],
    goals: 'Desarrollar mi primer juego blockchain',
    level: 'Principiante'
  }
];

interface MainViewProps {
  userRole: 'mentor' | 'learner';
}

export function MainView({ userRole }: MainViewProps) {
  const { signIn } = useAuthenticate('https://rall-six.vercel.app');
  const handleSignIn = useCallback(async () => {
    const result = await signIn();
    if (result) console.log('Authenticated:', result);
  }, [signIn]);

  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">
          {userRole === 'mentor' ? 'Aprendices Interesados' : 'Mentores Disponibles'}
        </h2>
        <div className="flex items-center space-x-2">
          <button className="text-sm text-blue-500">Filtrar</button>
        </div>
      </div>

      <div className="space-y-4">
        {userRole === 'mentor' 
          ? MOCK_LEARNERS.map(learner => (
              <LearnerCard key={learner.id} {...learner} />
            ))
          : MOCK_MENTORS.map(mentor => (
              <MentorCard key={mentor.id} {...mentor} />
            ))
        }
      </div>

      <Progress 
        points={userRole === 'mentor' ? 750 : 500}
        completedSessions={userRole === 'mentor' ? 15 : 12}
        feedback={[
          {
            text: userRole === 'mentor' 
              ? "Excelente mentor, explica muy bien los conceptos"
              : "Muy buen aprendiz, hace preguntas interesantes",
            author: userRole === 'mentor' ? "Ana" : "Juan",
            date: "hace 2 días"
          },
          {
            text: userRole === 'mentor'
              ? "Muy paciente y dedicado"
              : "Muy entusiasta y comprometido",
            author: userRole === 'mentor' ? "Carlos" : "María",
            date: "hace 1 semana"
          }
        ]}
      />

      <Button
        onClick={() => router.push('/reviews')}
        variant="secondary"
        size="md"
      >
        Ver Mis Reseñas
      </Button>
    </div>
  );
} 