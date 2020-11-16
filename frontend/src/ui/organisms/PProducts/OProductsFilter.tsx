import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { IListProductsParams } from '../../../services/api/products';
import { ICategoryAll } from '../../../lib/store/categories/interfases';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ARangeInput } from '../../atoms/ARangeInput';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {},
    categoriesList: {
      marginTop: '8px',
    },
    categoriesListItem: {
      marginBottom: '6px',
      paddingBottom: '6px',
      borderBottom: '1px solid #e9e9e9',
      cursor: 'pointer',
      color: '#8c8c8c',

      '&:hover': {
        color: '#000',
      },

      '&:last-child': {
        marginBottom: 0,
      },
    },
    categoriesListItemActive: {
      color: '#000',
    },
    categoriesListItemText: {
      fontSize: '14px',
      color: 'inherit',
      transition: '0.3s all ease',
    },
    wrapCategoriesLoading: {
      padding: '2rem',
      textAlign: 'center',
    },
    wrapPrice: {
      marginTop: '2rem',
    },
  }),
);

interface IOProductsFilter {
  formData: IListProductsParams;
  productsPrices: { min: number; max: number };
  categories: ICategoryAll[] | [];
  categoriesLoading: boolean;
  loading: boolean;
  changeFormData: (newData: object, resetPagination?: boolean) => void;
  onResetFilter?: () => void;
}

const OProductsFilter: React.FC<IOProductsFilter> = ({
  formData,
  productsPrices,
  categories,
  categoriesLoading = true,
  loading = false,
  changeFormData,
  onResetFilter = () => {},
}: IOProductsFilter) => {
  const classes = useStyles();

  const handleChangeCategory = (categoryId: number): void => {
    if (categoryId === formData.category_id) {
      changeFormData({ category_id: '' }, true);
    } else {
      changeFormData({ category_id: categoryId }, true);
    }
  };

  const handleChangePrice = (event: React.ChangeEvent<{}>, value: number | number[]) => {
    if (Array.isArray(value)) {
      changeFormData({ price_min: value[0], price_max: value[1] }, true);
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" component="p">
          Category name
        </Typography>

        {(categoriesLoading && (
          <div className={classes.wrapCategoriesLoading}>
            <CircularProgress />
          </div>
        )) ||
          (categories.length > 0 && (
            <ul className={classes.categoriesList}>
              {(categories as ICategoryAll[]).map((category) => (
                <li
                  onClick={handleChangeCategory.bind(null, category.id)}
                  className={`${classes.categoriesListItem} ${
                    category.id === formData.category_id ? classes.categoriesListItemActive : ''
                  }`}
                  key={category.id}
                >
                  <Typography className={classes.categoriesListItemText}>{category.name}</Typography>
                </li>
              ))}
            </ul>
          )) ||
          (!categoriesLoading && categories.length === 0 && <Typography>Categories not found.</Typography>)}
      </CardContent>

      <CardContent>
        <Typography variant="h6" component="p">
          Price
        </Typography>
        <div className={classes.wrapPrice}>
          <ARangeInput
            startMin={formData.price_min || productsPrices.min}
            startMax={formData.price_max || productsPrices.max}
            onChangeCommitted={handleChangePrice}
            step={50}
            min={productsPrices.min}
            max={productsPrices.max}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export { OProductsFilter };
