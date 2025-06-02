import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '@/shared/api/apiClient';

type User = {
  user_id: string;
  email: string;
  avatar_url: string | null;
};


type AuthState = {
  refreshToken: string | null;
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  logining: (email: string, password: string) => Promise<void>;
  registered: (email: string, password: string) => Promise<void>;
};

export const authStore = create<AuthState>()(
  persist(
    (set) => ({
      refreshToken: null,
      token: null,
      user: null,
      isAuthenticated: false,
      registered: async(email, password) => {
        try { 
          authStore.getState().login('');
          await api.post('/users/register',{
            email: email,
            password: password
          });
        } catch( error ) { 
          console.error('Login error:', error);
          throw error;
        }
      },
      logining: async (email, password) => {
        try {
          authStore.getState().login('');
          const response = await api.post('/login', {
            username: email,
            password: password,
          });

          const { token } = response.data;
          authStore.getState().login(token);
        } catch (error) {
          console.error('Login error:', error);
          throw error;
        }
      },
      login: (token) => {
        set({
          token,
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
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);