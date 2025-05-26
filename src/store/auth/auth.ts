import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  user_id: string;
  email: string;
  avatar_url: string | null;
};

type AuthState = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
};

export const authStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      
      login: (token, user) => {
        set({ 
          token,
          user,
          isAuthenticated: true 
        });
      },
      
      logout: () => {
        set({ 
          token: null,
          user: null,
          isAuthenticated: false 
        });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        token: state.token,
        user: state.user 
      }),
    }
  )
);