import { EActionsTypes } from './actions';
import { ICategoryAll } from './interfases';

type initialState = {
  categories: Array<ICategoryAll>;
};

const initialState: initialState = {
  categories: [],
};

// during
export const categoriesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case EActionsTypes.CREATE:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case EActionsTypes.GET_ALL:
      return {
        ...state,
        categories: [...state.categories, ...action.payload],
      };
    default: {
      return state;
    }
  }
};
