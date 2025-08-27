
interface IUserLogin {
  email: string;
  password: string;
}

interface IAction {
  login: (user: IUserLogin) => void;
  logout: () => void;
  register: (user: IUserLogin) => void;
  getMe: () => void;
}
interface IUser {
  user_id: string;
  email: string;
  avatar_url: string | null;
}

interface IAuth {
  refreshToken: string | null;
  token: string | null;
  user: IUser | null;
  isAuthenticated: boolean;
}

interface IAuthState extends IAction, IAuth {}

export type { IAuthState, IAuth, IUser, IAction, IUserLogin }