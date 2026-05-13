import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white text-center py-4 mt-12">
        <p>&copy; 2026 Kairos Agent. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
