import { TDefaultAction } from '../types';
import { ICategoryAll } from './interfases';

export enum EActionsTypes {
  GET_ALL = 'categories/GET_ALL',
  SET_ALL_CATEGORIES = 'categories/SET_ALL_CATEGORIES',
  LOADING_ALL_CATEGORIES = 'categories/LOADING_ALL_CATEGORIES',
}

export const actionFetchALlCategories = (): TDefaultAction => ({
  type: EActionsTypes.GET_ALL,
  payload: null,
});

export const actionSetAllCategories = (categories: Array<ICategoryAll> | []): TDefaultAction => ({
  type: EActionsTypes.SET_ALL_CATEGORIES,
  payload: categories,
});

export const actionLoadingAllCategories = (type: boolean): TDefaultAction => ({
  type: EActionsTypes.LOADING_ALL_CATEGORIES,
  payload: type,
});
