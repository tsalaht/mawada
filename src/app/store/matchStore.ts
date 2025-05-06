import { create } from 'zustand';

interface MatchStore {
  matches: any[];
  likes: any[];
  superLikes: any[];
  activeTab: 'matches' | 'likes' | 'superLikes';
  setActiveTab: (tab: 'matches' | 'likes' | 'superLikes') => void;
}

export const useMatchStore = create<MatchStore>((set) => ({
  matches: [],
  likes: [],
  superLikes: [],
  activeTab: 'matches',
  setActiveTab: (tab) => set({ activeTab: tab }),
})); 