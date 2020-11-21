import { EActionsTypes } from './actions';
import { TDefaultAction } from '../types';

type initialState = {
  cart: any;
};

const initialState: initialState = {
  cart: [],
};

// add to cart
// remove from cart
// set cart (from local storage)
// change item quantity

export const cartReducer = (state = initialState, action: TDefaultAction) => {
  switch (action.type) {
    case EActionsTypes.ADD_TO_CART:
      return {
        ...state,
      };
    default: {
      return state;
    }
  }
};
