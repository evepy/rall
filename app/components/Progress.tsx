interface ProgressProps {
  points: number;
  completedSessions: number;
  feedback: {
    text: string;
    author: string;
    date: string;
  }[];
}

export function Progress({ points, completedSessions, feedback }: ProgressProps) {
  return (
    <div className="p-4 space-y-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Tu Progreso</h3>
        <div className="flex items-center space-x-2">
          <span className="text-yellow-400">★</span>
          <span className="font-semibold">{points} puntos</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Sesiones Completadas</span>
          <span>{completedSessions}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${(completedSessions / 20) * 100}%` }} 
          />
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold">Feedback Reciente</h4>
        <div className="space-y-3">
          {feedback.map((item, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm">{item.text}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">- {item.author}</span>
                <span className="text-xs text-gray-500">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={() => window.location.href = '/feedback/new'}
        className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm"
      >
        Dar Feedback
      </button>
    </div>
  );
} 