import React from 'react';
import { Package, Tag, AlertTriangle, CheckCircle, ScrollText, Trash2, AlertCircle as AlertIcon } from 'lucide-react';
import FoodThermometer from './FoodThermometer';
import NutritionTable from './NutritionTable';
import ScoreBadge from './ScoreBadge';

const formatTag = (tag) => {
  if (!tag) return '';
  return tag.replace('en:', '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

const ProductDashboard = ({ product, onClear }) => {
  if (!product) return null;

  const ingredients = product.ingredients_text || "Informação indisponível";
  const allergens = product.allergens_tags || [];
  const brand = product.brands || "Marca Desconhecida";
  const novaGroup = product.nova_group || 0;
  const nutriScore = product.nutriscore_grade || 'F';
  const barcode = product.code || product.barcode || 'N/A';
  const nutriments = product.nutriments || {};
  const hasAllergens = allergens.length > 0;
  const isUltraprocessado = novaGroup === 4;

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 gap-6 p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Botão Limpar */}
      <div className="flex justify-end">
        <button 
          onClick={onClear}
          className="flex items-center gap-2 text-slate-500 hover:text-orange-500 transition-colors text-sm font-mono bg-slate-900 px-4 py-2 rounded-lg border border-slate-800"
        >
          <Trash2 className="w-4 h-4" />
          Nova Consulta
        </button>
      </div>

      {/* Card Principal */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600"></div>
        <div className="flex items-center gap-2 text-orange-500 font-mono text-xs mb-3 uppercase tracking-widest">
          <Package className="w-4 h-4" />
          Código: <span className="text-slate-400">{barcode}</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
          {product.product_name || "Produto Desconhecido"}
        </h2>
        <div className="flex items-center gap-2 text-slate-400 font-mono text-lg">
          <Tag className="w-5 h-5" />
          {brand}
        </div>
      </div>

      {/* Alerta de Alérgenos */}
      <div className={hasAllergens ? "bg-gradient-to-r from-red-900 to-red-950 border-2 border-red-500" : "bg-gradient-to-r from-green-900 to-green-950 border-2 border-green-500"} rounded-2xl p-6 shadow-xl>
        <div className="flex items-center gap-3 mb-3">
          {hasAllergens ? <AlertTriangle className="w-8 h-8 text-red-500" /> : <CheckCircle className="w-8 h-8 text-green-500" />}
          <h3 className={`text-xl font-bold ${hasAllergens ? 'text-red-500' : 'text-green-500'}`}>
            {hasAllergens ? '⚠️ ATENÇÃO ALÉRGICOS' : '✅ Livre de Alérgenos'}
          </h3>
        </div>
        {hasAllergens ? (
          <div className="flex flex-wrap gap-2">
            {allergens.map((allergen, index) => (
              <span key={index} className="bg-red-600/30 text-red-200 border border-red-500 px-4 py-2 rounded-lg text-base font-bold">
                {formatTag(allergen)}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-green-300 font-medium">Este produto não contém os principais alérgenos comuns mapeados.</p>
        )}
      </div>

      {/* Grid: Termômetro + NOVA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FoodThermometer score={nutriScore} />
        
        {/* NOVA - Layout corrigido com alerta integrado */}
        <div className={`bg-slate-900 border border-slate-800 rounded-2xl p-6 ${isUltraprocessado ? 'relative' : ''}`}>
          <h3 className="text-center text-slate-400 font-mono uppercase tracking-widest mb-4 text-sm">Grau de Processamento</h3>
          
          {isUltraprocessado ? (
            /* Alerta integrado para NOVA 4 */
            <div className="bg-red-600/20 border-2 border-red-500 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <AlertIcon className="w-8 h-8 text-red-500 animate-pulse" />
                <span className="text-red-500 font-black text-2xl">ULTRAPROCESSADO</span>
              </div>
              <p className="text-red-300 text-sm font-medium">Alto Risco Alimentar</p>
              <div className="flex justify-center mt-4">
                <div className="bg-red-600 text-white w-16 h-16 rounded-lg flex items-center justify-center text-3xl font-black">
                  {novaGroup}
                </div>
              </div>
            </div>
          ) : (
            /* Layout normal para NOVA 1-3 */
            <div className="flex justify-center">
              <ScoreBadge type="nova" value={novaGroup} />
            </div>
          )}
        </div>
      </div>

      {/* Tabela Nutricional */}
      <NutritionTable nutriments={nutriments} />

      {/* Ingredientes */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4 border-b border-slate-800 pb-3">
          <ScrollText className="w-6 h-6 text-orange-500" />
          <h3 className="text-xl font-bold text-orange-500 uppercase tracking-wider">Ingredientes</h3>
        </div>
        <div className="max-h-48 overflow-y-auto pr-4">
          <p className="text-slate-300 leading-relaxed font-mono text-sm whitespace-pre-line">{ingredients}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDashboard;