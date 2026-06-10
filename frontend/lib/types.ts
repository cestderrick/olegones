export interface Event {
  id: number;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  link?: string;
  spots?: number;
}

export interface Document {
  id: number;
  title: string;
  description?: string;
  file_url: string;
  category: string;
  order_num: number;
}

export interface Reference {
  id: number;
  title: string;
  author?: string;
  description?: string;
  image_url?: string;
  link?: string;
  type: 'book' | 'game' | 'other';
  order_num: number;
}

export interface Post {
  id: number;
  title: string;
  excerpt?: string;
  content?: string;
  image_url?: string;
  visible: boolean;
  published_at: string;
}

export interface InstagramPost {
  id: number;
  image_url: string;
  caption?: string;
  post_url?: string;
  created_at: string;
}
