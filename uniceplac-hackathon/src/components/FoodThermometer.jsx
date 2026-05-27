import React from 'react';
import clsx from 'clsx';

const FoodThermometer = ({ score }) => {
  const grades = ['a', 'b', 'c', 'd', 'e'];
  const scoreLower = String(score).toLowerCase();
  
  const getColor = (grade) => {
    switch (grade) {
      case 'a': return 'bg-green-500';
      case 'b': return 'bg-lime-500';
      case 'c': return 'bg-yellow-500';
      case 'd': return 'bg-orange-500';
      case 'e': return 'bg-red-600';
      default: return 'bg-slate-700';
    }
  };
  
  const getLabel = (grade) => {
    switch (grade) {
      case 'a': return 'Excelente';
      case 'b': return 'Bom';
      case 'c': return 'Moderado';
      case 'd': return 'Ruim';
      case 'e': return 'Evitar';
      default: return 'N/A';
    }
  };

  const currentIndex = grades.indexOf(scoreLower);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h3 className="text-center text-slate-400 font-mono uppercase tracking-widest mb-6 text-sm">Nutri-Score</h3>
      <div className="flex justify-center gap-2 mb-6">
        {grades.map((grade, index) => {
          const isActive = index <= currentIndex;
          return (
            <div key={grade} className="flex flex-col items-center">
              <div className={clsx("w-10 md:w-14 h-24 md:h-32 rounded-t-lg rounded-b-sm flex items-end justify-center pb-2 transition-all", isActive ? getColor(grade) : 'bg-slate-800')}>
                <span className={clsx("font-black text-lg md:text-2xl", isActive ? 'text-white' : 'text-slate-600')}>{grade.toUpperCase()}</span>
              </div>
              {index === currentIndex && (
                <div className={clsx("mt-2 text-xs font-bold uppercase px-2 py-1 rounded", getColor(grade))}>{getLabel(grade)}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FoodThermometer;