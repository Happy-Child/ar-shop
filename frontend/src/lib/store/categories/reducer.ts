import { EActionsTypes } from './actions';
import { ICategoryAll } from './interfases';
import { TDefaultAction } from '../types';

type initialState = {
  allCategories: Array<ICategoryAll>;
  loading: boolean;
};

const initialState: initialState = {
  allCategories: [],
  loading: false,
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
        loading: action.payload,
      };
    default: {
      return state;
    }
  }
};
