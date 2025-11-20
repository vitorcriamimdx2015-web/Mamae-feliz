import React, { useState } from 'react';
import { ArrowLeft, Clock, Check, ChefHat, Apple, Coffee, Lock } from 'lucide-react';
import { Recipe } from '../types';
import { BABY_RECIPES } from '../constants';

interface RecipesViewProps {
  onBack: () => void;
  isPremium?: boolean;
  onTriggerSubscription: () => void;
}

export const RecipesView: React.FC<RecipesViewProps> = ({ onBack, isPremium = false, onTriggerSubscription }) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'papinhas' | 'frutas' | 'sucos_lanches'>('all');

  const filteredRecipes = activeCategory === 'all' 
    ? BABY_RECIPES 
    : BABY_RECIPES.filter(r => r.category === activeCategory);

  const handleRecipeClick = (recipe: Recipe) => {
    if (recipe.isPremium && !isPremium) {
        onTriggerSubscription();
    } else {
        setSelectedRecipe(recipe);
    }
  };

  // DETAIL VIEW
  if (selectedRecipe) {
    return (
      <div className="flex flex-col h-full bg-white animate-fade-in">
        {/* Header */}
        <div className="p-4 shadow-sm flex items-center gap-3 sticky top-0 bg-white z-10">
          <button onClick={() => setSelectedRecipe(null)} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h2 className="font-bold text-lg text-gray-800 truncate">Receita</h2>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 pb-24">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              {selectedRecipe.category === 'papinhas' ? 'Papinha Salgada' : selectedRecipe.category === 'frutas' ? 'Frutinha' : 'Lanche/Suco'}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{selectedRecipe.title}</h1>
            <p className="text-gray-500 italic mb-4">{selectedRecipe.benefits}</p>
            
            <div className="flex gap-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-400" />
                <span>{selectedRecipe.prepTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-orange-400" />
                <span>{selectedRecipe.ageRecommendation}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
                <div className="w-1 h-6 bg-orange-400 rounded-full"></div>
                Ingredientes
              </h3>
              <ul className="space-y-2">
                {selectedRecipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
                <div className="w-1 h-6 bg-teal-400 rounded-full"></div>
                Modo de Preparo
              </h3>
              <div className="space-y-4">
                {selectedRecipe.instructions.map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                    <p className="text-gray-700 mt-1 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3 mt-8">
                <Check className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-800">
                    Lembre-se de sempre testar a temperatura antes de oferecer ao bebê. Em caso de alergias, substitua os ingredientes.
                </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LIST VIEW
  return (
    <div className="flex flex-col h-full bg-purple-50 animate-fade-in">
      {/* Categories */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4 px-1">Receitas & Ideias</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button 
                onClick={() => setActiveCategory('all')}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeCategory === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600'}`}
            >
                Todas
            </button>
            <button 
                onClick={() => setActiveCategory('papinhas')}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeCategory === 'papinhas' ? 'bg-orange-500 text-white' : 'bg-white border border-orange-100 text-orange-600'}`}
            >
                <ChefHat className="w-4 h-4" />
                Papinhas
            </button>
            <button 
                onClick={() => setActiveCategory('frutas')}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeCategory === 'frutas' ? 'bg-teal-500 text-white' : 'bg-white border border-teal-100 text-teal-600'}`}
            >
                <Apple className="w-4 h-4" />
                Frutas
            </button>
            <button 
                onClick={() => setActiveCategory('sucos_lanches')}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeCategory === 'sucos_lanches' ? 'bg-pink-500 text-white' : 'bg-white border border-pink-100 text-pink-600'}`}
            >
                <Coffee className="w-4 h-4" />
                Sucos e Lanches
            </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-4">
        {filteredRecipes.map((recipe) => {
          const isLocked = recipe.isPremium && !isPremium;
          return (
            <div 
                key={recipe.id}
                onClick={() => handleRecipeClick(recipe)}
                className={`bg-white p-4 rounded-2xl shadow-sm border cursor-pointer transition-all group relative overflow-hidden 
                  ${isLocked ? 'border-gray-200 opacity-80' : 'border-purple-50 hover:shadow-md'}`}
            >
                {isLocked && (
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-10 flex items-center justify-center">
                        <div className="bg-gray-900 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg transform group-hover:scale-105 transition-transform">
                            <Lock className="w-4 h-4" />
                            <span className="text-xs font-bold">Conteúdo Premium</span>
                        </div>
                    </div>
                )}

                <div className="flex justify-between items-start mb-2">
                     <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full 
                        ${recipe.category === 'papinhas' ? 'bg-orange-100 text-orange-700' : 
                          recipe.category === 'frutas' ? 'bg-teal-100 text-teal-700' : 'bg-pink-100 text-pink-700'}`}>
                        {recipe.category === 'papinhas' ? 'Papinha' : recipe.category === 'frutas' ? 'Fruta' : 'Lanche'}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                        <Clock className="w-3 h-3" /> {recipe.prepTime}
                    </span>
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-purple-500 transition-colors">{recipe.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-3">{recipe.benefits}</p>
                <div className="flex items-center text-xs text-gray-400 font-medium">
                    Recomendado: {recipe.ageRecommendation}
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};