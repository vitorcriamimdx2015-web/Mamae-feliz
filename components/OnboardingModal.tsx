import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Baby, Heart, Sparkles, User } from 'lucide-react';

interface OnboardingModalProps {
  onSave: (profile: UserProfile) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onSave }) => {
  const [momName, setMomName] = useState('');
  const [babyName, setBabyName] = useState('');
  const [babyBirthDate, setBabyBirthDate] = useState('');
  const [step, setStep] = useState(1);

  const handleFinish = () => {
    if (momName && babyName && babyBirthDate) {
      onSave({
        momName,
        babyName,
        babyBirthDate
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-purple-900/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-100 to-white -z-10"></div>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-100 rounded-full opacity-50 blur-2xl"></div>
        <div className="absolute top-10 -left-10 w-32 h-32 bg-pink-100 rounded-full opacity-50 blur-2xl"></div>

        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mx-auto mb-6 relative">
            <div className="absolute inset-0 rounded-full border-2 border-purple-100 animate-ping opacity-75"></div>
            <Sparkles className="w-8 h-8 text-purple-500" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">Bem-vinda, Mamãe! 💜</h2>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">
            Para tornar nosso cantinho mais acolhedor e especial para você, gostaríamos de te conhecer melhor.
          </p>

          <div className="space-y-5 text-left">
            <div className="group">
              <label className="block text-xs font-bold text-purple-600 mb-1 ml-3 uppercase tracking-wider">Seu Nome</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                </div>
                <input
                  type="text"
                  value={momName}
                  onChange={(e) => setMomName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border-2 border-gray-100 rounded-xl leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-purple-300 transition-all duration-200 sm:text-sm"
                  placeholder="Como gosta de ser chamada?"
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-xs font-bold text-teal-600 mb-1 ml-3 uppercase tracking-wider">Nome do Bebê</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Baby className="h-5 w-5 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                </div>
                <input
                  type="text"
                  value={babyName}
                  onChange={(e) => setBabyName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border-2 border-gray-100 rounded-xl leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-teal-300 transition-all duration-200 sm:text-sm"
                  placeholder="Nome do seu pequeno(a)"
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-xs font-bold text-pink-600 mb-1 ml-3 uppercase tracking-wider">Nascimento do Bebê</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Heart className="h-5 w-5 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                </div>
                <input
                  type="date"
                  value={babyBirthDate}
                  onChange={(e) => setBabyBirthDate(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border-2 border-gray-100 rounded-xl leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-pink-300 transition-all duration-200 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleFinish}
            disabled={!momName || !babyName || !babyBirthDate}
            className="mt-8 w-full flex items-center justify-center px-6 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform transition-all active:scale-95"
          >
            Começar Jornada
          </button>
        </div>
      </div>
    </div>
  );
};