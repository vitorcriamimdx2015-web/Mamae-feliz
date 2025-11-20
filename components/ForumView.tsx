import React, { useState, useEffect } from 'react';
import { Plus, ArrowLeft, Send, ThumbsUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { ForumPost, ForumComment } from '../types';
import { getPosts, createPost, addComment, likePost, reportPost } from '../services/forumService';
import { ForumPostCard } from './ForumPostCard';
import { FORUM_CATEGORIES } from '../constants';

export const ForumView: React.FC = () => {
  const [view, setView] = useState<'list' | 'detail' | 'create'>('list');
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [filter, setFilter] = useState<string>('all');

  // Create Post State
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<string>('outros');
  
  // Comment State
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    setPosts(getPosts());
  }, []);

  const handlePostClick = (post: ForumPost) => {
    setSelectedPost(post);
    setView('detail');
  };

  const handleCreatePost = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    createPost(newTitle, newContent, newCategory, 'Mamãe Anônima'); // Mock author
    setPosts(getPosts());
    setNewTitle('');
    setNewContent('');
    setNewCategory('outros');
    setView('list');
  };

  const handleAddComment = () => {
    if (!selectedPost || !commentText.trim()) return;
    const updatedPosts = addComment(selectedPost.id, commentText, 'Mamãe Anônima');
    setPosts(updatedPosts);
    // Update selected post reference
    const updatedSelected = updatedPosts.find(p => p.id === selectedPost.id);
    if (updatedSelected) setSelectedPost(updatedSelected);
    setCommentText('');
  };

  const handleLike = (e: React.MouseEvent, post: ForumPost) => {
    e.stopPropagation();
    const updatedPosts = likePost(post.id);
    setPosts(updatedPosts);
    if (selectedPost && selectedPost.id === post.id) {
        const updatedSelected = updatedPosts.find(p => p.id === post.id);
        if (updatedSelected) setSelectedPost(updatedSelected);
    }
  };

  const handleReport = () => {
    if (!selectedPost) return;
    if (window.confirm("Tem certeza que deseja denunciar este conteúdo como impróprio?")) {
        const updatedPosts = reportPost(selectedPost.id);
        setPosts(updatedPosts);
        setView('list');
        alert("Conteúdo enviado para moderação. Obrigado por ajudar a manter a comunidade segura.");
    }
  };

  // RENDER: CREATE POST
  if (view === 'create') {
    return (
      <div className="flex flex-col h-full bg-purple-50 animate-fade-in">
        <div className="p-4 bg-white shadow-sm flex items-center gap-3 sticky top-0 z-10">
          <button onClick={() => setView('list')} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h2 className="font-bold text-lg text-gray-800">Novo Tópico</h2>
        </div>

        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-300 focus:border-transparent outline-none"
              placeholder="Ex: Dúvida sobre vacinação..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(FORUM_CATEGORIES).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setNewCategory(key)}
                  className={`px-3 py-2 rounded-lg text-sm border transition-all ${
                    newCategory === key 
                      ? 'bg-teal-500 text-white border-teal-500 shadow-md' 
                      : 'bg-white text-gray-600 border-gray-200 hover:border-teal-300'
                  }`}
                >
                  {val.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo</label>
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              rows={6}
              className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-300 focus:border-transparent outline-none resize-none"
              placeholder="Compartilhe sua experiência ou dúvida com detalhes..."
            />
          </div>

          <div className="bg-purple-100 p-4 rounded-xl flex gap-3 items-start">
            <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-purple-800">
              Mantenha o respeito. Ofensas, julgamentos agressivos ou conselhos médicos perigosos serão removidos pela moderação.
            </p>
          </div>
        </div>

        <div className="p-4 bg-white border-t">
          <button
            onClick={handleCreatePost}
            disabled={!newTitle.trim() || !newContent.trim()}
            className="w-full py-3 bg-teal-500 text-white rounded-xl font-bold hover:bg-teal-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-lg"
          >
            Publicar Tópico
          </button>
        </div>
      </div>
    );
  }

  // RENDER: DETAIL VIEW
  if (view === 'detail' && selectedPost) {
    const categoryStyle = FORUM_CATEGORIES[selectedPost.category] || FORUM_CATEGORIES.outros;
    
    return (
      <div className="flex flex-col h-full bg-purple-50 animate-fade-in">
        <div className="p-4 bg-white shadow-sm flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => setView('list')} className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h2 className="font-bold text-lg text-gray-800 truncate max-w-[200px]">Discussão</h2>
          </div>
          <button onClick={handleReport} className="text-gray-400 hover:text-red-500 p-2" title="Denunciar">
            <AlertTriangle className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 pb-20">
          {/* Post Content */}
          <div className="bg-white p-5 rounded-2xl shadow-sm mb-6">
             <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full mb-3 ${categoryStyle.color}`}>
              {categoryStyle.label}
            </span>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">{selectedPost.title}</h1>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap mb-6">{selectedPost.content}</p>
            
            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              <div>
                <p className="text-sm font-bold text-teal-600">{selectedPost.author}</p>
                <p className="text-xs text-gray-400">{selectedPost.timestamp.toLocaleDateString()} às {selectedPost.timestamp.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</p>
              </div>
              <button 
                onClick={(e) => handleLike(e, selectedPost)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-500 hover:bg-purple-100 transition-colors"
              >
                <ThumbsUp className="w-4 h-4" />
                <span className="font-bold">{selectedPost.likes}</span>
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <h3 className="font-bold text-gray-700 mb-4 ml-1">Comentários ({selectedPost.comments.length})</h3>
          <div className="space-y-4">
            {selectedPost.comments.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                    <p>Seja a primeira a comentar!</p>
                </div>
            ) : (
                selectedPost.comments.map((comment) => (
                <div key={comment.id} className="bg-white p-4 rounded-xl border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-sm text-gray-700">{comment.author}</span>
                    <span className="text-xs text-gray-400">{comment.timestamp.toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{comment.text}</p>
                </div>
                ))
            )}
          </div>
        </div>

        {/* Comment Input */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Escreva um comentário de apoio..."
              className="flex-1 bg-gray-50 border-gray-200 rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-teal-300 focus:outline-none"
              onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
            />
            <button
              onClick={handleAddComment}
              disabled={!commentText.trim()}
              className="bg-teal-500 text-white p-3 rounded-full hover:bg-teal-600 disabled:bg-gray-300 transition-colors shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // RENDER: LIST VIEW (DEFAULT)
  const filteredPosts = posts.filter(p => 
    !p.isReported && (filter === 'all' || p.category === filter)
  ).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return (
    <div className="flex flex-col h-full bg-purple-50 relative">
      {/* Category Filter */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Todos
          </button>
          {Object.entries(FORUM_CATEGORIES).map(([key, val]) => (
            <button 
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === key ? 'bg-teal-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {val.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
                <p className="text-gray-500">Nenhum tópico encontrado nesta categoria.</p>
            </div>
        ) : (
            filteredPosts.map(post => (
            <ForumPostCard 
                key={post.id} 
                post={post} 
                onClick={() => handlePostClick(post)} 
            />
            ))
        )}
      </div>

      {/* FAB Create Post */}
      <button 
        onClick={() => setView('create')}
        className="absolute bottom-6 right-6 w-14 h-14 bg-teal-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-teal-600 transition-transform hover:scale-105 active:scale-95 z-20"
      >
        <Plus className="w-8 h-8" />
      </button>
    </div>
  );
};