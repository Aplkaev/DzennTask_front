interface IUser {
  user_id: string;
  email: string;
  avatar_url: string | null;
  telegram: string | null;
  phone: string | null;
  timezone: string | null;
} 

export type { IUser }