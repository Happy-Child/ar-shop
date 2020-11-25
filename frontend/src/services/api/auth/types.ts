import { IUser, IUserToken } from '../../../lib/store/auth/interfases';

export type TResponseLogin = {
  status: number;
  data: {
    token: IUserToken;
    user: IUser;
  };
};

export type TResponseRegistration = {
  status: number;
  data: {
    token: IUserToken;
    user: IUser;
  };
};

export type TResponseMe = {
  status: number;
  data: IUser;
};
