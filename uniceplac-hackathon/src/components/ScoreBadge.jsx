import React from 'react';
import { AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

const ScoreBadge = ({ type, value }) => {
  if (!value) return null;

  const getConfigs = () => {
    const val = String(value).toLowerCase();
    
    if (type === 'nutriscore') {
      switch (val) {
        case 'a': return { bg: 'bg-green-500', label: 'Excelente' };
        case 'b': return { bg: 'bg-lime-500', label: 'Bom' };
        case 'c': return { bg: 'bg-yellow-500', label: 'Moderado' };
        case 'd': return { bg: 'bg-orange-500', label: 'Ruim' };
        case 'e': return { bg: 'bg-red-600', label: 'Evitar' };
        default: return { bg: 'bg-slate-700', label: 'N/A' };
      }
    }

    if (type === 'nova') {
      const novaValue = parseInt(val);
      if (novaValue === 4) return { bg: 'bg-red-600', label: 'Ultraprocessado', alert: true };
      if (novaValue === 3) return { bg: 'bg-orange-500', label: 'Processado' };
      if (novaValue === 2) return { bg: 'bg-yellow-500', label: 'Artisanal' };
      return { bg: 'bg-green-500', label: 'Natural' };
    }
  };

  const config = getConfigs();
  const letter = type === 'nova' ? value : String(value).toUpperCase();

  return (
    <div className="relative">
      {config.alert && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-bold py-2 px-3 rounded-lg animate-pulse whitespace-nowrap border-2 border-red-400">
          <AlertTriangle className="w-4 h-4 inline mr-1" />
          ALTO RISCO
        </div>
      )}
      
      <div className={clsx(
        "flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all",
        config.bg,
        "text-white"
      )}>
        <span className="text-5xl font-black">{letter}</span>
        <span className="text-xs font-bold uppercase mt-2 opacity-90">{config.label}</span>
      </div>
    </div>
  );
};

export default ScoreBadge;