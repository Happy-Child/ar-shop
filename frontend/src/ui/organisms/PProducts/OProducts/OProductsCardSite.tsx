import React, { ChangeEvent } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ALink from '../../../atoms/ALink';
import TextField from '@material-ui/core/TextField';
import { IProductList } from '../../../../lib/store/products/interfases';

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
      marginTop: 'auto',
      paddingBottom: '0',
    },
    counter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    counterLess: {
      minWidth: '35px',
    },
    counterMore: {
      minWidth: '35px',
    },
    counterNumber: {
      margin: '0 8px',
      width: '30px',
    },
    content: {},
    title: {},
  }),
);

export interface IOProductCardSite {
  product: IProductList;
}

const OProductsCardSite: React.FC<IOProductCardSite> = ({ product }: IOProductCardSite) => {
  const classes = useStyles();
  const [productCount, setProductCount] = React.useState<number | string>(1);

  const changeProductCount = (type: string): void => {
    let newState;

    if (productCount != null) {
      newState = type === 'less' ? Number(productCount) - 1 : Number(productCount) + 1;
    } else {
      newState = 1;
    }

    if (newState > 0 && newState < 100) {
      setProductCount(newState);
    }
  };

  const handleInputCount = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const value = e.target.value;

    if (value === '') {
      setProductCount('');
    } else if (Number(value) >= 0 && Number(value) < 100) {
      setProductCount(Number(value));
    }
  };

  const handleBlurCount = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const value = e.target.value;

    if (value === '' || Number(value) === 0) {
      setProductCount(1);
    }
  };

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
      <CardContent className={classes.row}>
        <Typography variant="h6" component="p">
          ${product.price}
        </Typography>
        <div className={classes.counter}>
          <Button
            onClick={changeProductCount.bind(null, 'less')}
            className={classes.counterLess}
            size="small"
            variant="contained"
            color="primary"
          >
            -
          </Button>
          <TextField
            className={classes.counterNumber}
            value={productCount}
            type="number"
            onChange={handleInputCount}
            onBlur={handleBlurCount}
          />
          <Button
            onClick={changeProductCount.bind(null, 'more')}
            className={classes.counterMore}
            size="small"
            variant="contained"
            color="primary"
          >
            +
          </Button>
        </div>
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
