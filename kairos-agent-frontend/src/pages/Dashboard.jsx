import Card from '../components/Card';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const stats = [
    { label: 'Total de Agentes', value: 12, color: 'text-purple-600' },
    { label: 'Agentes Ativos', value: 8, color: 'text-green-600' },
    { label: 'Integrações', value: 5, color: 'text-blue-600' },
  ];

  const agents = [
    { id: 1, name: 'Agente 1', type: 'Assistente de IA' },
    { id: 2, name: 'Agente 2', type: 'Bot de Suporte' },
    { id: 3, name: 'Agente 3', type: 'Gerenciador de Tarefas' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Geral</h1>
        <Link to="/agent/new">
          <Button>+ Novo Agente</Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <Card key={idx} title={stat.label}>
            <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
          </Card>
        ))}
      </div>

      <Card title="Agentes Recentes" subtitle="Últimos agentes criados">
        <div className="space-y-3">
          {agents.map(agent => (
            <div key={agent.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div>
                <p className="font-medium text-gray-800">{agent.name}</p>
                <p className="text-sm text-gray-600">{agent.type}</p>
              </div>
              <Link to={`/agent/${agent.id}`}>
                <Button size="sm" variant="outline">Ver</Button>
              </Link>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
