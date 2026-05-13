import { useParams } from 'react-router-dom';

export default function AgentDetail() {
  const { id } = useParams();

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Agente #{id}</h1>
      <p className="text-gray-600 mb-8">Assistente de IA - Status: Ativo</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Informações</h2>
            <p className="text-gray-700 mb-2"><strong>Criado em:</strong> 2026-05-10</p>
            <p className="text-gray-700 mb-2"><strong>Última atualização:</strong> 2026-05-13</p>
            <p className="text-gray-700"><strong>Versão:</strong> 1.0.0</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Configurações</h2>
            <p className="text-gray-600">Nenhuma configuração adicional</p>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Ações</h3>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg mb-2 hover:bg-blue-700 transition">
              Editar
            </button>
            <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
              Deletar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
