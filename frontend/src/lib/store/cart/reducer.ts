import { EActionsTypes, CartActions } from './actions';
import { ICartItem } from './interfases';
import { IProduct } from '../products/interfases';
import { cartInitialState, TCartInitialState } from './state';

const cartAfterChangeQuantity = (cart: ICartItem[] | [], payload: { id: number; quantity: number }) => {
  return (cart as ICartItem[]).map((item: ICartItem) => {
    if (item.product.id === payload.id) {
      return {
        ...item,
        quantity: payload.quantity,
      };
    }
    return item;
  });
};

const cartAfterAddProduct = (cart: ICartItem[] | [], payload: { product: IProduct; quantity: number }) => {
  const newCartItem = { product: payload.product, quantity: payload.quantity };

  const productExists = cart.find((item) => item.product.id === newCartItem.product.id);

  if (productExists) {
    const totalQuantity = productExists.quantity + newCartItem.quantity;
    return cartAfterChangeQuantity(cart, {
      id: newCartItem.product.id,
      quantity: totalQuantity,
    });
  }

  return [...cart, newCartItem];
};

export const cartReducer = (state = cartInitialState, action: CartActions): TCartInitialState => {
  switch (action.type) {
    case EActionsTypes.ADD_TO_CART:
      return {
        ...state,
        cart: cartAfterAddProduct(state.cart, action.payload),
      };
    case EActionsTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(({ product }: ICartItem) => product.id !== action.payload),
      };
    case EActionsTypes.CHANGE_CART_ITEM_QUANTITY:
      return {
        ...state,
        cart: cartAfterChangeQuantity(state.cart, action.payload),
      };
    case EActionsTypes.SET_FULL_CART:
      return {
        ...state,
        cart: action.payload,
      };
    default: {
      return state;
    }
  }
};
