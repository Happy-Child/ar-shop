import { ILoginParams } from '../../../services/api/auth';
import { IUser } from './interfases';

export enum EActionsTypes {
  FETCH_USER_BY_TOKEN = 'users/FETCH_USER_BY_TOKEN',
  LOGIN_USER = 'users/LOGIN_USER',
  SET_AUTH_USER = 'users/SET_AUTH_USER',
  LOADING_AUTH_USER = 'users/LOADING_AUTH_USER',
}

export type FETCH_USER_BY_TOKEN_ACTION = {
  type: EActionsTypes.FETCH_USER_BY_TOKEN;
  payload: null;
};

export type LOGIN_USER_ACTION = {
  type: EActionsTypes.LOGIN_USER;
  payload: ILoginParams;
};

export type SET_AUTH_USER_ACTION = {
  type: EActionsTypes.SET_AUTH_USER;
  payload: IUser | null;
};

export type LOADING_AUTH_USER_ACTION = {
  type: EActionsTypes.LOADING_AUTH_USER;
  payload: boolean;
};

export type AuthActions = LOGIN_USER_ACTION | SET_AUTH_USER_ACTION | LOADING_AUTH_USER_ACTION;

export const actionFetchUserByToken = (): FETCH_USER_BY_TOKEN_ACTION => ({
  type: EActionsTypes.FETCH_USER_BY_TOKEN,
  payload: null,
});

export const actionLoginUser = (loginData: ILoginParams): LOGIN_USER_ACTION => ({
  type: EActionsTypes.LOGIN_USER,
  payload: loginData,
});

export const actionSetUser = (user: IUser | null): SET_AUTH_USER_ACTION => ({
  type: EActionsTypes.SET_AUTH_USER,
  payload: user,
});

export const actionLoadingUser = (state: boolean): LOADING_AUTH_USER_ACTION => ({
  type: EActionsTypes.LOADING_AUTH_USER,
  payload: state,
});
