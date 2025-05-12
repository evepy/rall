import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { useState } from 'react';

type UserRole = 'mentor' | 'learner';

interface OnboardingProps {
  onRoleSelect: (role: UserRole) => void;
}

export function Onboarding({ onRoleSelect }: OnboardingProps) {
  const { setFrameReady } = useMiniKit();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    localStorage.setItem('userRole', role);
    setFrameReady();
    onRoleSelect(role);
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6">
      <h1 className="text-2xl font-bold">Bienvenido a Web3 Mentorship</h1>
      <p className="text-center text-gray-600">
        ¿Cómo te gustaría participar en la comunidad?
      </p>
      
      <div className="grid grid-cols-2 gap-4 w-full">
        <button
          onClick={() => handleRoleSelect('mentor')}
          className={`p-4 rounded-lg border-2 ${
            selectedRole === 'mentor' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200'
          }`}
        >
          <h3 className="font-semibold">Mentor</h3>
          <p className="text-sm text-gray-600">Comparte tu conocimiento</p>
        </button>

        <button
          onClick={() => handleRoleSelect('learner')}
          className={`p-4 rounded-lg border-2 ${
            selectedRole === 'learner' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200'
          }`}
        >
          <h3 className="font-semibold">Aprendiz</h3>
          <p className="text-sm text-gray-600">Aprende de expertos</p>
        </button>
      </div>
    </div>
  );
} 