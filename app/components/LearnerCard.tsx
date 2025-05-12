interface LearnerCardProps {
  name: string;
  interests: string[];
  goals: string;
  level: string;
  id: string;
}

export function LearnerCard({ name, interests, goals, level, id }: LearnerCardProps) {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-600">Nivel: {level}</p>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-600">Objetivos:</p>
        <p className="text-sm">{goals}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {interests.map((interest) => (
          <span 
            key={interest}
            className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs"
          >
            {interest}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <button 
          onClick={() => window.location.href = `/profile/${id}`}
          className="text-blue-500 text-sm"
        >
          Ver perfil
        </button>
        <button 
          onClick={() => window.location.href = `/chat/new?learner=${id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm"
        >
          Contactar
        </button>
      </div>
    </div>
  );
} 