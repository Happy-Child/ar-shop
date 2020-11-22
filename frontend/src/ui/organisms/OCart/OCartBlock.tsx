import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ALink from '../../atoms/ALink';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { OCartCardSite } from './OCartCard/OCartCardSite';
import { ICartItem } from '../../../lib/store/cart/interfases';
import { useDispatch } from 'react-redux';
import { actionChangeCartItemQuantity, actionRemoveFromCart } from '../../../lib/store/cart/actions';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'stretch',
      flexDirection: 'column',
    },
    wrapContent: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'stretch',
      flexDirection: 'column',
    },
    bottomPanel: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 'auto',
      paddingTop: '20px',
      borderTop: '1px solid #eaeaea',
    },
    buttonOrder: {
      width: '100%',
      maxWidth: '300px',
    },
    productsList: {},
  }),
);

interface IOCartBlock {
  cartPrice: number;
  cart: ICartItem[] | [];
}

const OCartBlock: React.FC<IOCartBlock> = ({ cartPrice, cart }: IOCartBlock) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleRemoveCartItem = (id: number): void => {
    dispatch(actionRemoveFromCart(id));
  };

  const handleChangeQuantity = (id: number, quantity: number): void => {
    dispatch(actionChangeCartItemQuantity({ id, quantity }));
  };

  return (
    <Grid className={classes.root} container alignItems="flex-start" justify="space-between" spacing={2}>
      <Grid item xs={12} className={classes.wrapContent}>
        {cart.length > 0 ? (
          <>
            <div className={classes.productsList}>
              {(cart as []).map((item: ICartItem) => (
                <OCartCardSite
                  handleRemoveCartItem={handleRemoveCartItem}
                  handleChangeQuantity={handleChangeQuantity}
                  key={item.product.id}
                  cartItem={item}
                />
              ))}
            </div>

            <div className={classes.bottomPanel}>
              <Typography variant="h5">Total price: ${cartPrice}</Typography>
              <ALink to="/" className={classes.buttonOrder}>
                <Button size="large" variant="contained" color="secondary" fullWidth>
                  Order
                </Button>
              </ALink>
            </div>
          </>
        ) : (
          <p>awsasdfghfdsfghgfdrfgthdrfghn</p>
        )}
      </Grid>
    </Grid>
  );
};

export { OCartBlock };
