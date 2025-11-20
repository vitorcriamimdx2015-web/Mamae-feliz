import React, { useState } from 'react';
import { Play, BookOpen, Stethoscope, Video, ChevronDown, ChevronUp, TrendingUp, Lock } from 'lucide-react';
import { EDUCATIONAL_VIDEOS, PEDIATRICIAN_TIPS } from '../constants';
import { VideoResource } from '../types';

interface ResourcesViewProps {
    onPlayVideo: (video: VideoResource) => void;
    isPremium?: boolean;
    onTriggerSubscription: () => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({ onPlayVideo, isPremium = false, onTriggerSubscription }) => {
  const [activeTab, setActiveTab] = useState<'videos' | 'tips'>('videos');
  const [expandedTipId, setExpandedTipId] = useState<string | null>(null);

  const toggleTip = (id: string) => {
    setExpandedTipId(expandedTipId === id ? null : id);
  };

  const handleVideoClick = (video: VideoResource) => {
    if (video.isPremium && !isPremium) {
        onTriggerSubscription();
    } else {
        onPlayVideo(video);
    }
  };

  return (
    <div className="flex flex-col h-full bg-purple-50 animate-fade-in relative">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4 px-1">Dicas & Conteúdos</h2>
        <div className="flex p-1 bg-gray-100 rounded-xl">
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'videos' 
                ? 'bg-white text-purple-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Video className="w-4 h-4" />
            Vídeos Virais
          </button>
          <button
            onClick={() => setActiveTab('tips')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'tips' 
                ? 'bg-white text-teal-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            Pediatra Diz
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        
        {/* VIDEOS TAB */}
        {activeTab === 'videos' && (
          <div className="space-y-6">
            <div className="bg-purple-100 p-4 rounded-xl flex gap-3 items-start">
              <TrendingUp className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-purple-800 leading-relaxed">
                Separamos os vídeos que estão bombando entre as mamães! Dicas rápidas de especialistas que funcionam na prática.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EDUCATIONAL_VIDEOS.map((video) => {
                const isLocked = video.isPremium && !isPremium;
                return (
                    <div 
                        key={video.id} 
                        onClick={() => handleVideoClick(video)}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-md transition-all relative"
                    >
                        {/* Thumbnail Container */}
                        <div className="relative h-48 bg-gray-900">
                            <img 
                            src={video.thumbnailUrl} 
                            alt={video.title} 
                            className={`w-full h-full object-cover transition-opacity ${isLocked ? 'opacity-40 blur-sm' : 'opacity-90 group-hover:opacity-100'}`}
                            />
                            
                            {isLocked ? (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center shadow-lg">
                                            <Lock className="w-6 h-6 text-white" />
                                        </div>
                                        <span className="text-white font-bold text-sm shadow-md">Vídeo Premium</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                                        <Play className="w-6 h-6 text-purple-600 ml-1" />
                                    </div>
                                </div>
                            )}

                            {!isLocked && (
                                <>
                                    <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md font-medium flex items-center gap-1">
                                    <Play className="w-3 h-3 fill-current" /> {video.duration}
                                    </div>
                                    <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
                                        <TrendingUp className="w-3 h-3" /> EM ALTA
                                    </div>
                                </>
                            )}
                        </div>
                        
                        <div className="p-4">
                            <span className="text-xs font-bold text-purple-500 uppercase tracking-wide">{video.category}</span>
                            <h3 className="font-bold text-gray-800 mt-1 mb-2 leading-snug text-lg flex items-center gap-2">
                                {video.title}
                                {isLocked && <Lock className="w-4 h-4 text-gray-400" />}
                            </h3>
                            <p className="text-sm text-gray-500 line-clamp-2">{video.description}</p>
                        </div>
                    </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TIPS TAB */}
        {activeTab === 'tips' && (
          <div className="space-y-4">
             <div className="bg-teal-50 p-4 rounded-xl flex gap-3 items-start mb-6">
              <BookOpen className="w-6 h-6 text-teal-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-teal-800 leading-relaxed">
                Respostas para as dúvidas mais comuns no consultório, explicadas por especialistas.
              </p>
            </div>

            {PEDIATRICIAN_TIPS.map((tip) => {
              const isLocked = tip.isPremium && !isPremium;
              return (
                <div 
                    key={tip.id} 
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all"
                >
                    <button 
                    onClick={() => isLocked ? onTriggerSubscription() : toggleTip(tip.id)}
                    className="w-full p-4 text-left flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors"
                    >
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isLocked ? 'bg-gray-100 text-gray-400' : 'bg-indigo-100 text-indigo-500'}`}>
                        {isLocked ? <Lock className="w-5 h-5" /> : <Stethoscope className="w-5 h-5" />}
                        </div>
                        <div>
                        <span className="text-[10px] font-bold text-indigo-400 uppercase">{tip.topic}</span>
                        <h3 className={`font-bold text-gray-800 text-sm md:text-base pr-4 ${isLocked ? 'opacity-60' : ''}`}>
                            {tip.question}
                            {isLocked && <span className="ml-2 text-[10px] text-purple-500 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">Premium</span>}
                        </h3>
                        </div>
                    </div>
                    {!isLocked && (
                        expandedTipId === tip.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                        )
                    )}
                    </button>

                    {expandedTipId === tip.id && !isLocked && (
                    <div className="px-4 pb-4 pt-0 bg-white animate-fade-in">
                        <div className="pl-14 pr-2">
                        <div className="p-4 bg-indigo-50 rounded-xl text-sm text-gray-700 leading-relaxed">
                            "{tip.answer}"
                        </div>
                        <div className="flex items-center justify-end mt-2 gap-2">
                            <div className="text-right">
                                <p className="text-xs font-bold text-gray-800">{tip.doctorName}</p>
                                <p className="text-[10px] text-gray-500">{tip.specialty}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};