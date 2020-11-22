import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Delete as IconDelete } from '@material-ui/icons';
import ALink from '../../../atoms/ALink';
import { useCount } from '../../../../hooks/useCount';
import { MCounter } from '../../../molecules/MCounter';
import { ICartItem } from '../../../../lib/store/cart/interfases';
import { useEffectAfterRender } from '../../../../hooks/useEffectAfterRender';

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapCard: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      marginBottom: '1rem',
    },
    card: {
      height: '100%',
      flexGrow: 1,
      boxShadow: 'none',
    },
    content: {
      height: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px !important',
      border: '1px solid #eaeaea',
    },
    mainContent: {
      display: 'flex',
      alignItems: 'center',
    },
    wrapMedia: {
      marginRight: '1rem',
    },
    media: {
      width: '80px',
      height: '80px',
      borderRadius: '1000px',
    },
    actions: {
      marginLeft: '1.5rem',
      width: '80px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoItem: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoItemValue: {
      fontWeight: 'bold',
      marginLeft: '6px',
    },
    buttonRemove: {},
    title: {},
  }),
);

export interface IOCartCardSite {
  cartItem: ICartItem;
  handleRemoveCartItem: (id: number) => void;
  handleChangeQuantity: (id: number, quantity: number) => void;
}

const OCartCardSite: React.FC<IOCartCardSite> = ({
  cartItem,
  handleRemoveCartItem,
  handleChangeQuantity,
}: IOCartCardSite) => {
  const classes = useStyles();
  const { count: productCount, changeCount: changeProductCount, handleInputCount, handleBlurCount } = useCount(
    cartItem.quantity,
  );

  useEffectAfterRender(() => {
    handleChangeQuantity(cartItem.product.id, Number(productCount));
  }, [productCount]);

  return (
    <div className={classes.wrapCard}>
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <div className={classes.mainContent}>
            <ALink to={`/products/${cartItem.product.id}`} className={classes.wrapMedia}>
              <CardMedia className={classes.media} image={cartItem.product.image || ''} />
            </ALink>

            <ALink to={`/products/${cartItem.product.id}`}>
              <Typography variant="h6" className={classes.title} component="p">
                {cartItem.product.name}
              </Typography>
            </ALink>
          </div>

          <Typography variant="h6" component="div" className={classes.infoItem}>
            <Typography>Price:</Typography>
            <Typography className={classes.infoItemValue}>${cartItem.product.price}</Typography>
          </Typography>

          <Typography variant="h6" component="div" className={classes.infoItem}>
            <Typography>Total:</Typography>
            <Typography className={classes.infoItemValue}>${cartItem.product.price * cartItem.quantity}</Typography>
          </Typography>

          <MCounter
            count={productCount}
            changeCount={changeProductCount}
            handleInputCount={handleInputCount}
            handleBlurCount={handleBlurCount}
          />
        </CardContent>
      </Card>
      <div className={classes.actions}>
        <IconButton className={classes.buttonRemove} onClick={handleRemoveCartItem.bind(null, cartItem.product.id)}>
          <IconDelete />
        </IconButton>
      </div>
    </div>
  );
};

export { OCartCardSite };
