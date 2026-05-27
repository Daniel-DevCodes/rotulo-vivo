import React, { useState } from 'react';
import Header from './components/Header';
import BarcodeScanner from './components/BarcodeScanner';
import ProductDashboard from './components/ProductDashboard';
import { Frown, Wifi } from 'lucide-react';

function App() {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (barcode) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      // Chamada REAL para a API Java local
      const response = await fetch(`http://localhost:8080/api/produtos/${barcode}`);
      
      if (!response.ok) {
        throw new Error(`Produto não encontrado (Código: ${barcode})`);
      }
      
      const data = await response.json();
      setProductData(data);
    } catch (err) {
      setError(err.message || "Erro ao conectar com o servidor. Verifique se a API Java está rodando na porta 8080.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setProductData(null);
    setError(null);
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-10">
        <BarcodeScanner onSearch={handleSearch} isLoading={loading} />
        
        {/* Erro */}
        {error && (
          <div className="max-w-3xl mx-auto mt-8 bg-red-950/40 border-2 border-red-500/50 p-6 rounded-xl flex items-start gap-4">
            <Frown className="text-red-500 w-8 h-8 flex-shrink-0" />
            <div>
              <h3 className="text-red-500 font-bold text-lg uppercase">Ops! Algo deu errado</h3>
              <p className="text-red-200 mt-2">{error}</p>
              <p className="text-slate-500 text-sm mt-3 flex items-center gap-2">
                <Wifi className="w-4 h-4" /> Certifique-se de que o Backend Java está rodando em http://localhost:8080
              </p>
            </div>
          </div>
        )}

        {/* Resultados */}
        {!loading && !error && productData && (
          <ProductDashboard product={productData} onClear={handleClear} />
        )}
      </main>
      
      <footer className="py-8 text-center text-slate-700 text-xs font-mono border-t border-slate-900">
        RÓTULO VIVO © 2026 - UNICEPLAC HACKATHON
      </footer>
    </div>
  );
}

export default App;