import { TDefaultAction } from '../types';
import { ICartItem } from './interfases';

export enum EActionsTypes {
  ADD_TO_CART = 'cart/ADD_TO_CART',
  REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART',
  CHANGE_CART_ITEM_QUANTITY = 'cart/CHANGE_CART_ITEM_QUANTITY',
  SET_FULL_CART = 'cart/SET_FULL_CART',
}

export const actionAddToCart = (product: ICartItem): TDefaultAction => ({
  type: EActionsTypes.ADD_TO_CART,
  payload: product,
});

export const actionRemoveFromCart = (productId: number): TDefaultAction => ({
  type: EActionsTypes.REMOVE_FROM_CART,
  payload: productId,
});

export const actionChangeCartItemQuantity = (payload: { productId: number; quantity: number }): TDefaultAction => ({
  type: EActionsTypes.CHANGE_CART_ITEM_QUANTITY,
  payload,
});

export const actionSetFullCart = (cart: ICartItem[] | []): TDefaultAction => ({
  type: EActionsTypes.SET_FULL_CART,
  payload: cart,
});
