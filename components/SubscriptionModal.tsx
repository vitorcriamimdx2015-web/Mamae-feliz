import React, { useState } from 'react';
import { X, Check, Crown, Star, Heart, ChevronLeft, ShieldCheck, Loader, ExternalLink, MessageCircle, Flower2 } from 'lucide-react';
import { APP_LOGO_URL, PAYMENT_CONFIG } from '../constants';

interface SubscriptionModalProps {
  onClose: () => void;
  onSubscribe: () => void;
}

type CheckoutStep = 'PLAN_SELECTION' | 'PAYMENT_REDIRECT' | 'SUCCESS';
type PlanType = 'MONTHLY' | 'ANNUAL';

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ onClose, onSubscribe }) => {
  const [step, setStep] = useState<CheckoutStep>('PLAN_SELECTION');
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('ANNUAL');
  const [isProcessing, setIsProcessing] = useState(false);

  const planPrice = selectedPlan === 'MONTHLY' ? '24,99' : '199,99';
  const paymentLink = selectedPlan === 'MONTHLY' ? PAYMENT_CONFIG.monthlyLink : PAYMENT_CONFIG.annualLink;

  const handlePlanSelect = (plan: PlanType) => {
    setSelectedPlan(plan);
    setStep('PAYMENT_REDIRECT');
  };

  const handleOpenPaymentLink = () => {
    // Safety check to prevent opening broken placeholder links
    if (paymentLink.includes("SEU_LINK") || paymentLink.includes("LINK_MENSAL") || paymentLink === "") {
        alert("⚠️ AVISO PARA O DONO DO APP:\n\nVocê ainda não configurou os Links de Pagamento no arquivo 'constants.tsx'.\n\nPor favor, gere os links no Mercado Pago e cole no código antes de publicar.");
        return;
    }
    window.open(paymentLink, '_blank');
  };

  const handleSendProof = () => {
    const message = `Olá! Acabei de assinar o plano ${selectedPlan === 'MONTHLY' ? 'Mensal' : 'Anual'} no App Mamãe Feliz. Segue meu comprovante.`;
    const whatsappUrl = `https://wa.me/${PAYMENT_CONFIG.whatsappSupport}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Mock function to allow user to bypass if they paid
  const handleAlreadyPaid = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('SUCCESS');
      setTimeout(() => {
        onSubscribe();
      }, 2500);
    }, 1500);
  };

  // RENDER: SUCCESS STEP
  if (step === 'SUCCESS') {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-purple-900/90 backdrop-blur-md p-4 animate-fade-in">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-teal-500"></div>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
                <Check className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Pagamento Confirmado!</h2>
            <p className="text-gray-500 mb-6">Bem-vinda ao Mamãe Feliz Premium. Todos os conteúdos foram desbloqueados.</p>
            <div className="flex justify-center">
                 <Loader className="w-6 h-6 text-purple-500 animate-spin" />
            </div>
            <p className="text-xs text-gray-400 mt-2">Atualizando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-purple-900/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative flex flex-col max-h-[90vh]">
        
        {/* Common Header */}
        <div className="bg-white border-b border-gray-100 p-4 flex items-center justify-between shrink-0">
            {step !== 'PLAN_SELECTION' ? (
                <button onClick={() => setStep('PLAN_SELECTION')} className="p-2 hover:bg-gray-100 rounded-full">
                    <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
            ) : (
                <div className="w-10"></div> // Spacer
            )}
            <h3 className="font-bold text-gray-800">
                {step === 'PLAN_SELECTION' && 'Escolha seu Plano'}
                {step === 'PAYMENT_REDIRECT' && 'Pagamento Seguro'}
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-6 h-6 text-gray-400" />
            </button>
        </div>

        {/* STEP 1: PLAN SELECTION */}
        {step === 'PLAN_SELECTION' && (
            <div className="flex-1 overflow-y-auto">
                <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-8 text-center text-white relative overflow-hidden">
                    {/* Watermark Logo */}
                    <div className="absolute -right-10 -bottom-10 opacity-10 transform rotate-12">
                        <img src={APP_LOGO_URL} alt="" className="w-40 h-40 grayscale brightness-200" />
                    </div>

                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border-2 border-white/50 relative z-10">
                        <Crown className="w-8 h-8 text-yellow-300 fill-yellow-300" />
                    </div>
                    <h2 className="text-2xl font-bold mb-1 relative z-10">Seja Premium</h2>
                    <p className="text-purple-100 text-sm relative z-10">Desbloqueie todo o potencial do app</p>
                </div>

                <div className="p-6">
                    <ul className="space-y-3 mb-8 bg-gray-50 p-4 rounded-xl">
                        <li className="flex items-center gap-3">
                        <div className="bg-green-100 p-1 rounded-full"><Check className="w-3 h-3 text-green-600" /></div>
                        <span className="text-gray-600 text-sm">Receitas exclusivas</span>
                        </li>
                        <li className="flex items-center gap-3">
                        <div className="bg-green-100 p-1 rounded-full"><Check className="w-3 h-3 text-green-600" /></div>
                        <span className="text-gray-600 text-sm">Vídeos de primeiros socorros</span>
                        </li>
                        <li className="flex items-center gap-3">
                        <div className="bg-green-100 p-1 rounded-full"><Check className="w-3 h-3 text-green-600" /></div>
                        <span className="text-gray-600 text-sm">Tira-dúvidas prioritário</span>
                        </li>
                    </ul>

                    <div className="space-y-4">
                        {/* Monthly Plan */}
                        <button 
                        onClick={() => handlePlanSelect('MONTHLY')}
                        className="w-full p-4 border-2 border-gray-100 rounded-2xl flex items-center justify-between hover:border-purple-500 hover:bg-purple-50 transition-all group"
                        >
                        <div className="text-left">
                            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Mensal</span>
                            <span className="text-xl font-bold text-gray-800 group-hover:text-purple-700">R$ 24,99</span>
                        </div>
                        <div className="bg-gray-100 p-2 rounded-full group-hover:bg-purple-200">
                            <Heart className="w-5 h-5 text-gray-400 group-hover:text-purple-600" />
                        </div>
                        </button>

                        {/* Annual Plan */}
                        <button 
                        onClick={() => handlePlanSelect('ANNUAL')}
                        className="w-full p-1 border-2 border-purple-500 rounded-2xl relative overflow-hidden group shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                        >
                        <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                            MAIS POPULAR
                        </div>
                        <div className="p-4 flex items-center justify-between">
                            <div className="text-left">
                                <span className="block text-xs font-bold text-purple-500 uppercase tracking-wider mb-1">Anual (Economize 33%)</span>
                                <span className="text-2xl font-bold text-gray-800">R$ 199,99</span>
                                <span className="block text-[10px] text-gray-400">Equivale a R$ 16,66/mês</span>
                            </div>
                            <div className="bg-purple-100 p-2 rounded-full">
                                <Star className="w-6 h-6 text-purple-600 fill-purple-600" />
                            </div>
                        </div>
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* STEP 2: PAYMENT REDIRECT (REAL PAYMENT) */}
        {step === 'PAYMENT_REDIRECT' && (
            <div className="flex-1 p-6 flex flex-col overflow-y-auto">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShieldCheck className="w-10 h-10 text-purple-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Quase lá!</h2>
                    <p className="text-gray-500 mt-2">
                        Você escolheu o plano <span className="font-bold text-gray-800">{selectedPlan === 'MONTHLY' ? 'Mensal' : 'Anual'}</span>.
                        <br />
                        O valor total é <span className="font-bold text-purple-600">R$ {planPrice}</span>.
                    </p>
                </div>

                <div className="space-y-4 bg-gray-50 p-6 rounded-2xl mb-6 border border-gray-100">
                    <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Passo a Passo:</h3>
                    <ol className="space-y-4 text-sm text-gray-600">
                        <li className="flex gap-3">
                            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center font-bold text-gray-800 shadow-sm shrink-0">1</div>
                            <p>Clique no botão abaixo para abrir o <strong>Mercado Pago</strong> (Ambiente Seguro).</p>
                        </li>
                        <li className="flex gap-3">
                            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center font-bold text-gray-800 shadow-sm shrink-0">2</div>
                            <p>Escolha pagar com <strong>Pix, Cartão ou Boleto</strong>.</p>
                        </li>
                        <li className="flex gap-3">
                            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center font-bold text-gray-800 shadow-sm shrink-0">3</div>
                            <p>Após pagar, volte aqui e clique em <strong>"Já realizei o pagamento"</strong> para liberar seu acesso.</p>
                        </li>
                    </ol>
                </div>

                <div className="mt-auto space-y-3">
                    <button 
                        onClick={handleOpenPaymentLink}
                        className="w-full bg-blue-500 text-white py-4 rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg flex items-center justify-center gap-2"
                    >
                        Pagar com Mercado Pago <ExternalLink className="w-4 h-4" />
                    </button>
                    
                    <button 
                        onClick={handleSendProof}
                        className="w-full bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition-colors shadow-sm flex items-center justify-center gap-2"
                    >
                        <MessageCircle className="w-4 h-4" /> Enviar comprovante no WhatsApp
                    </button>

                    <button 
                        onClick={handleAlreadyPaid}
                        disabled={isProcessing}
                        className="w-full bg-white border-2 border-purple-100 text-purple-600 py-3 rounded-xl font-bold hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
                    >
                        {isProcessing ? <Loader className="w-4 h-4 animate-spin" /> : "Já realizei o pagamento"}
                    </button>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};