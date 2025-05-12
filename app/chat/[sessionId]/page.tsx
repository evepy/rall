'use client';

import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { useEffect, useState } from 'react';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

export default function ChatPage({ params }: { params: { sessionId: string } }) {
  const { context } = useMiniKit();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Aquí normalmente cargarías los mensajes de la API
    // Por ahora usamos datos mock
    setMessages([
      {
        id: '1',
        text: 'Hola, ¿cómo estás?',
        sender: 'Juan',
        timestamp: '10:30 AM'
      },
      {
        id: '2',
        text: '¡Hola! Muy bien, gracias. ¿En qué puedo ayudarte?',
        sender: 'María',
        timestamp: '10:31 AM'
      }
    ]);
  }, [params.sessionId]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'Tú',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-white p-4 border-b">
        <h1 className="text-lg font-semibold">Sesión de Mentoría</h1>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.sender === 'Tú' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[70%] p-3 rounded-lg ${
                message.sender === 'Tú' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white border'
              }`}
            >
              <p>{message.text}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 p-2 border rounded-lg"
            placeholder="Escribe un mensaje..."
          />
          <button 
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
} 