import { combineReducers } from 'redux';
import { categoriesReducer } from './categories/reducer';
import { cartReducer } from './cart/reducer';
import { authReducer } from './auth/reducer';

export const rootReducer = combineReducers({
  categories: categoriesReducer,
  cart: cartReducer,
  auth: authReducer,
});
