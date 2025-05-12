'use client';

import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { FeedbackForm } from '../../components/FeedbackForm';
import { useRouter } from 'next/navigation';

export default function NewFeedbackPage() {
  const { context } = useMiniKit();
  const router = useRouter();

  const handleSubmit = async (feedback: { rating: number; comment: string }) => {
    // Aquí normalmente enviarías el feedback a la API
    console.log('Feedback enviado:', feedback);
    
    // Redirigir a la página principal después de enviar
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-xl font-bold mb-6">Dar Feedback</h1>
        <FeedbackForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
} 