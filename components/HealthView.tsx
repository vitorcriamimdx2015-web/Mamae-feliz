import React, { useState } from 'react';
import { HeartPulse, Syringe, ArrowRight, Thermometer, AlertCircle, Baby, Activity } from 'lucide-react';
import { COLIC_TIPS, VACCINE_SCHEDULE } from '../constants';

export const HealthView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'colic' | 'vaccines'>('colic');

  return (
    <div className="flex flex-col h-full bg-purple-50 animate-fade-in">
      {/* Header with Tabs */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4 px-1">Saúde & Cuidados</h2>
        <div className="flex p-1 bg-gray-100 rounded-xl">
          <button
            onClick={() => setActiveTab('colic')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'colic' 
                ? 'bg-white text-pink-500 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Activity className="w-4 h-4" />
            Cólicas e Gases
          </button>
          <button
            onClick={() => setActiveTab('vaccines')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'vaccines' 
                ? 'bg-white text-teal-500 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Syringe className="w-4 h-4" />
            Vacinas
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24">
        
        {/* COLIC SECTION */}
        {activeTab === 'colic' && (
          <div className="space-y-6">
            <div className="bg-pink-100 p-4 rounded-xl flex gap-3 items-start">
              <AlertCircle className="w-6 h-6 text-pink-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-pink-800 leading-relaxed">
                Cólicas são normais até o 3º ou 4º mês devido à imaturidade do intestino. Se o choro for inconsolável por horas, consulte o pediatra.
              </p>
            </div>

            <h3 className="font-bold text-gray-700 text-lg ml-1">Técnicas de Alívio</h3>
            
            <div className="grid grid-cols-1 gap-4">
              {COLIC_TIPS.map((tip) => (
                <div key={tip.id} className="bg-white p-5 rounded-2xl shadow-sm border border-pink-50">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 text-pink-500">
                       <Activity className="w-6 h-6" /> 
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg mb-1">{tip.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{tip.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-indigo-50 mt-2">
                <h4 className="font-bold text-indigo-600 mb-2 flex items-center gap-2">
                    <Thermometer className="w-5 h-5" />
                    Quando ir ao médico?
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 pl-2">
                    <li>Se o bebê tiver febre junto com o choro.</li>
                    <li>Se houver vômitos frequentes ou sangue nas fezes.</li>
                    <li>Se o bebê recusar mamadas por muito tempo.</li>
                </ul>
            </div>
          </div>
        )}

        {/* VACCINE SECTION */}
        {activeTab === 'vaccines' && (
          <div className="space-y-6">
            <div className="bg-teal-50 p-4 rounded-xl flex gap-3 items-start">
              <Baby className="w-6 h-6 text-teal-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-teal-800 leading-relaxed">
                Mantenha a caderneta de vacinação em dia. Vacinas protegem seu bebê de doenças graves. As datas podem variar levemente.
              </p>
            </div>

            <div className="relative border-l-2 border-teal-200 ml-4 space-y-8 pl-6 py-2">
              {VACCINE_SCHEDULE.map((item, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-teal-500 border-4 border-white shadow-sm"></div>
                  
                  <h4 className="text-lg font-bold text-teal-600 mb-2">{item.month}</h4>
                  
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <ul className="space-y-2 mb-3">
                      {item.vaccines.map((vac, vIdx) => (
                        <li key={vIdx} className="flex items-start gap-2 text-gray-700 text-sm font-medium">
                          <ArrowRight className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                          {vac}
                        </li>
                      ))}
                    </ul>
                    <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-500 italic">
                      <span className="font-bold text-gray-600 not-italic">Dica de cuidado: </span>
                      {item.care}
                    </div>
                  </div>
                </div>
              ))}
            </div>
             <div className="text-center text-xs text-gray-400 mt-4">
                * Calendário baseado no Programa Nacional de Imunizações (PNI) do Brasil.
             </div>
          </div>
        )}

      </div>
    </div>
  );
};