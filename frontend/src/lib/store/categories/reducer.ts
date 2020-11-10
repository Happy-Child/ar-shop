import { EActionsTypes } from './actions';
import { ICategoryAll } from './interfases';
import { TDefaultAction } from '../types';

type initialState = {
  allCategories: Array<ICategoryAll>;
  loading: boolean;
  fetched: boolean;
};

const initialState: initialState = {
  allCategories: [],
  loading: false,
  fetched: false,
};

export const categoriesReducer = (state = initialState, action: TDefaultAction) => {
  switch (action.type) {
    case EActionsTypes.SET_ALL_CATEGORIES:
      return {
        ...state,
        allCategories: [...state.allCategories, ...action.payload],
      };
    case EActionsTypes.LOADING_ALL_CATEGORIES:
      return {
        ...state,
        fetched: !action.payload ? true : state.fetched,
        loading: action.payload,
      };
    default: {
      return state;
    }
  }
};
