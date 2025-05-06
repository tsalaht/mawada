import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: 'text' | 'image' | 'voice' | 'file';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  fileUrl?: string;
  duration?: number; // for voice messages
}

interface Chat {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  lastMessage: Message;
  unreadCount: number;
  isOnline: boolean;
  lastSeen: Date;
}

interface ChatState {
  // Chats
  activeChats: Chat[];
  pendingRequests: Chat[];
  likedUsers: Chat[];
  activeTab: 'chats' | 'requests' | 'liked';
  
  // Messages
  messages: Record<string, Message[]>;
  currentChatId: string | null;
  
  // Actions
  setActiveTab: (tab: 'chats' | 'requests' | 'liked') => void;
  addMessage: (chatId: string, message: Message) => void;
  setCurrentChat: (chatId: string) => void;
  markAsRead: (chatId: string) => void;
  addPendingRequest: (chat: Chat) => void;
  acceptRequest: (chatId: string) => void;
  rejectRequest: (chatId: string) => void;
}

const createChatStore: StateCreator<ChatState> = (set) => ({
  activeChats: [],
  pendingRequests: [],
  likedUsers: [],
  activeTab: 'chats',
  messages: {},
  currentChatId: null,

  setActiveTab: (tab) => set((state) => ({ ...state, activeTab: tab })),
  
  addMessage: (chatId, message) => 
    set((state) => ({
      ...state,
      messages: {
        ...state.messages,
        [chatId]: [...(state.messages[chatId] || []), message],
      },
    })),
  
  setCurrentChat: (chatId) => set((state) => ({ ...state, currentChatId: chatId })),
  
  markAsRead: (chatId) =>
    set((state) => ({
      ...state,
      activeChats: state.activeChats.map((chat) =>
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
      ),
    })),
  
  addPendingRequest: (chat) =>
    set((state) => ({
      ...state,
      pendingRequests: [...state.pendingRequests, chat],
    })),
  
  acceptRequest: (chatId) =>
    set((state) => ({
      ...state,
      pendingRequests: state.pendingRequests.filter((chat) => chat.id !== chatId),
      activeChats: [
        ...state.activeChats,
        state.pendingRequests.find((chat) => chat.id === chatId)!,
      ],
    })),
  
  rejectRequest: (chatId) =>
    set((state) => ({
      ...state,
      pendingRequests: state.pendingRequests.filter((chat) => chat.id !== chatId),
    })),
});

export const useChatStore = create<ChatState>()(
  persist(createChatStore, {
    name: 'chat-storage',
  })
); 