import { useState } from 'react';

interface FeedbackFormProps {
  onSubmit: (feedback: {
    rating: number;
    comment: string;
  }) => void;
}

export function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ rating, comment });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Calificación
        </label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="text-2xl focus:outline-none"
            >
              <span className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}>
                ★
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Comentario
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded-lg"
          rows={4}
          placeholder="Cuéntanos sobre tu experiencia..."
        />
      </div>

      <button
        type="submit"
        disabled={rating === 0}
        className={`w-full py-2 rounded-lg ${
          rating === 0
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 text-white'
        }`}
      >
        Enviar Feedback
      </button>
    </form>
  );
} 