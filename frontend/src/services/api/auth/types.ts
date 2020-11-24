import { IUser } from '../../../lib/store/users/interfases';

export type TResponseLogin = {
  status: number;
  data: {
    token: string;
    user: IUser;
  };
};

export type TResponseRegistration = {
  status: number;
  data: {
    token: string;
    user: IUser;
  };
};

export type TResponseMe = {
  status: number;
  data: {
    user: IUser;
  };
};
