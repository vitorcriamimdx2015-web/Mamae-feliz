import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage, VideoResource } from '../types';
import { Bot, User, Play } from 'lucide-react';
import { EDUCATIONAL_VIDEOS } from '../constants';

interface ChatBubbleProps {
  message: ChatMessage;
  onPlayVideo: (video: VideoResource) => void;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, onPlayVideo }) => {
  const isUser = message.role === 'user';

  // Helper to parse text and replace [[VIDEO:id]] with a UI component
  const renderContent = (text: string) => {
    if (isUser) return <p>{text}</p>;

    // Split by the video tag pattern
    const parts = text.split(/(\[\[VIDEO:.*?\]\])/g);

    return (
      <div className="prose prose-sm prose-purple max-w-none">
        {parts.map((part, index) => {
          // Check if this part is a video tag
          const videoMatch = part.match(/^\[\[VIDEO:(.*?)\]\]$/);
          
          if (videoMatch) {
            const videoId = videoMatch[1];
            const video = EDUCATIONAL_VIDEOS.find(v => v.id === videoId);

            if (video) {
              return (
                <div 
                  key={index} 
                  onClick={() => onPlayVideo(video)}
                  className="not-prose my-3 bg-purple-50 border border-purple-100 rounded-xl p-2 flex items-center gap-3 cursor-pointer hover:bg-purple-100 transition-colors group shadow-sm"
                >
                  <div className="relative w-20 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                     <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                     <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Play className="w-5 h-5 text-white fill-current" />
                     </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-purple-600 uppercase mb-0.5">Vídeo Sugerido</p>
                    <p className="text-sm font-semibold text-gray-800 truncate leading-tight">{video.title}</p>
                    <p className="text-[10px] text-gray-500">{video.duration}</p>
                  </div>
                </div>
              );
            }
            return null; // Video not found, render nothing for this tag
          }

          // Render regular text/markdown
          return <ReactMarkdown key={index}>{part}</ReactMarkdown>;
        })}
      </div>
    );
  };

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[90%] md:max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${isUser ? 'bg-purple-500' : 'bg-teal-500'}`}>
          {isUser ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
        </div>

        {/* Bubble */}
        <div 
          className={`p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed
            ${isUser 
              ? 'bg-purple-500 text-white rounded-tr-none' 
              : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'
            }`}
        >
          {renderContent(message.text)}
          
          <span className={`text-[10px] block mt-2 opacity-70 ${isUser ? 'text-purple-100' : 'text-gray-400'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};