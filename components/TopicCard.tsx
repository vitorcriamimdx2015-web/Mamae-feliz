import React, { useState } from 'react';
import { QuickTopic } from '../types';
import { ChevronRight } from 'lucide-react';

interface TopicCardProps {
  topic: QuickTopic;
  onClick: (prompt: string) => void;
}

export const TopicCard: React.FC<TopicCardProps> = ({ topic, onClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    // Add a small delay to allow the user to see the feedback animation
    setTimeout(() => {
      onClick(topic.prompt);
      setIsClicked(false);
    }, 200);
  };

  return (
    <button 
      onClick={handleClick}
      className={`flex items-center p-4 rounded-xl shadow-sm transition-all duration-200 border group w-full text-left
        ${isClicked 
          ? 'bg-purple-50 border-purple-200 scale-[0.97] shadow-inner' 
          : 'bg-white border-purple-50 hover:shadow-md'
        }
      `}
    >
      <div className={`p-3 rounded-lg ${topic.color} shadow-sm mr-4 transition-transform duration-200 ${isClicked ? 'scale-90' : ''}`}>
        {topic.icon}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-gray-700 text-base md:text-lg">{topic.title}</h3>
        <p className="text-xs text-gray-400 mt-1">Toque para perguntar</p>
      </div>
      <ChevronRight className={`w-5 h-5 transition-colors ${isClicked ? 'text-purple-500' : 'text-gray-300 group-hover:text-purple-400'}`} />
    </button>
  );
};