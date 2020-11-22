import { EActionsTypes, CategoriesActions } from './actions';
import { categoriesInitialState, TCategoriesInitialState } from './state';

export const categoriesReducer = (
  state = categoriesInitialState,
  action: CategoriesActions,
): TCategoriesInitialState => {
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
