import React from 'react';
import TDefault from '../../ui/templates/TDefault';
import MPageTitle from '../../ui/molecules/MPageTitle';
import { OCartBlock } from '../../ui/organisms/OCart/OCartBlock';
import { connect } from 'react-redux';
import { AppState } from '../../lib/store/types';
import { selectorAllCart, selectorCartPrice } from '../../lib/store/cart/selectors';
import { ICartItem } from '../../lib/store/cart/interfases';

const breadcrumbs = [
  {
    to: '/',
    text: 'Home',
  },
  {
    to: '/cart',
    text: 'Cart',
  },
];

interface IPCartProps {
  cartPrice: number;
  cart: ICartItem[] | [];
}

const PCart: React.FC<IPCartProps> = ({ cartPrice, cart }: IPCartProps) => {
  return (
    <TDefault breadcrumbs={breadcrumbs}>
      <MPageTitle variant="h3">Cart</MPageTitle>
      <OCartBlock cartPrice={cartPrice} cart={cart} />
    </TDefault>
  );
};

const mapStateToProps = (state: AppState) => ({
  cartPrice: selectorCartPrice(state),
  cart: selectorAllCart(state),
});

export default connect(mapStateToProps)(PCart);
