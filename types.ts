import React from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface QuickTopic {
  id: string;
  icon: React.ReactNode;
  title: string;
  prompt: string;
  color: string;
}

export interface ForumComment {
  id: string;
  author: string;
  text: string;
  timestamp: Date;
  isExpert?: boolean; // Simulation for "Verified Mom" or Expert
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: 'alimentacao' | 'sono' | 'saude' | 'comportamento' | 'outros';
  author: string;
  timestamp: Date;
  likes: number;
  comments: ForumComment[];
  isReported?: boolean; // For moderation
}

export interface Recipe {
  id: string;
  title: string;
  category: 'papinhas' | 'frutas' | 'sucos_lanches';
  ageRecommendation: string;
  prepTime: string;
  ingredients: string[];
  instructions: string[];
  benefits: string; // Short description of nutritional value
  isPremium?: boolean;
}

export interface VideoResource {
  id: string;
  title: string;
  duration: string;
  category: string;
  thumbnailUrl: string;
  videoUrl: string;
  description: string;
  isPremium?: boolean;
}

export interface ExpertTip {
  id: string;
  topic: string;
  question: string;
  answer: string;
  doctorName: string;
  specialty: string;
  isPremium?: boolean;
}

export interface UserProfile {
  momName: string;
  babyName: string;
  babyBirthDate: string;
  isPremium?: boolean;
}

export enum AppState {
  HOME = 'HOME',
  CHAT = 'CHAT',
  FORUM = 'FORUM',
  RECIPES = 'RECIPES',
  HEALTH = 'HEALTH',
  RESOURCES = 'RESOURCES'
}