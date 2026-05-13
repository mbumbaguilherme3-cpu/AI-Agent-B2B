import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold hover:text-purple-200 transition">
            🤖 Kairos Agent
          </Link>

          {/* Links de Navegação */}
          <div className="flex gap-6">
            <Link
              to="/dashboard"
              className={`px-3 py-2 rounded-md transition ${
                isActive('/dashboard')
                  ? 'bg-purple-700 text-white'
                  : 'hover:bg-purple-700'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/agent/new"
              className={`px-3 py-2 rounded-md transition ${
                isActive('/agent/new')
                  ? 'bg-purple-700 text-white'
                  : 'hover:bg-purple-700'
              }`}
            >
              Novo Agente
            </Link>
            <Link
              to="/integrations"
              className={`px-3 py-2 rounded-md transition ${
                isActive('/integrations')
                  ? 'bg-purple-700 text-white'
                  : 'hover:bg-purple-700'
              }`}
            >
              Integrações
            </Link>
            <Link
              to="/login"
              className={`px-3 py-2 rounded-md transition ${
                isActive('/login')
                  ? 'bg-purple-700 text-white'
                  : 'hover:bg-purple-700'
              }`}
            >
              Login
            </Link>
            <Link
              to="/showcase"
              className={`px-3 py-2 rounded-md transition ${
                isActive('/showcase')
                  ? 'bg-purple-700 text-white'
                  : 'hover:bg-purple-700'
              }`}
            >
              📦 Componentes
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
