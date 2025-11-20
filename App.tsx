import React, { useState, useRef, useEffect } from 'react';
import { Send, Heart, Info, Sparkles, Bot, ShieldAlert, UsersRound, MessageSquare, Home, Milk, HeartHandshake, Smile, Lightbulb, X, Crown, LogOut } from 'lucide-react';
import { ChatMessage, AppState, UserProfile, VideoResource } from './types';
import { sendMessageToGemini } from './services/geminiService';
import { QUICK_TOPICS, DISCLAIMER_TEXT, APP_LOGO_URL } from './constants';
import { ChatBubble } from './components/ChatBubble';
import { TopicCard } from './components/TopicCard';
import { ForumView } from './components/ForumView';
import { RecipesView } from './components/RecipesView';
import { HealthView } from './components/HealthView';
import { ResourcesView } from './components/ResourcesView';
import { OnboardingModal } from './components/OnboardingModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { SubscriptionModal } from './components/SubscriptionModal';
import { LoginView } from './components/LoginView';

const App: React.FC = () => {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [appState, setAppState] = useState<AppState>(AppState.HOME);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showChatOverlay, setShowChatOverlay] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  
  // Video Player Global State
  const [playingVideo, setPlayingVideo] = useState<VideoResource | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Check Auth
    const authStatus = localStorage.getItem('mamaefeliz_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      // If auth, load profile
      const storedProfile = localStorage.getItem('mamaefeliz_profile');
      if (storedProfile) {
        setUserProfile(JSON.parse(storedProfile));
      } else {
        // Authenticated but no profile data yet
        setShowOnboarding(true);
      }
    }
  }, []);

  useEffect(() => {
    if (showChatOverlay) {
        scrollToBottom();
        setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, isLoading, showChatOverlay]);

  const handleLoginSuccess = () => {
    localStorage.setItem('mamaefeliz_auth', 'true');
    setIsAuthenticated(true);
    
    // Check if we need onboarding
    const storedProfile = localStorage.getItem('mamaefeliz_profile');
    if (!storedProfile) {
      setShowOnboarding(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('mamaefeliz_auth');
    setIsAuthenticated(false);
    setAppState(AppState.HOME);
  };

  const handleSaveProfile = (profile: UserProfile) => {
    // Default isPremium to false if not present
    const profileWithStatus = { ...profile, isPremium: profile.isPremium || false };
    setUserProfile(profileWithStatus);
    localStorage.setItem('mamaefeliz_profile', JSON.stringify(profileWithStatus));
    setShowOnboarding(false);
  };

  const handleUpgradeToPremium = () => {
    if (!userProfile) return;
    
    // Mock Payment Success
    const updatedProfile = { ...userProfile, isPremium: true };
    setUserProfile(updatedProfile);
    localStorage.setItem('mamaefeliz_profile', JSON.stringify(updatedProfile));
    
    setShowSubscriptionModal(false);
    alert("Parabéns! Você agora é assinante Premium! 🎉");
  };

  const handleSendMessage = async (textOverride?: string) => {
    const textToSend = textOverride || inputText;
    if (!textToSend.trim()) return;

    // Ensure chat is visible
    if (!showChatOverlay) {
        setShowChatOverlay(true);
    }

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Prepend context about user if available (invisible to user)
      let finalPrompt = textToSend;
      if (userProfile) {
         const ageContext = `(Contexto: Sou a mãe ${userProfile.momName}, meu bebê se chama ${userProfile.babyName} e nasceu em ${userProfile.babyBirthDate}). `;
         finalPrompt = ageContext + textToSend;
      }

      const responseText = await sendMessageToGemini(finalPrompt);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startNewTopic = (prompt: string) => {
    setMessages([]); 
    setShowChatOverlay(true);
    handleSendMessage(prompt);
  };

  // Navigation Bar Component
  const BottomNav = () => (
    <nav className="bg-white border-t border-purple-100 flex justify-between px-2 items-center py-3 pb-safe z-30 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <button 
        onClick={() => setAppState(AppState.HOME)}
        className={`flex flex-col items-center gap-1 px-1 min-w-[60px] ${appState === AppState.HOME ? 'text-purple-500' : 'text-gray-400 hover:text-gray-600'}`}
      >
        <Home className={`w-6 h-6 ${appState === AppState.HOME ? 'fill-current' : ''}`} />
        <span className="text-[9px] font-medium">Início</span>
      </button>
      
      <button 
        onClick={() => setAppState(AppState.RECIPES)}
        className={`flex flex-col items-center gap-1 px-1 min-w-[60px] ${appState === AppState.RECIPES ? 'text-purple-500' : 'text-gray-400 hover:text-gray-600'}`}
      >
        <Milk className={`w-6 h-6 ${appState === AppState.RECIPES ? 'fill-current' : ''}`} />
        <span className="text-[9px] font-medium">Receitas</span>
      </button>

       <button 
        onClick={() => setAppState(AppState.HEALTH)}
        className={`flex flex-col items-center gap-1 px-1 min-w-[60px] ${appState === AppState.HEALTH ? 'text-purple-500' : 'text-gray-400 hover:text-gray-600'}`}
      >
        <HeartHandshake className={`w-6 h-6 ${appState === AppState.HEALTH ? 'fill-current' : ''}`} />
        <span className="text-[9px] font-medium">Saúde</span>
      </button>

      <button 
        onClick={() => setAppState(AppState.RESOURCES)}
        className={`flex flex-col items-center gap-1 px-1 min-w-[60px] ${appState === AppState.RESOURCES ? 'text-purple-500' : 'text-gray-400 hover:text-gray-600'}`}
      >
        <Lightbulb className={`w-6 h-6 ${appState === AppState.RESOURCES ? 'fill-current' : ''}`} />
        <span className="text-[9px] font-medium">Dicas</span>
      </button>

      <button 
        onClick={() => setAppState(AppState.FORUM)}
        className={`flex flex-col items-center gap-1 px-1 min-w-[60px] ${appState === AppState.FORUM ? 'text-purple-500' : 'text-gray-400 hover:text-gray-600'}`}
      >
        <UsersRound className={`w-6 h-6 ${appState === AppState.FORUM ? 'fill-current' : ''}`} />
        <span className="text-[9px] font-medium">Fórum</span>
      </button>
    </nav>
  );

  // RENDER LOGIN VIEW IF NOT AUTHENTICATED
  if (!isAuthenticated) {
    return <LoginView onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="flex flex-col h-screen bg-purple-50 relative overflow-hidden">
      
      {/* Onboarding Modal */}
      {showOnboarding && <OnboardingModal onSave={handleSaveProfile} />}
      
      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <SubscriptionModal 
            onClose={() => setShowSubscriptionModal(false)} 
            onSubscribe={handleUpgradeToPremium} 
        />
      )}

      {/* Global Video Player Modal */}
      {playingVideo && (
        <VideoPlayerModal video={playingVideo} onClose={() => setPlayingVideo(null)} />
      )}

      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between z-20 relative shrink-0">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setAppState(AppState.HOME)}>
          <img 
            src={APP_LOGO_URL} 
            alt="Logo Mamãe Feliz" 
            className="w-10 h-10 rounded-full object-cover border border-purple-100" 
          />
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">Mamãe <span className="text-purple-500">Feliz</span></h1>
        </div>
        <div className="flex items-center gap-2">
            {/* Premium Badge or Upgrade Button */}
           {userProfile && userProfile.isPremium ? (
             <div className="hidden md:flex items-center bg-yellow-100 px-3 py-1 rounded-full border border-yellow-200">
                <Crown className="w-3 h-3 text-yellow-600 mr-1 fill-yellow-600" />
                <span className="text-xs text-yellow-700 font-bold">Premium</span>
             </div>
           ) : (
             <button 
                onClick={() => setShowSubscriptionModal(true)}
                className="flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1.5 rounded-full shadow-md hover:shadow-lg transition-all active:scale-95"
             >
                <Crown className="w-3 h-3 mr-1 text-yellow-300" />
                <span className="text-xs font-bold">Assinar</span>
             </button>
           )}

           {userProfile && (
             <div className="hidden md:flex items-center bg-purple-100 px-3 py-1 rounded-full ml-2">
                <span className="text-xs text-purple-700 font-bold">Mamãe {userProfile.momName}</span>
             </div>
           )}
            <button 
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              title="Sair"
            >
              <LogOut className="w-5 h-5" />
            </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden flex flex-col relative">
        
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

        {appState === AppState.HOME && (
          /* HOME VIEW */
          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center animate-fade-in">
            <div className="max-w-md w-full space-y-8">
              <div className="text-center space-y-2">
                <div className="inline-block p-3 bg-white rounded-full shadow-md mb-2">
                  <Smile className="w-8 h-8 text-purple-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {userProfile ? `Olá, Mamãe ${userProfile.momName}!` : 'Bem-vinda, Mamãe!'}
                </h2>
                <p className="text-gray-600">
                  {userProfile 
                    ? `Como estão as coisas com ${userProfile.babyName} hoje? Estamos aqui para ajudar.` 
                    : 'Seu cantinho especial. Sinta-se abraçada e apoiada em cada momento com seu bebê.'}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {QUICK_TOPICS.map((topic) => (
                  <TopicCard 
                    key={topic.id} 
                    topic={topic} 
                    onClick={startNewTopic} 
                  />
                ))}
              </div>

              <div className="grid grid-cols-4 gap-2 pt-4">
                 <button 
                  onClick={() => setAppState(AppState.RECIPES)}
                  className="bg-white border border-purple-200 text-purple-600 font-bold py-3 rounded-xl hover:bg-purple-50 transition-colors shadow-sm flex flex-col items-center justify-center gap-1 p-1"
                >
                  <Milk className="w-5 h-5" />
                  <span className="text-[9px] md:text-xs text-center">Receitas</span>
                </button>
                 <button 
                  onClick={() => setAppState(AppState.HEALTH)}
                  className="bg-white border border-pink-200 text-pink-600 font-bold py-3 rounded-xl hover:bg-pink-50 transition-colors shadow-sm flex flex-col items-center justify-center gap-1 p-1"
                >
                  <HeartHandshake className="w-5 h-5" />
                  <span className="text-[9px] md:text-xs text-center">Saúde</span>
                </button>
                <button 
                  onClick={() => setAppState(AppState.RESOURCES)}
                  className="bg-white border border-orange-200 text-orange-600 font-bold py-3 rounded-xl hover:bg-orange-50 transition-colors shadow-sm flex flex-col items-center justify-center gap-1 p-1"
                >
                  <Lightbulb className="w-5 h-5" />
                  <span className="text-[9px] md:text-xs text-center">Dicas</span>
                </button>
                 <button 
                  onClick={() => setAppState(AppState.FORUM)}
                  className="bg-white border border-teal-200 text-teal-600 font-bold py-3 rounded-xl hover:bg-teal-50 transition-colors shadow-sm flex flex-col items-center justify-center gap-1 p-1"
                >
                  <UsersRound className="w-5 h-5" />
                  <span className="text-[9px] md:text-xs text-center">Fórum</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {appState === AppState.RECIPES && (
            <RecipesView 
                onBack={() => setAppState(AppState.HOME)} 
                isPremium={userProfile?.isPremium}
                onTriggerSubscription={() => setShowSubscriptionModal(true)}
            />
        )}

        {appState === AppState.HEALTH && <HealthView />}
        
        {appState === AppState.RESOURCES && (
            <ResourcesView 
                onPlayVideo={setPlayingVideo} 
                isPremium={userProfile?.isPremium}
                onTriggerSubscription={() => setShowSubscriptionModal(true)}
            />
        )}

        {appState === AppState.FORUM && <ForumView />}

      </main>

      {/* Chat Overlay / Modal */}
      {showChatOverlay && (
         <div className="fixed inset-0 z-40 flex flex-col bg-white animate-fade-in">
            {/* Chat Header */}
            <div className="bg-white shadow-sm px-4 py-3 flex items-center justify-between border-b border-purple-100 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="bg-teal-500 p-2 rounded-full">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-800">Assistente IA</h2>
                        <p className="text-xs text-green-500 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Online
                        </p>
                    </div>
                </div>
                <button 
                    onClick={() => setShowChatOverlay(false)}
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                    <X className="w-5 h-5 text-gray-600" />
                </button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-y-auto p-4 bg-purple-50">
                 <div className="max-w-3xl mx-auto">
                    {messages.length === 0 && (
                        <div className="flex justify-start mb-6">
                            <div className="flex flex-row gap-3 max-w-[90%]">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <div className="p-4 rounded-2xl rounded-tl-none bg-white text-gray-700 shadow-sm border border-gray-100">
                                    <p>Olá, {userProfile ? userProfile.momName : 'mamãe'}! Sou sua assistente virtual. Estou aqui para te acolher e tirar dúvidas sobre amamentação, sono, cólicas ou qualquer cuidado com {userProfile ? userProfile.babyName : 'seu bebê'}. Como posso ajudar hoje?</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {messages.map((msg) => (
                        <ChatBubble key={msg.id} message={msg} onPlayVideo={setPlayingVideo} />
                    ))}

                    {isLoading && (
                        <div className="flex justify-start mb-6 animate-pulse">
                        <div className="flex flex-row gap-3">
                            <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center opacity-50">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div className="p-4 rounded-2xl rounded-tl-none bg-white shadow-sm border border-gray-100 flex items-center gap-2">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                 </div>
            </div>

            {/* Chat Input */}
            <div className="bg-white border-t border-purple-100 p-4">
                <div className="max-w-3xl mx-auto flex items-center gap-2 relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Digite sua dúvida..."
                    className="flex-1 bg-gray-50 text-gray-800 rounded-full pl-6 pr-12 py-4 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-inner placeholder-gray-400"
                    disabled={isLoading}
                />
                <button
                    onClick={() => handleSendMessage()}
                    disabled={isLoading || !inputText.trim()}
                    className={`absolute right-2 p-2 rounded-full transition-all duration-200 
                    ${isLoading || !inputText.trim() 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-purple-500 text-white hover:bg-purple-600 shadow-lg transform hover:scale-105 active:scale-95'
                    }`}
                >
                    <Send className="w-5 h-5 ml-0.5" />
                </button>
                </div>
                <div className="text-center mt-2">
                    <span className="text-[10px] text-gray-400">IA pode cometer erros. Consulte um médico para decisões importantes.</span>
                </div>
            </div>
         </div>
      )}

      {/* Floating Action Button for Chat (Only visible when chat overlay is closed) */}
      {!showChatOverlay && !showOnboarding && (
          <button 
            onClick={() => setShowChatOverlay(true)}
            className="absolute bottom-20 right-4 z-40 bg-teal-500 hover:bg-teal-600 text-white rounded-full p-4 shadow-xl transition-transform hover:scale-110 active:scale-95 animate-bounce-slow"
            title="Abrir Chat IA"
          >
              <Sparkles className="w-7 h-7" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
      )}

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Disclaimer Modal */}
      {showDisclaimer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl transform transition-all scale-100">
            <div className="flex items-center gap-3 text-purple-500 mb-4">
              <ShieldAlert className="w-8 h-8" />
              <h3 className="text-xl font-bold">Aviso Importante</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              {DISCLAIMER_TEXT}
            </p>
            <button 
              onClick={() => setShowDisclaimer(false)}
              className="w-full bg-purple-500 text-white font-bold py-3 rounded-xl hover:bg-purple-600 transition-colors"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;