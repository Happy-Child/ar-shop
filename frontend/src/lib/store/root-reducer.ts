import { combineReducers } from 'redux';
import { categoriesReducer } from './categories/reducer';
import { cartReducer } from './cart/reducer';
import { AppState } from './types';

export const rootReducer = combineReducers({
  categories: categoriesReducer,
  cart: cartReducer,
});
