import React, { useState } from 'react';
import { Search, Barcode, Loader2 } from 'lucide-react';
import clsx from 'clsx';

const BarcodeScanner = ({ onSearch, isLoading }) => {
  const [barcode, setBarcode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (barcode.trim().length > 0) {
      onSearch(barcode.trim());
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      {/* Mensagem de Impacto */}
      {!isLoading && (
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
            O rótulo mostra a verdade que evitam te contar.
          </h2>
          <p className="text-slate-400 text-lg">
            Digite o código de barras abaixo e <span className="text-orange-500 font-semibold">descubra o que você realmente está comendo</span> em tempo real.
          </p>
        </div>
      )}

      {/* Loading */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 animate-pulse">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
          <p className="text-slate-400 font-mono text-sm text-center">
            Consultando base global do{' '}
            <span className="text-orange-500">Open Food Facts</span> e calculando índices de saúde...
          </p>
        </div>
      ) : (
        /* Campo de Busca */
        <form 
          onSubmit={handleSubmit}
          className="relative flex items-center bg-slate-900 border-2 border-slate-700 focus-within:border-orange-500 rounded-xl overflow-hidden transition-all shadow-[0_0_20px_rgba(0,0,0,0.3)]"
        >
          <div className="pl-5 text-slate-500">
            <Barcode className="w-7 h-7" />
          </div>
          
          <input
            type="text"
            placeholder="Cole ou digite o código de barras (ex: 3017620422003)"
            className="w-full bg-transparent py-5 px-4 text-white font-mono text-lg outline-none placeholder:text-slate-600"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
          
          <button
            type="submit"
            disabled={!barcode}
            className={clsx(
              "mr-3 px-8 py-3 rounded-lg font-black uppercase tracking-wider text-sm transition-all transform hover:scale-105",
              !barcode 
                ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                : "bg-orange-600 hover:bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.6)]"
            )}
          >
            <span className="flex items-center gap-2">
              Descobrir Rótulo <Search className="w-5 h-5" />
            </span>
          </button>
        </form>
      )}
    </div>
  );
};

export default BarcodeScanner;