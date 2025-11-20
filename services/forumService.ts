import { ForumPost, ForumComment } from '../types';

const STORAGE_KEY = 'mamaefeliz_forum_posts';

const SEED_POSTS: ForumPost[] = [
  {
    id: '1',
    title: 'Dica infalível para cólicas!',
    content: 'Meninas, descobri que fazer compressa morna com sementes de cereja ajuda muito! Alguém mais já testou?',
    category: 'saude',
    author: 'Mamãe da Sofia',
    timestamp: new Date(Date.now() - 86400000 * 2), // 2 days ago
    likes: 12,
    comments: [
      {
        id: 'c1',
        author: 'Mamãe do Pedro',
        text: 'Aqui em casa funcionou super bem também!',
        timestamp: new Date(Date.now() - 86000000 * 2)
      }
    ]
  },
  {
    id: '2',
    title: 'Regressão do sono aos 4 meses',
    content: 'Socorro! Meu bebê dormia a noite toda e agora acorda de hora em hora. É normal? Quanto tempo dura?',
    category: 'sono',
    author: 'Ana Luiza',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    likes: 5,
    comments: []
  },
  {
    id: '3',
    title: 'Ideias para lancheira escolar (2 anos)',
    content: 'Preciso de ideias saudáveis e práticas para mandar na escola. Ele não gosta muito de frutas inteiras.',
    category: 'alimentacao',
    author: 'Carla M.',
    timestamp: new Date(Date.now() - 172800000), // 2 days ago
    likes: 24,
    comments: []
  }
];

export const getPosts = (): ForumPost[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_POSTS));
    return SEED_POSTS;
  }
  // Parse dates correctly
  const posts = JSON.parse(stored);
  return posts.map((p: any) => ({
    ...p,
    timestamp: new Date(p.timestamp),
    comments: p.comments.map((c: any) => ({ ...c, timestamp: new Date(c.timestamp) }))
  }));
};

export const createPost = (title: string, content: string, category: any, author: string): ForumPost => {
  const posts = getPosts();
  const newPost: ForumPost = {
    id: Date.now().toString(),
    title,
    content,
    category,
    author,
    timestamp: new Date(),
    likes: 0,
    comments: []
  };
  
  const updatedPosts = [newPost, ...posts];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
  return newPost;
};

export const addComment = (postId: string, text: string, author: string): ForumPost[] => {
  const posts = getPosts();
  const updatedPosts = posts.map(p => {
    if (p.id === postId) {
      const newComment: ForumComment = {
        id: Date.now().toString(),
        text,
        author,
        timestamp: new Date()
      };
      return { ...p, comments: [...p.comments, newComment] };
    }
    return p;
  });
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
  return updatedPosts;
};

export const likePost = (postId: string): ForumPost[] => {
  const posts = getPosts();
  const updatedPosts = posts.map(p => {
    if (p.id === postId) {
      return { ...p, likes: p.likes + 1 };
    }
    return p;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
  return updatedPosts;
};

export const reportPost = (postId: string): ForumPost[] => {
  const posts = getPosts();
  const updatedPosts = posts.map(p => {
    if (p.id === postId) {
      return { ...p, isReported: true };
    }
    return p;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
  return updatedPosts;
};