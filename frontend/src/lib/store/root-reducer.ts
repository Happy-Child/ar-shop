import { combineReducers } from 'redux';
import { categoriesReducer } from './categories/reducer';

export const rootReducer = combineReducers({
  categoriesReducer,
});
