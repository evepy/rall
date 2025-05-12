import { useState } from 'react';

interface CompensationRecord {
  id: string;
  amount: number;
  token: string;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
  sessionDuration?: number;
}

interface CompensationHistoryProps {
  isOpen: boolean;
  mentorId: string;
  mentorName: string;
  onClose: () => void;
}

export function CompensationHistory({ isOpen, mentorId, mentorName, onClose }: CompensationHistoryProps) {
  if (!isOpen) return null;

  // Simulación de datos de historial
  const [history] = useState<CompensationRecord[]>([
    {
      id: '1',
      amount: 0.1,
      token: 'ETH',
      date: '2024-03-15',
      status: 'completed',
      sessionDuration: 60
    },
    {
      id: '2',
      amount: 50,
      token: 'USDC',
      date: '2024-03-10',
      status: 'completed',
      sessionDuration: 45
    },
    {
      id: '3',
      amount: 0.05,
      token: 'ETH',
      date: '2024-03-05',
      status: 'cancelled'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Historial de Compensaciones</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <p className="text-gray-600">
          Historial de compensaciones para {mentorName}
        </p>

        <div className="mt-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Compensación
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duración
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {history.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.amount} {record.token}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.sessionDuration ? `${record.sessionDuration} min` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(record.status)}`}>
                        {getStatusText(record.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
} 