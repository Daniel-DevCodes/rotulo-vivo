import React from 'react';
import { Scale } from 'lucide-react';

const NutritionTable = ({ nutriments }) => {
  // Valores comunes da API do Open Food Facts
  const nutrients = [
    { key: 'energy-kcal_100g', label: 'Energia', unit: 'kcal' },
    { key: 'fat_100g', label: 'Gorduras Totais', unit: 'g' },
    { key: 'saturated-fat_100g', label: 'Gorduras Saturadas', unit: 'g' },
    { key: 'carbohydrates_100g', label: 'Carboidratos', unit: 'g' },
    { key: 'sugars_100g', label: 'Açúcares', unit: 'g' },
    { key: 'fiber_100g', label: 'Fibras Alimentares', unit: 'g' },
    { key: 'proteins_100g', label: 'Proteínas', unit: 'g' },
    { key: 'salt_100g', label: 'Sal', unit: 'g' },
    { key: 'sodium_100g', label: 'Sódio', unit: 'g' },
  ];

  const getValue = (key) => {
    const value = nutriments?.[key];
    return value !== undefined ? `${parseFloat(value).toFixed(1)}` : '-';
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-3">
        <Scale className="w-6 h-6 text-orange-500" />
        <h3 className="text-xl font-bold text-orange-500 uppercase tracking-wider">
          Informação Nutricional
        </h3>
        <span className="text-xs text-slate-500 ml-auto">(por 100g)</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {nutrients.map((nutrient) => (
          <div key={nutrient.key} className="flex justify-between items-center py-2 border-b border-slate-800/50">
            <span className="text-slate-400 text-sm">{nutrient.label}</span>
            <span className="text-white font-mono font-bold">
              {getValue(nutrient.key)} <span className="text-slate-500 text-xs">{nutrient.unit}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionTable;