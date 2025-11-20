import React from 'react';
import { X } from 'lucide-react';
import { VideoResource } from '../types';

interface VideoPlayerModalProps {
  video: VideoResource;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ video, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col animate-fade-in">
      <div className="flex items-center justify-between p-4 text-white/80">
        <h3 className="font-bold text-sm truncate max-w-[80%]">{video.title}</h3>
        <button 
          onClick={onClose}
          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </div>
      
      <div className="flex-1 flex items-center justify-center w-full bg-black p-2 md:p-10">
        <div className="w-full max-w-4xl aspect-video bg-black relative rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
          <iframe 
            src={video.videoUrl} 
            title={video.title}
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="p-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-wide block mb-2">{video.category}</span>
          <h2 className="text-xl font-bold mb-2">{video.title}</h2>
          <p className="text-gray-400 text-sm leading-relaxed">{video.description}</p>
        </div>
      </div>
    </div>
  );
};