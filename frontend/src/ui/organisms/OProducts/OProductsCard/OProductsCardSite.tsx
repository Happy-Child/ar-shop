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
import { IProduct } from '../../../../lib/store/products/interfases';
import { MDataList } from '../../../molecules/MDataList/MDataList';
import { IDataListItem, MDataListItem } from '../../../molecules/MDataList/MDataListItem';

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
}

const OProductsCardSite: React.FC<IOProductCardSite> = ({ product }: IOProductCardSite) => {
  const classes = useStyles();
  const { count: productCount, changeCount: changeProductCount, handleInputCount, handleBlurCount } = useCount();

  return (
    <Card className={classes.card}>
      <ALink to={`products/${product.id}`} className={classes.wrapMedia}>
        <CardMedia className={classes.media} image={product.image || ''} />
      </ALink>

      <CardContent className={classes.content}>
        <ALink to={`products/${product.id}`}>
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
        <Button size="large" variant="contained" color="secondary" fullWidth>
          Add to cart
        </Button>
      </CardContent>
    </Card>
  );
};

export { OProductsCardSite };
