import { useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import Modal from '../components/Modal';

export default function Showcase() {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.length < 3) {
      setInputError('Mínimo 3 caracteres');
    } else {
      setInputError('');
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Componentes Reutilizáveis</h1>

      {/* Buttons */}
      <Card title="Botões" subtitle="Diferentes variantes e tamanhos">
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="success">Success</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="outline">Outline</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Card>

      {/* Cards */}
      <Card title="Cards" subtitle="Componentes de container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Card 1" subtitle="Subtítulo exemplo">
            <p>Este é um card aninhado com título e subtítulo.</p>
          </Card>
          <Card>
            <p>Card sem título</p>
          </Card>
        </div>
      </Card>

      {/* Inputs */}
      <Card title="Inputs" subtitle="Campos de entrada com validação">
        <div className="space-y-4">
          <Input 
            label="Email" 
            type="email" 
            placeholder="seu@email.com" 
            required
          />
          <Input 
            label="Validação" 
            value={inputValue}
            onChange={handleInputChange}
            error={inputError}
            placeholder="Digite algo (mín. 3 caracteres)"
          />
          <Input 
            label="Senha" 
            type="password" 
            placeholder="••••••••"
          />
        </div>
      </Card>

      {/* Modal */}
      <Card title="Modal" subtitle="Diálogo interativo">
        <Button onClick={() => setModalOpen(true)}>Abrir Modal</Button>
        
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Modal Exemplo"
          actions={
            <>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setModalOpen(false)}>
                Confirmar
              </Button>
            </>
          }
        >
          <p>Este é um modal funcional com botões de ação!</p>
          <p className="mt-2 text-gray-600">Clique em "Confirmar" ou "Cancelar" para fechar.</p>
        </Modal>
      </Card>
    </div>
  );
}
