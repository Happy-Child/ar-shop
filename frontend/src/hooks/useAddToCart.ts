import React from 'react';
import { IProduct } from '../lib/store/products/interfases';
import { actionAddToCart } from '../lib/store/cart/actions';
import { useDispatch } from 'react-redux';

const useAddToCart = () => {
  const dispatch = useDispatch();

  const handleAddToCart = React.useCallback(
    (payload: { product: IProduct; quantity: number }): void => {
      dispatch(
        actionAddToCart({
          product: payload.product,
          quantity: payload.quantity,
        }),
      );
    },
    [dispatch],
  );

  return {
    handleAddToCart,
  };
};

export { useAddToCart };
