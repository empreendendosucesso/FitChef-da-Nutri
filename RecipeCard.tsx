import React from 'react';
import { Recipe } from '../types';
import { 
  FileDown, 
  Flame, 
  Target, 
  Zap, 
  Waves,
  Utensils,
  Lightbulb
} from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  onExport: () => void;
  isExporting: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onExport, isExporting }) => {
  return (
    <div id="recipe-content" className="w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col animate-in fade-in slide-in-from-bottom-4">
      
      {/* Cabeçalho */}
      <div className="bg-gradient-to-br from-[#00966d] to-[#007b5a] p-8 md:p-14 text-white relative">
        <div className="absolute top-6 right-6 md:top-8 md:right-8">
          <button
            onClick={onExport}
            disabled={isExporting}
            className="bg-white/10 hover:bg-white/20 text-white p-3 md:p-4 rounded-2xl transition-all disabled:opacity-50 border border-white/20 shadow-xl backdrop-blur-sm"
            title="Exportar PDF"
          >
            {isExporting ? <LoaderSmall className="animate-spin" /> : <FileDown size={24} />}
          </button>
        </div>
        
        <div className="flex items-center gap-3 mb-6 bg-white/10 w-fit px-4 py-1.5 rounded-full border border-white/10">
          <Utensils size={14} className="text-emerald-200" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-100">Prescrição Nutricional</span> {/* Alterado de "Prescrição Nutricional IA" */}
        </div>
        
        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 md:mb-6 tracking-tight leading-tight">{recipe.name}</h2>
        <p className="text-emerald-50 text-sm md:text-lg max-w-2xl leading-relaxed opacity-90 italic">"{recipe.description}"</p>
      </div>

      <div className="p-8 md:p-14 space-y-10 md:space-y-12">
        
        {/* Macros Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <MacroBox icon={<Flame className="text-orange-500" />} label="Calorias" value={recipe.macros.calories} />
          <MacroBox icon={<Target className="text-blue-500" />} label="Proteínas" value={recipe.macros.protein} />
          <MacroBox icon={<Waves className="text-emerald-500" />} label="Carbos" value={recipe.macros.carbs} />
          <MacroBox icon={<Zap className="text-yellow-500" />} label="Gorduras" value={recipe.macros.fat} />
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          {/* Coluna 1: Ingredientes */}
          <div className="space-y-6 md:space-y-8">
            <h3 className="text-xl md:text-2xl font-black text-slate-800 flex items-center gap-4">
              <span className="w-8 h-8 md:w-10 md:h-10 bg-emerald-100 text-[#00966d] rounded-xl md:rounded-2xl flex items-center justify-center text-base md:text-lg font-black shadow-sm">01</span>
              Ingredientes
            </h3>
            <ul className="space-y-3 md:space-y-4">
              {recipe.ingredients.map((item, idx) => (
                <li key={idx} className="flex items-start text-slate-600 font-medium group text-sm md:text-base">
                  <span className="text-[#00966d] mr-3 mt-1 text-lg group-hover:scale-125 transition-transform">•</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 2: Preparo */}
          <div className="space-y-6 md:space-y-8">
            <h3 className="text-xl md:text-2xl font-black text-slate-800 flex items-center gap-4">
              <span className="w-8 h-8 md:w-10 md:h-10 bg-emerald-100 text-[#00966d] rounded-xl md:rounded-2xl flex items-center justify-center text-base md:text-lg font-black shadow-sm">02</span>
              Modo de Preparo
            </h3>
            <div className="space-y-5 md:space-y-7">
              {recipe.instructions.map((step, idx) => (
                <div key={idx} className="flex gap-4 md:gap-5 group">
                  <span className="text-xs md:text-sm font-black text-emerald-200 mt-1 transition-colors group-hover:text-[#00966d]">{String(idx + 1).padStart(2, '0')}</span>
                  <p className="text-slate-600 font-medium leading-relaxed text-sm md:text-base">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dica do Especialista */}
        <div className="bg-slate-50 rounded-2xl md:rounded-3xl p-6 md:p-8 border-l-[6px] border-[#86d3b4] relative overflow-hidden">
          <div className="absolute top-[-10px] right-[-10px] text-slate-100 rotate-12 hidden md:block">
            <Lightbulb size={100} />
          </div>
          <div className="relative z-10 flex gap-4">
            <Lightbulb className="text-[#00966d] shrink-0" size={24} />
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              <span className="font-black text-[#005e44] uppercase text-[10px] md:text-xs tracking-widest block mb-2">Dica da Nutri</span>
              <span className="italic font-medium text-slate-600">"{recipe.tips}"</span>
            </p>
          </div>
        </div>

        {/* Ações Finais */}
        <div className="pt-6 border-t border-slate-100 flex justify-center">
          <button
            onClick={onExport}
            disabled={isExporting}
            className="w-full md:w-auto bg-[#1e293b] hover:bg-slate-900 text-white px-10 md:px-12 py-4 md:py-5 rounded-2xl font-black text-xs md:text-sm transition-all flex items-center justify-center gap-3 shadow-2xl active:scale-95 disabled:opacity-50"
          >
            {isExporting ? <LoaderSmall className="animate-spin" /> : <FileDown size={20} />}
            SALVAR RECEITA EM PDF
          </button>
        </div>
      </div>
    </div>
  );
};

const MacroBox = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="bg-white border border-slate-100 p-4 md:p-5 rounded-2xl md:rounded-[1.5rem] flex flex-col items-center gap-1 md:gap-2 shadow-sm hover:shadow-md transition-shadow">
    <div className="mb-1 scale-90 md:scale-100">{icon}</div>
    <span className="text-[8px] md:text-[9px] text-slate-400 uppercase font-black tracking-[0.2em]">{label}</span>
    <span className="text-base md:text-xl font-black text-slate-800 tracking-tighter">{value}</span>
  </div>
);

const LoaderSmall = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
);

export default RecipeCard;