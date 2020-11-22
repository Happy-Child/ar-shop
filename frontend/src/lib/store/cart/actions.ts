import { ICartItem } from './interfases';

export enum EActionsTypes {
  ADD_TO_CART = 'cart/ADD_TO_CART',
  REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART',
  CHANGE_CART_ITEM_QUANTITY = 'cart/CHANGE_CART_ITEM_QUANTITY',
  SET_FULL_CART = 'cart/SET_FULL_CART',
}

export type ADD_TO_CART_ACTION = {
  type: EActionsTypes.ADD_TO_CART;
  payload: ICartItem;
};

export type REMOVE_FROM_CART_ACTION = {
  type: EActionsTypes.REMOVE_FROM_CART;
  payload: number;
};

export type CHANGE_CART_ITEM_QUANTITY_ACTION = {
  type: EActionsTypes.CHANGE_CART_ITEM_QUANTITY;
  payload: { id: number; quantity: number };
};

export type SET_FULL_CART_ACTION = {
  type: EActionsTypes.SET_FULL_CART;
  payload: ICartItem[] | [];
};

export type CartActions =
  | ADD_TO_CART_ACTION
  | REMOVE_FROM_CART_ACTION
  | CHANGE_CART_ITEM_QUANTITY_ACTION
  | SET_FULL_CART_ACTION;

export const actionAddToCart = (product: ICartItem): ADD_TO_CART_ACTION => ({
  type: EActionsTypes.ADD_TO_CART,
  payload: product,
});

export const actionRemoveFromCart = (id: number): REMOVE_FROM_CART_ACTION => ({
  type: EActionsTypes.REMOVE_FROM_CART,
  payload: id,
});

export const actionChangeCartItemQuantity = (payload: {
  id: number;
  quantity: number;
}): CHANGE_CART_ITEM_QUANTITY_ACTION => ({
  type: EActionsTypes.CHANGE_CART_ITEM_QUANTITY,
  payload,
});

export const actionSetFullCart = (cart: ICartItem[] | []): SET_FULL_CART_ACTION => ({
  type: EActionsTypes.SET_FULL_CART,
  payload: cart,
});
