import { create, type StateCreator } from 'zustand';
import { api } from '@/shared/api/apiClient';
import { createJSONStorage, persist, devtools } from 'zustand/middleware';
import type { IAuthState, IUserLogin, IAuth } from './types';
import type { IUser } from './types';
const initialState: IAuth = {
  isAuthenticated: false,
  refreshToken: null,
  token: null,
  user: null,
};

const authStore: StateCreator<
  IAuthState,
  [['zustand/devtools', never], ['zustand/persist', unknown]]
> = (set, get) => ({
  ...initialState,
  getMe: async () => {
    const { data } = await api.get('/users/me');
    set({
      user: {
        user_id: data.id,
        email: data.email,
        avatar_url: data.avatar_url,
      },
    });
  },
  login: async (user: IUserLogin) => {
    // try {
    const { data } = await api.post('/login', {
      username: user.email,
      password: user.password,
    });

    const { token } = data;

    set({ token: token, isAuthenticated: true }, false, 'auth_store_login');

    get().getMe();

    // } catch (error) {

    // console.log(error);
    // useAuthStore.getState().logout();
    // }
  },
  logout: () =>
    set(
      () => ({ token: '', isAuthenticated: false }),
      false,
      'auth_store_register'
    ),
  register: async (user: IUserLogin) => {
    try {
      const response = await api.post('/user/register', {
        email: user.email,
        password: user.password,
      });

      const { token } = response.data;

      set(
        { token: token, isAuthenticated: true },
        false,
        'auth_store_register'
      );
    } catch (error) {
      console.log(error);
      useAuthStore.getState().logout();
    }
  },
});

export const useAuthStore = create<IAuthState>()(
  devtools(
    persist(authStore, {
      name: 'auth-storege',
      storage: createJSONStorage(() => localStorage),
    })
  )
);

export const useUser = (): IUser => {
  useAuthStore((state) => state.user);

  const user = useAuthStore((state) => state.user);
  if (!user) {
    throw new Error('User not storate');
  }
  return user;
};
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useToken = () => useAuthStore((state) => state.token);
export const login = (user: IUserLogin) => useAuthStore.getState().login(user);
export const logout = () => useAuthStore.getState().logout();
export const register = (user: IUserLogin) =>
  useAuthStore.getState().register(user);
