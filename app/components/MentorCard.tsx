import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CompensationModal } from './CompensationModal';
import { CompensationHistory } from './CompensationHistory';

interface MentorCardProps {
  id: string;
  name: string;
  expertise: string[];
  experience: string;
  rating: number;
  compensation?: {
    amount: number;
    token: string;
  };
}

export function MentorCard({ id, name, expertise, experience, rating, compensation }: MentorCardProps) {
  const router = useRouter();
  const [showCompensationModal, setShowCompensationModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleCompensationConfirm = (amount: number, token: string) => {
    // Aquí iría la lógica para guardar la compensación
    console.log(`Compensación establecida: ${amount} ${token}`);
    setShowCompensationModal(false);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-gray-600">{experience} de experiencia</p>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-yellow-400">★</span>
          <span className="font-medium">{rating}</span>
        </div>
      </div>

      <div className="mt-3">
        <div className="flex flex-wrap gap-2">
          {expertise.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {compensation && (
        <div className="mt-3 text-sm text-gray-600">
          Compensación: {compensation.amount} {compensation.token}/hora
        </div>
      )}

      <div className="mt-4 flex space-x-3">
        <button
          onClick={() => router.push(`/profile/${id}`)}
          className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Ver Perfil
        </button>
        <button
          onClick={() => setShowCompensationModal(true)}
          className="flex-1 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50"
        >
          Establecer Compensación
        </button>
      </div>

      <div className="mt-3">
        <button
          onClick={() => setShowHistory(true)}
          className="w-full py-2 text-sm text-gray-600 hover:text-gray-800"
        >
          Ver Historial de Compensaciones
        </button>
      </div>

      <CompensationModal
        isOpen={showCompensationModal}
        onClose={() => setShowCompensationModal(false)}
        onConfirm={handleCompensationConfirm}
        mentorName={name}
      />

      <CompensationHistory
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        mentorId={id}
        mentorName={name}
      />
    </div>
  );
} 