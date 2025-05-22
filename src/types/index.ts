export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  image?: string;
  category: string;
  technologies?: string[];
  demoUrl?: string;
  githubUrl?: string;
  features?: string[];
  createdAt: string;
  updatedAt?: string;
  featured?: boolean;
  averageRating?: number;
  totalRatings?: number;
  comments?: Comment[];
  developerId: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  text: string;
  rating: number;
  createdAt: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Developer {
  id: string;
  name: string;
  slug: string;
  bio: string;
  avatar?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  skills: string[];
  createdAt: string;
  updatedAt?: string;
} 