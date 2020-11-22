import { ICategoryAll } from './interfases';

export enum EActionsTypes {
  GET_ALL = 'categories/GET_ALL',
  SET_ALL_CATEGORIES = 'categories/SET_ALL_CATEGORIES',
  LOADING_ALL_CATEGORIES = 'categories/LOADING_ALL_CATEGORIES',
}

export type FETCH_ALL_CATEGORIES_ACTION = {
  type: EActionsTypes.GET_ALL;
  payload: null;
};

export type SET_ALL_CATEGORIES_ACTION = {
  type: EActionsTypes.SET_ALL_CATEGORIES;
  payload: Array<ICategoryAll> | [];
};

export type LOADING_ALL_CATEGORIES_ACTION = {
  type: EActionsTypes.LOADING_ALL_CATEGORIES;
  payload: boolean;
};

export type CategoriesActions = FETCH_ALL_CATEGORIES_ACTION | SET_ALL_CATEGORIES_ACTION | LOADING_ALL_CATEGORIES_ACTION;

export const actionFetchALlCategories = (): FETCH_ALL_CATEGORIES_ACTION => ({
  type: EActionsTypes.GET_ALL,
  payload: null,
});

export const actionSetAllCategories = (categories: Array<ICategoryAll> | []): SET_ALL_CATEGORIES_ACTION => ({
  type: EActionsTypes.SET_ALL_CATEGORIES,
  payload: categories,
});

export const actionLoadingAllCategories = (type: boolean): LOADING_ALL_CATEGORIES_ACTION => ({
  type: EActionsTypes.LOADING_ALL_CATEGORIES,
  payload: type,
});
