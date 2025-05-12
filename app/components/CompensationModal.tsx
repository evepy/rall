import { useState } from 'react';

interface CompensationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number, token: string) => void;
  mentorName: string;
}

export function CompensationModal({ isOpen, onClose, onConfirm, mentorName }: CompensationModalProps) {
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState('ETH');

  if (!isOpen) return null;

  const tokens = [
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'USDC', name: 'USD Coin' },
    { symbol: 'USDT', name: 'Tether' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Compensación por Mentoría</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <p className="text-gray-600">
          Establece una compensación por hora para {mentorName}
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cantidad
            </label>
            <div className="flex">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 p-2 border rounded-l-lg"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
              <select
                value={selectedToken}
                onChange={(e) => setSelectedToken(e.target.value)}
                className="border-t border-r border-b rounded-r-lg p-2 bg-gray-50"
              >
                {tokens.map(token => (
                  <option key={token.symbol} value={token.symbol}>
                    {token.symbol}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              Esta compensación será visible en el perfil del mentor y se utilizará como referencia para futuras sesiones.
            </p>
          </div>
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            onClick={onClose}
            className="flex-1 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(Number(amount), selectedToken)}
            disabled={!amount || Number(amount) <= 0}
            className={`flex-1 py-2 rounded-lg text-white ${
              !amount || Number(amount) <= 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
} 