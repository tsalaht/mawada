import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

interface Match {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  age: number;
  location: string;
  distance: number;
  commonInterests: string[];
  matchedAt: Date;
  lastInteraction: Date;
  isSuperLike: boolean;
  status: 'pending' | 'accepted' | 'rejected';
}

interface MatchState {
  matches: Match[];
  likes: Match[];
  superLikes: Match[];
  activeTab: 'matches' | 'likes' | 'superLikes';
  
  // Actions
  setActiveTab: (tab: 'matches' | 'likes' | 'superLikes') => void;
  addMatch: (match: Match) => void;
  addLike: (like: Match) => void;
  addSuperLike: (superLike: Match) => void;
  acceptMatch: (matchId: string) => void;
  rejectMatch: (matchId: string) => void;
  removeLike: (likeId: string) => void;
  updateMatchStatus: (matchId: string, status: 'pending' | 'accepted' | 'rejected') => void;
}

const createMatchStore: StateCreator<MatchState> = (set) => ({
  matches: [],
  likes: [],
  superLikes: [],
  activeTab: 'matches',

  setActiveTab: (tab) => set((state) => ({ ...state, activeTab: tab })),
  
  addMatch: (match) => 
    set((state) => ({ ...state, matches: [...state.matches, match] })),
  
  addLike: (like) => 
    set((state) => ({ ...state, likes: [...state.likes, like] })),
  
  addSuperLike: (superLike) => 
    set((state) => ({ ...state, superLikes: [...state.superLikes, superLike] })),
  
  acceptMatch: (matchId) =>
    set((state) => ({
      ...state,
      matches: state.matches.map((match) =>
        match.id === matchId ? { ...match, status: 'accepted' } : match
      ),
    })),
  
  rejectMatch: (matchId) =>
    set((state) => ({
      ...state,
      matches: state.matches.map((match) =>
        match.id === matchId ? { ...match, status: 'rejected' } : match
      ),
    })),
  
  removeLike: (likeId) =>
    set((state) => ({
      ...state,
      likes: state.likes.filter((like) => like.id !== likeId),
    })),
  
  updateMatchStatus: (matchId, status) =>
    set((state) => ({
      ...state,
      matches: state.matches.map((match) =>
        match.id === matchId ? { ...match, status } : match
      ),
    })),
});

export const useMatchStore = create<MatchState>()(
  persist(createMatchStore, {
    name: 'match-storage',
  })
); 