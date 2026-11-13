import { create, type StateCreator } from 'zustand';
import { apolloClient } from '@/shared/api/apolloClients';
import { createJSONStorage, persist, devtools } from 'zustand/middleware';
import {
  LoginUserDocument,
  MeDocument,
  RegisterUserDocument,
  UpdateUserDocument,
  type UserFieldsFragment,
} from '@/generated/graphql';
import type { IAuthState, ILoginInput, IAuth, IUser } from './types';

const initialState: IAuth = {
  isAuthenticated: false,
  refreshToken: null,
  token: null,
  user: null,
};

const mapUser = (user: UserFieldsFragment): IUser => ({
  user_id: user.id,
  email: user.email,
  avatar_url: user.avatar_url ?? null,
  telegram: user.telegram ?? null,
  phone: user.phone ?? null,
  timezone: user.timezone ?? null,
});

const authStore: StateCreator<
  IAuthState,
  [['zustand/devtools', never], ['zustand/persist', unknown]]
> = (set) => ({
  ...initialState,
  getMe: async () => {
    const { data } = await apolloClient.query({
      query: MeDocument,
      fetchPolicy: 'network-only',
    });

    if (!data?.meUser) return;

    set({ user: mapUser(data.meUser) }, false, 'auth_store_get_me');
  },
  login: async (loginInput: ILoginInput) => {
    const { data } = await apolloClient.mutate({
      mutation: LoginUserDocument,
      variables: {
        input: {
          email: loginInput.email,
          plain_password: loginInput.password,
        },
      },
    });

    const user = data?.loginUser?.user;
    if (!user?.token) {
      throw new Error('Не удалось войти');
    }

    set(
      { token: user.token, isAuthenticated: true, user: mapUser(user) },
      false,
      'auth_store_login'
    );
  },
  logout: () => {
    set(() => ({ ...initialState }), false, 'auth_store_logout');
    apolloClient.clearStore().catch(() => undefined);
  },
  register: async (registerInput: ILoginInput) => {
    const { data } = await apolloClient.mutate({
      mutation: RegisterUserDocument,
      variables: {
        input: {
          email: registerInput.email,
          plain_password: registerInput.password,
        },
      },
    });

    const user = data?.registerUser?.user;
    if (!user?.token) {
      throw new Error('Не удалось зарегистрироваться');
    }

    set(
      { token: user.token, isAuthenticated: true, user: mapUser(user) },
      false,
      'auth_store_register'
    );
  },
  updateUser: async (user: IUser) => {
    const { data } = await apolloClient.mutate({
      mutation: UpdateUserDocument,
      variables: {
        input: {
          id: user.user_id,
          telegram: user.telegram,
          phone: user.phone,
          timezone: user.timezone,
          avatar_url: user.avatar_url,
        },
      },
    });

    const updated = data?.updateUser?.user;
    if (updated) {
      set({ user: mapUser(updated) }, false, 'auth_store_update_user');
    }
  },
});

export const useAuthStore = create<IAuthState>()(
  devtools(
    persist(authStore, {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    })
  )
);

export const useUser = (): IUser | null => useAuthStore((state) => state.user);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useToken = () => useAuthStore((state) => state.token);
export const login = (user: ILoginInput) => useAuthStore.getState().login(user);
export const logout = () => useAuthStore.getState().logout();
export const register = (user: ILoginInput) =>
  useAuthStore.getState().register(user);
export const updateUser = (user: IUser) =>
  useAuthStore.getState().updateUser(user);
export const getMe = () => useAuthStore.getState().getMe();