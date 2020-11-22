import { ICartItem } from './interfases';

export type TCartInitialState = {
  cart: ICartItem[] | [];
};

const cartFromLocalStorage = window.localStorage.getItem('cart');

export const cartInitialState: TCartInitialState = {
  cart: !!cartFromLocalStorage ? JSON.parse(cartFromLocalStorage) : [],
};
