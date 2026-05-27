import React from 'react';
import { ScanHeart } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-5 px-4 bg-slate-950 border-b border-orange-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.15)]">
      <div className="flex items-center gap-3">
        <ScanHeart className="w-9 h-9 text-orange-500 animate-pulse" />
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase font-mono">
            RÓTULO <span className="text-orange-500">VIVO</span>
          </h1>
          <p className="text-xs md:text-sm text-orange-500/80 tracking-[0.25em] uppercase font-mono mt-1">
            UNICEPLAC Hackathon 2026 <span className="text-slate-600">//</span> Fome de Dados
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;