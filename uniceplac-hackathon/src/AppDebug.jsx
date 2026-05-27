import React from 'react';
import Header from './components/Header';

export default function App() {
  const produto_teste = {
    code: "123456",
    product_name: "Produto Teste",
    brands: "Marca Teste",
    ingredients_text: "Açúcar, Farinha, Sal",
    allergens_tags: ["en:gluten"],
    nutriscore_grade: "d",
    nova_group: 3
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4">
      <Header />
      
      <h1 className="text-4xl text-orange-500 font-bold mt-10 text-center">
        RÓTULO VIVO FUNCIONANDO!
      </h1>
      
      <div className="mt-10 p-4 bg-slate-900 border border-orange-500 rounded">
        <h2 className="text-2xl font-bold">{produto_teste.product_name}</h2>
        <p className="text-slate-400">{produto_teste.brands}</p>
        <p className="mt-2">Nutri-Score: <span className="text-orange-500 font-bold">{produto_teste.nutriscore_grade}</span></p>
        <p>NOVA: <span className="text-orange-500 font-bold">{produto_teste.nova_group}</span></p>
      </div>
    </div>
  );
}