import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Loader, Facebook } from 'lucide-react';
import { APP_LOGO_URL } from '../constants';

interface LoginViewProps {
  onLoginSuccess: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    // Simulating API call
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 1500);
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    // Simulating Social Auth
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col items-center justify-center p-4 animate-fade-in">
      
      {/* Header / Logo */}
      <div className="text-center mb-8 flex flex-col items-center">
        <div className="bg-white p-2 rounded-full shadow-lg inline-flex mb-4">
           <img src={APP_LOGO_URL} alt="Logo" className="w-20 h-20 rounded-full object-cover" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight mb-1">Mamãe <span className="text-purple-500">Feliz</span></h1>
        <p className="text-gray-500 text-sm">Seu apoio diário na maternidade</p>
      </div>

      {/* Card */}
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8 border border-white/50 backdrop-blur-sm">
        
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {isRegistering ? 'Crie sua conta' : 'Bem-vinda de volta!'}
        </h2>

        {/* Social Login */}
        <div className="space-y-3 mb-6">
          <button 
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 p-3 rounded-xl text-gray-700 font-bold hover:bg-gray-50 transition-colors shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continuar com Google
          </button>
          
          <button 
            onClick={() => handleSocialLogin('facebook')}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-[#1877F2] text-white p-3 rounded-xl font-bold hover:bg-[#1864F2] transition-colors shadow-sm"
          >
            <Facebook className="w-5 h-5 fill-current" />
            Continuar com Facebook
          </button>
        </div>

        <div className="relative flex py-2 items-center mb-6">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase font-bold">Ou entre com e-mail</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu e-mail"
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white transition-all"
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha"
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 text-white p-4 rounded-xl font-bold hover:bg-purple-700 transition-transform active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <>
                {isRegistering ? 'Cadastrar' : 'Entrar'}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Footer toggle */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isRegistering ? 'Já tem uma conta?' : 'Ainda não tem conta?'}
            <button 
              onClick={() => setIsRegistering(!isRegistering)}
              className="ml-1 text-purple-600 font-bold hover:underline focus:outline-none"
            >
              {isRegistering ? 'Faça Login' : 'Cadastre-se'}
            </button>
          </p>
        </div>

      </div>
      
      <p className="mt-8 text-center text-xs text-gray-400 max-w-xs">
        Ao entrar, você concorda com nossos Termos de Uso e Política de Privacidade.
      </p>
    </div>
  );
};