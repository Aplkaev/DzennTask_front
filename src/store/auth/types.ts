import { IUser } from "../../Entity/User/types";

interface ILoginInput {
  email: string;
  password: string;
}

interface IAction {
  login: (user: ILoginInput) => void;
  logout: () => void;
  register: (user: ILoginInput) => void;
  getMe: () => void;
  geetUsers: () => void;
}

interface IAuth {
  refreshToken: string | null;
  token: string | null;
  user: IUser | null;
  isAuthenticated: boolean;
}

interface IAuthState extends IAction, IAuth {}

export type { IAuthState, IAuth, IAction, ILoginInput, IUser }