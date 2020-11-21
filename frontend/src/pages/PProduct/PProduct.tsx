import React, { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import TDefault from '../../ui/templates/TDefault';
import MPageTitle from '../../ui/molecules/MPageTitle';
import { IProduct } from '../../lib/store/products/interfases';
import { productsAPI } from '../../services/api';
import { TResponseListProducts, TResponseShowProduct } from '../../services/api/products/types';
import { IBreadcrumbEl } from '../../ui/molecules/MBreadcrumbs';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { MCounter } from '../../ui/molecules/MCounter';
import { useCount } from '../../hooks/useCount';
import { IDataListItem, MDataListItem } from '../../ui/molecules/MDataList/MDataListItem';
import { MDataList } from '../../ui/molecules/MDataList/MDataList';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import { OProductsCardSite } from '../../ui/organisms/OProducts/OProductsCard/OProductsCardSite';
import ALink from '../../ui/atoms/ALink';

const useStyles = makeStyles((theme) =>
  createStyles({
    content: {
      padding: '0 0 3rem 0',
    },
    wrapImage: {
      flexShrink: 0,
      width: '100%',
      paddingTop: '100%',
      backgroundColor: '#cfcfcf',
      overflow: 'hidden',
      position: 'relative',
      display: 'block',
    },
    img: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
    },
    contentTop: {
      display: 'flex',
      alignItems: 'stretch',
      margin: '0 -30px',
    },
    contentTopImage: {
      padding: '0 30px',
      width: '100%',
      maxWidth: '50%',
    },
    contentTopDesc: {
      padding: '20px 30px 0',
      width: '100%',
      maxWidth: '50%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
    },
    title: {
      marginBottom: '20px',
      display: 'block',
    },
    descriptionFull: {
      color: '#747474',
      lineHeight: '1.4',
      marginBottom: '22px',
    },
    price: {
      fontSize: '34px',
      fontWeight: 'bold',
      color: '#000',
    },
    contentTopDescBottom: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    counter: {
      flexShrink: 0,
      marginRight: '30px',
    },
    buttonCart: {
      width: '100%',
    },
    dataList: {
      marginTop: 'auto',
      marginBottom: '1.5rem',
    },
    similarProducts: {
      padding: '1rem 0 5rem',
    },
    similarProductsList: {},
  }),
);

const startBreadcrumbs = [
  {
    to: '/',
    text: 'Home',
  },
  {
    to: '/products',
    text: 'Products',
  },
  {
    to: '',
    text: 'Noname',
  },
];

const PProduct: React.FC<ReactNode> = () => {
  const classes = useStyles();

  const { id: productId } = useParams<{ id: string }>();
  const [breadcrumbs, setBreadcrumbs] = React.useState<Array<IBreadcrumbEl>>(startBreadcrumbs);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [product, setProduct] = React.useState<IProduct | null>(null);
  const [loadingSimilarProducts, setLoadingSimilarProducts] = React.useState<boolean>(true);
  const [similarProducts, setSimilarProducts] = React.useState<IProduct[] | [] | null>(null);
  const { count: productCount, changeCount: changeProductCount, handleInputCount, handleBlurCount } = useCount(1);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response: TResponseShowProduct = await productsAPI.show({ id: Number(productId) });
        setProduct(response.data);
        setBreadcrumbs((prevState) => {
          const newState = [...prevState];
          newState.pop();
          newState.push({
            to: `/products/${response.data.id}`,
            text: response.data.name,
          });
          return newState;
        });
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    })();
  }, [productId]);

  React.useEffect(() => {
    (async () => {
      try {
        setLoadingSimilarProducts(true);
        const response: TResponseListProducts = await productsAPI.list({
          limit: 4,
        });
        setSimilarProducts(response.data.products.data);
        setLoadingSimilarProducts(false);
      } catch (e) {
        console.log(e);
        setLoadingSimilarProducts(false);
      }
    })();
  }, []);

  return (
    <TDefault breadcrumbs={breadcrumbs}>
      <div className={classes.content}>
        {!loading && product ? (
          <div className={classes.contentTop}>
            <div className={classes.contentTopImage}>
              <picture className={classes.wrapImage}>
                {product?.image && <img className={classes.img} src={product.image} alt="" />}
              </picture>
            </div>

            <div className={classes.contentTopDesc}>
              <MPageTitle className={classes.title} variant="h3">
                {product.name}
              </MPageTitle>

              {product.description_full && (
                <Typography className={classes.descriptionFull}>{product.description_full}</Typography>
              )}

              <Typography className={classes.price}>${product.price}</Typography>

              <MDataList className={classes.dataList}>
                {product?.user && (
                  <MDataListItem keyEl={'Creator'} valueEl={<ALink to={`/`}>{product.user.name || 'No name'}</ALink>} />
                )}

                {product?.category && (
                  <MDataListItem
                    keyEl={'Category'}
                    valueEl={
                      <ALink to={`/categories/${product.category.id}`}>{product.category.name || 'No name'}</ALink>
                    }
                  />
                )}
              </MDataList>

              <div className={classes.contentTopDescBottom}>
                <MCounter
                  className={classes.counter}
                  count={productCount}
                  changeCount={changeProductCount}
                  handleInputCount={handleInputCount}
                  handleBlurCount={handleBlurCount}
                />
                <Button className={classes.buttonCart} variant="contained" color="primary">
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <span>loading or Empty</span>
        )}
      </div>

      {!loadingSimilarProducts && similarProducts ? (
        <div className={classes.similarProducts}>
          <Typography variant="h4" gutterBottom>
            Similar products
          </Typography>

          <Grid className={classes.similarProductsList} container alignItems="stretch" spacing={2}>
            {(similarProducts as IProduct[]).map((product: IProduct) => (
              <Grid key={product.id} item sm={6} md={3}>
                <OProductsCardSite product={product} />
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        <span>loading or Empty</span>
      )}
    </TDefault>
  );
};

export default PProduct;
