import { EUserRoles, EUserSexes } from './enums';

export interface IUser {
  id: number;
  name: string;
  role: EUserRoles;
  avatar: string | null;
  phone: string | null;
  email: string;
  sex: EUserSexes | null;
  created_at: Date;
}

export interface IUserToken {
  token: string;
  type: string;
  expires_at: string;
}
