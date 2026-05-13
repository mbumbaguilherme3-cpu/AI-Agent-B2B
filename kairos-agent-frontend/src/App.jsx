import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewAgent from './pages/NewAgent';
import AgentDetail from './pages/AgentDetail';
import Integrations from './pages/Integrations';
import Showcase from './pages/Showcase';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/agent/new" element={<NewAgent />} />
          <Route path="/agent/:id" element={<AgentDetail />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/" element={<Dashboard />} /> {/* Página inicial padrão */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
