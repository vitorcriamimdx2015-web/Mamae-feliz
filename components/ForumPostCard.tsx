import React from 'react';
import { MessageCircle, ThumbsUp, Clock } from 'lucide-react';
import { ForumPost } from '../types';
import { FORUM_CATEGORIES } from '../constants';

interface ForumPostCardProps {
  post: ForumPost;
  onClick: () => void;
}

export const ForumPostCard: React.FC<ForumPostCardProps> = ({ post, onClick }) => {
  const categoryStyle = FORUM_CATEGORIES[post.category] || FORUM_CATEGORIES.outros;
  const dateString = post.timestamp.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });

  if (post.isReported) return null;

  return (
    <div 
      onClick={onClick}
      className="bg-white p-4 rounded-xl shadow-sm border border-rose-50 mb-3 cursor-pointer hover:shadow-md transition-all active:scale-[0.99]"
    >
      <div className="flex justify-between items-start mb-2">
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${categoryStyle.color}`}>
          {categoryStyle.label}
        </span>
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <Clock className="w-3 h-3" /> {dateString}
        </span>
      </div>
      
      <h3 className="font-bold text-gray-800 text-lg leading-snug mb-1">{post.title}</h3>
      <p className="text-gray-500 text-sm line-clamp-2 mb-3">{post.content}</p>
      
      <div className="flex items-center justify-between border-t border-gray-50 pt-2 mt-1">
        <span className="text-xs font-medium text-rose-500">{post.author}</span>
        
        <div className="flex items-center gap-4 text-gray-400 text-xs">
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4" />
            <span>{post.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};