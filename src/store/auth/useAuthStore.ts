import { create, type StateCreator } from 'zustand';
import { api } from '@/shared/api/apiClient';
import { createJSONStorage, persist, devtools } from 'zustand/middleware';

interface IUserLogin {
  email: string;
  password: string;
}

interface IAction {
  login: (user: IUserLogin)=>void;
  logout: () => void;
  register: (user: IUserLogin) => void;
}
interface IUser { 
  user_id: string;
  email: string;
  avatar_url: string| null;
}

interface IAuth { 
  refreshToken: string | null;
  token: string | null;
  user: IUser | null;
  isAuthenticated: boolean;
}

const initialState: IAuth = { 
  isAuthenticated: false,
  refreshToken: null,
  token: null,
  user: null
}


interface IAuthState extends IAction, IAuth {}

const authStore: StateCreator<IAuthState,[["zustand/devtools", never], ["zustand/persist", unknown]]> = (set) => ({
  ...initialState,
  login: async (user: IUserLogin) => {
    // try { 
      const response = await api.post('/login', {
        username: user.email,
        password: user.password,
      });
      console.log('login store', response);
      

      const { token } = response.data;
      
      set({token: token, isAuthenticated: true}, false, 'auth_store_login');
    
    // } catch (error) { 

      // console.log(error);
      // useAuthStore.getState().logout();
    // }
  },
  logout: () => set(() => ({token: '', isAuthenticated: false}), false, 'auth_store_register'),
  register: async (user: IUserLogin) => {
    try { 
      const response = await api.post('/user/register', {
        email: user.email,
        password: user.password,
      });

      const { token } = response.data;
      
      set({token: token, isAuthenticated: true}, false, 'auth_store_register');
    
    } catch (error) { 

      console.log(error);
      useAuthStore.getState().logout();
    }
  }
})

export const useAuthStore = create<IAuthState>()(
  devtools(
    persist(
      authStore, 
      {
        name: 'auth-storege',
        storage: createJSONStorage(()=>localStorage)
      }
    )
  )
);

export const useIsAuthenticated = () => useAuthStore((state)=>state.isAuthenticated);
export const useToken = () => useAuthStore((state)=>state.token);
export const login = (user: IUserLogin) => useAuthStore.getState().login(user);
export const logout = () => useAuthStore.getState().logout();
export const register = (user: IUserLogin) => useAuthStore.getState().register(user);