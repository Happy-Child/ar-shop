import React, { ChangeEvent } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ALink from '../../../atoms/ALink';
import { useCount } from '../../../../hooks/useCount';
import { MCounter } from '../../../molecules/MCounter';
import { IProduct } from '../../../../lib/store//products/interfases';
import { MDataList } from '../../../molecules/MDataList/MDataList';

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
    },
    wrapMedia: {
      backgroundColor: '#cfcfcf',
    },
    media: {
      minHeight: '280px',
    },
    actions: {},
    row: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: '0',
    },
    content: {},
    title: {},
    wrapDataList: {
      marginTop: 'auto',
      paddingBottom: '0',
    },
  }),
);

export interface IOProductCardSite {
  product: IProduct;
  handleAddToCart?: (payload: { product: IProduct; quantity: number }) => void;
}

const OProductsCardSite: React.FC<IOProductCardSite> = ({ product, handleAddToCart = () => {} }: IOProductCardSite) => {
  const classes = useStyles();
  const {
    count: productCount,
    setCount,
    changeCount: changeProductCount,
    handleInputCount,
    handleBlurCount,
  } = useCount();

  const handleOnClick = (): void => {
    handleAddToCart({ product, quantity: Number(productCount) });
    setCount(1);
  };

  return (
    <Card className={classes.card}>
      <ALink to={`/products/${product.id}`} className={classes.wrapMedia}>
        <CardMedia className={classes.media} image={product.image || ''} />
      </ALink>

      <CardContent className={classes.content}>
        <ALink to={`/products/${product.id}`}>
          <Typography gutterBottom variant="h5" className={classes.title} component="h2">
            {product.name}
          </Typography>
        </ALink>

        {product.description_small && (
          <Typography variant="body2" color="textSecondary" component="p">
            {product.description_small}
          </Typography>
        )}
      </CardContent>

      <CardContent className={classes.wrapDataList}>
        <MDataList list={[{ key: 'Category', value: product.category?.name || '' }]} />
      </CardContent>

      <CardContent className={classes.row}>
        <Typography variant="h6" component="p">
          ${product.price}
        </Typography>
        <MCounter
          count={productCount}
          changeCount={changeProductCount}
          handleInputCount={handleInputCount}
          handleBlurCount={handleBlurCount}
        />
      </CardContent>

      <CardContent className={classes.actions}>
        <Button onClick={handleOnClick.bind(null)} size="large" variant="contained" color="secondary" fullWidth>
          Add to cart
        </Button>
      </CardContent>
    </Card>
  );
};

export { OProductsCardSite };
