import { useState } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

export default function NewAgent() {
  const [formData, setFormData] = useState({ name: '', description: '', type: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Nome é obrigatório';
    if (!formData.description) newErrors.description = 'Descrição é obrigatória';
    if (!formData.type) newErrors.type = 'Tipo de agente é obrigatório';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert('Agente criado com sucesso!');
    setFormData({ name: '', description: '', type: '' });
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Criar Novo Agente</h1>
      
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Nome do Agente"
            name="name"
            placeholder="Ex: Assistente de Vendas"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descrição *</label>
            <textarea
              name="description"
              placeholder="Descreva o objetivo do agente..."
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Agente *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition ${errors.type ? 'border-red-500' : ''}`}
            >
              <option value="">Selecione um tipo...</option>
              <option value="vendas">Assistente de Vendas</option>
              <option value="suporte">Suporte ao Cliente</option>
              <option value="dados">Análise de Dados</option>
            </select>
            {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
          </div>
          
          <Button type="submit" className="w-full">
            Criar Agente
          </Button>
        </form>
      </Card>
    </div>
  );
}
