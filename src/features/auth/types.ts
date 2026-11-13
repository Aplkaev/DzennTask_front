interface IUser {
  user_id: string;
  email: string;
  avatar_url: string | null;
  telegram: string | null;
  phone: string | null;
  timezone: string | null;
}

interface ILoginInput {
  email: string;
  password: string;
}

interface IAction {
  login: (user: ILoginInput) => Promise<void>;
  logout: () => void;
  register: (user: ILoginInput) => Promise<void>;
  getMe: () => Promise<void>;
  updateUser: (user: IUser) => Promise<void>;
}

interface IAuth {
  refreshToken: string | null;
  token: string | null;
  user: IUser | null;
  isAuthenticated: boolean;
}

interface IAuthState extends IAction, IAuth {}

export type { IAuthState, IAuth, IAction, ILoginInput, IUser };
