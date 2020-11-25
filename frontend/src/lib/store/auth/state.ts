import { IUser } from './interfases';

export type TAuthInitialState = {
  user: IUser | null;
  loading: boolean;
};

export const authInitialState: TAuthInitialState = {
  user: null,
  loading: true,
};
