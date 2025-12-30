import React, { useState } from 'react';
import { 
  ChefHat, 
  Sparkles, // Alterado de Loader2 para Sparkles
  Search,
  RotateCcw,
  X,
  CheckCircle2,
  Leaf,
} from 'lucide-react';
import { Recipe } from './types';
import { generateFitRecipe } from './geminiService';
import RecipeCard from './components/RecipeCard';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim() || loading) return;

    setLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const newRecipe = await generateFitRecipe(query);
      setRecipe(newRecipe);
      setQuery('');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Houve um problema ao encontrar sua receita. Tente um prato diferente.');
    } finally {
      setLoading(false);
    }
  };

  const handleExportPdf = async () => {
    if (!recipe) return;
    setIsExporting(true);
    try {
      const element = document.getElementById('recipe-content');
      if (!element) return;
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`FitChef-${recipe.name.replace(/\s+/g, '-')}.pdf`);
    } catch (err) {
      alert('Erro ao gerar PDF.');
    } finally { setIsExporting(false); }
  };

  return (
    <div className="min-h-screen bg-[#FBFDFE] flex flex-col items-center p-4 md:p-12">
      <header className="flex flex-col items-center gap-6 mb-16 animate-in fade-in slide-in-from-top-4 duration-700 text-center">
        <div className="flex items-center gap-4">
          <div className="bg-[#00966d] p-4 rounded-3xl text-white shadow-lg">
            <ChefHat size={32} />
          </div>
          <div className="h-8 w-[1px] bg-slate-200"></div>
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Grátis & Ilimitado</span>
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
            <span className="text-xs font-bold text-slate-400">Powered by Gemini 3 Flash</span> {/* Reativado */}
            <span className="text-xs font-bold text-slate-400">Receitas Inteligentes</span>
          </div>
        </div>
        <div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-2">FitChef</h1>
          <p className="text-slate-400 font-medium tracking-wide italic">Sua nutri pessoal 24h por dia</p>
        </div>
      </header>

      <main className="w-full max-w-4xl flex-grow">
        {recipe ? (
          <div className="animate-in fade-in zoom-in duration-500">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">Receita Encontrada com Sucesso</span>
              </div>
              <button 
                onClick={() => setRecipe(null)} 
                className="flex items-center gap-2 text-slate-600 hover:text-[#00966d] font-bold bg-white px-6 py-3 rounded-full shadow-sm border border-slate-100 transition-all text-xs active:scale-95"
              >
                <RotateCcw size={16} /> NOVA RECEITA
              </button>
            </div>
            <RecipeCard recipe={recipe} onExport={handleExportPdf} isExporting={isExporting} />
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center gap-10 py-32 text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/10 rounded-full animate-ping"></div>
              <div className="bg-white p-8 rounded-full shadow-2xl relative border border-emerald-50">
                <Sparkles size={64} className="text-[#00966d] animate-pulse" /> {/* Alterado para Sparkles */}
                <Leaf size={24} className="absolute inset-0 m-auto text-[#00966d]" />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-serif font-bold text-slate-800">Cozinhando Ideias...</h3>
              <p className="text-slate-400 text-lg max-w-sm mx-auto leading-relaxed">Buscando a combinação nutritiva e deliciosa para você.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-16">
            <form onSubmit={handleSearch} className="relative w-full shadow-2xl shadow-emerald-900/10 rounded-[3rem] bg-white border border-slate-100 p-3 group focus-within:border-emerald-200 transition-all">
              <div className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00966d] transition-colors">
                <Search size={32} />
              </div>
              <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="O que quer comer de saudável hoje?" 
                className="w-full bg-transparent text-slate-800 text-xl md:text-2xl py-8 pl-20 pr-44 rounded-[2.5rem] outline-none placeholder:text-slate-200"
              />
              <button 
                type="submit" 
                disabled={!query.trim()}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#00966d] hover:bg-[#007b5a] text-white px-10 py-5 rounded-[2rem] font-black text-lg transition-all disabled:opacity-30 shadow-xl active:scale-95"
              >
                CRIAR
              </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard icon={<Leaf size={24} />} title="Foco em Saúde" desc="Ingredientes selecionados para sua dieta." />
              <FeatureCard icon={<CheckCircle2 size={24} />} title="Pronto para Imprimir" desc="Salve suas receitas favoritas em PDF." />
              <FeatureCard icon={<ChefHat size={24} />} title="Inspiração Diária" desc="Novas ideias para refeições nutritivas." />
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 px-8 py-6 rounded-[2.5rem] border border-red-100 flex items-center justify-between mt-12 animate-in slide-in-from-top-4">
            <div className="flex items-center gap-4">
              <X size={24} />
              <p className="font-bold">{error}</p>
            </div>
            <button onClick={() => setError(null)} className="text-xs font-black uppercase tracking-widest hover:underline">Fechar</button>
          </div>
        )}
      </main>

      <footer className="mt-32 pb-12 text-center opacity-30 hover:opacity-100 transition-opacity">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">FitChef • Receitas Inteligentes 2025</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
    <div className="bg-emerald-50 w-14 h-14 rounded-2xl flex items-center justify-center text-[#00966d] mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h4 className="font-bold text-slate-800 mb-2 text-lg">{title}</h4>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default App;