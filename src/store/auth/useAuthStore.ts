import { create, type StateCreator } from 'zustand';
import { api } from '@/shared/api/apiClient';
import {  apolloClient } from '@/shared/api/apolloClients';
import { gql } from '@apollo/client';
import { createJSONStorage, persist, devtools } from 'zustand/middleware';
import type { IAuthState, ILoginInput, IAuth, IUser } from './types';

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
  getUsers: async () => {
    const { data } = await apolloClient.query({
      query: gql`
        query {
          users {
            edges {
              node {
                id
                email
              }
            }
          }
        }
      `
    });    
  },
  getMe: async () => {
    const { data } = await apolloClient.query<{
      meUser: {
        id: string;
        email: string;
        telegram: string | null;
        phone: string | null;
        timezone: string | null;
      };
    }>({
      query: gql`
        query {
          meUser {
              id
              email
              telegram
              phone
              timezone
          }
      }
      `
    });

    if (!data) return;

    set({
      user: {
        user_id: data.meUser.id,
        email: data.meUser.email,
        avatar_url: null,
        telegram: data.meUser.telegram,
        phone: data.meUser.phone,
        timezone: data.meUser.timezone,
      },
    }, false, 'auth_store_get_me');
  },
  login: async (loginInput: ILoginInput) => {
    // try {
    const { data } = await api.post('/login', {
      username: loginInput.email,
      password: loginInput.password,
    });

    const { token } = data;
    const { user } = data;

    set({ token: token, isAuthenticated: true }, false, 'auth_store_login');
    // set({
    //   user: {
    //     user_id: user.id,
    //     email: user.email,
    //     avatar_url: user.avatar_url,
    //     telegram: user.telegram,
    //     phone: user.phone,
    //     timezone: user.timezone,
    //   },
    // }, false, 'auth_store_login_user');

    // get().getMe();

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
  register: async (user: ILoginInput) => {
    try {
      const response = await api.post('/users/register', {
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
  requestUser: async (user: IUser) => {
    await api.post('/users/request', user)
  }
});

export const useAuthStore = create<IAuthState>()(
  devtools(
    persist(authStore, {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    })
  )
);

export const useUser = (): IUser => {
  useAuthStore((state) => state.user);

  const user = useAuthStore((state) => state.user);
  if (!user) {
    throw new Error('User not stored');
  }
  return user;
};
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useToken = () => useAuthStore((state) => state.token);
export const login = (user: ILoginInput) => useAuthStore.getState().login(user);
export const logout = () => useAuthStore.getState().logout();
export const register = (user: ILoginInput) =>
  useAuthStore.getState().register(user);
export const requestUser = (user: IUser) => useAuthStore.getState().requestUser(user);
export const getMe = () => useAuthStore.getState().getMe();