import { AppState } from '../types';
import { IUser } from './interfases';

const usersState = (state: AppState) => state.auth;

export const selectorAuthUser = (state: AppState): IUser | null => usersState(state).user;
export const selectorAuthUserLoading = (state: AppState): boolean => usersState(state).loading;
