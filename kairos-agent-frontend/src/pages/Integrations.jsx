import Button from '../components/Button';
import Card from '../components/Card';
export default function Integrations() {
  const integrations = [
    { name: 'Slack', status: 'ativo', icon: '💬' },
    { name: 'Discord', status: 'ativo', icon: '🎮' },
    { name: 'Telegram', status: 'inativo', icon: '📱' },
    { name: 'API Rest', status: 'ativo', icon: '🔌' },
    { name: 'Webhook', status: 'ativo', icon: '🪝' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Integrações</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="text-4xl mb-4">{integration.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{integration.name}</h3>
            <p className={`text-sm font-semibold ${
              integration.status === 'ativo' ? 'text-green-600' : 'text-gray-500'
            }`}>
              {integration.status === 'ativo' ? '✓ Conectado' : '○ Desconectado'}
            </p>
            <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
              {integration.status === 'ativo' ? 'Configurar' : 'Conectar'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
