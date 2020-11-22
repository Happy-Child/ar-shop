import { createSelector } from 'reselect';
import { AppState } from '../types';
import { ICartItem } from './interfases';
import { TCartInitialState } from './state';

const cartState = (state: AppState): TCartInitialState => state.cart;

export const selectorAllCart = (state: AppState): ICartItem[] => cartState(state).cart;

export const selectorCartPrice = createSelector(selectorAllCart, (cart) => {
  return cart.reduce((acc, item) => {
    return Number(acc) + item.quantity * item.product.price;
  }, 0);
});

export const selectorCartCount = createSelector(selectorAllCart, (cart) => {
  return cart.reduce((acc, item) => {
    return Number(acc) + item.quantity;
  }, 0);
});
