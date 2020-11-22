import React from 'react';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { productsAPI } from '../../../services/api';
import { useRoute } from '../../../hooks/useRoute';
import { useScrollToRef } from '../../../hooks/useScrollToRef';
import OFilterPanel from '../OFilterPanel';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import { OProductsFilter } from './OProductsFilter';
import { IPanelFormSortedItem } from '../../../interfases/panelFormSortedItem';
import { IMetaPagination } from '../../../interfases/metaPagination';
import { IOProductCardSite } from './OProductsCard/OProductsCardSite';
import { IListProductsParams } from '../../../services/api/products';
import { IProduct } from '../../../lib/store/products/interfases';
import { TResponseListProducts } from '../../../services/api/products/types';
import { AppState } from '../../../lib/store/types';
import { ICategoryAll } from '../../../lib/store/categories/interfases';
import { selectorAllCategories, selectorCategoriesLoading } from '../../../lib/store/categories/selectors';
import { useAddToCart } from '../../../hooks/useAddToCart';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    panel: {
      marginBottom: '2rem',
    },
    cardsList: {
      marginBottom: 'auto',
    },
    wrapContent: {
      display: 'flex',
      alignItems: 'stretch',
      flexDirection: 'column',
    },
    pagination: {
      margin: '2rem auto 0',
      width: 'auto',
    },
    sidebar: {
      position: 'sticky',
      top: '20px',
    },
  }),
);

const sortByItemsList: IPanelFormSortedItem[] = [
  {
    value: 'created_at',
    label: 'Created at',
  },
  {
    value: 'price',
    label: 'Price',
  },
  {
    value: 'name',
    label: 'Name',
  },
];

const sortTypesItemsList: IPanelFormSortedItem[] = [
  {
    value: false,
    label: 'Sort Ascending',
  },
  {
    value: true,
    label: 'Descending sort',
  },
];

const defaultFormData: IListProductsParams = {
  search: '',
  sort_by: 'created_at',
  sort_desc: false,
  category_id: null,
  price_min: null,
  price_max: null,
  page: 1,
};

const getQueryByProducts = (queryObject: { [key: string]: string | number | boolean }) => {
  const {
    search = null,
    category_id = null,
    price_min = null,
    price_max = null,
    sort_by = null,
    page = null,
    sort_desc = null,
  } = queryObject;
  const result: IListProductsParams = {
    search: search != null ? String(search) : defaultFormData.search,
    sort_by: sort_by != null ? String(sort_by) : defaultFormData.sort_by,
    sort_desc: sort_desc != null ? Boolean(sort_desc) : defaultFormData.sort_desc,
    category_id: category_id != null ? Number(category_id) : defaultFormData.category_id,
    price_min: price_min != null ? Number(price_min) : defaultFormData.price_min,
    price_max: price_max != null ? Number(price_max) : defaultFormData.price_max,
    page: page != null ? Number(page) : 1,
  };
  return result;
};

interface IOProductsBlock {
  cardComponent: React.ComponentType<IOProductCardSite>;
  cardsLimit?: number;
}

const OProductsBlock: React.FC<IOProductsBlock> = ({
  cardComponent: CardComponent,
  cardsLimit = 9,
}: IOProductsBlock) => {
  const classes = useStyles();

  const allCategories = useSelector<AppState, ICategoryAll[]>(selectorAllCategories);
  const allCategoriesLoading = useSelector<AppState, boolean>(selectorCategoriesLoading);
  const { pathname, search, queryObject, pushRoute } = useRoute();

  const startFormData = getQueryByProducts(queryObject);
  const [formData, setFormData] = React.useState<IListProductsParams>(startFormData);
  const [productsPrices, setProductsPrices] = React.useState<{ min: number; max: number }>({
    min: 0,
    max: 0,
  });
  const [productsList, setProductsList] = React.useState<IProduct[] | []>([]);
  const [metaPagination, setMetaPagination] = React.useState<IMetaPagination | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { refEl: refFilter, handleScrollToEl } = useScrollToRef();
  const { handleAddToCart } = useAddToCart();

  const changeFormData = (newData: object, resetPagination = false): void => {
    let page = formData.page;
    if (resetPagination) page = 1;
    pushRoute(pathname, { ...queryObject, ...newData, page });
  };

  const onResetFilter = (): void => {
    pushRoute(pathname, { ...queryObject, ...defaultFormData });
  };

  const handlePaginationChange = (e: React.ChangeEvent<unknown>, page: number): void => {
    handleScrollToEl();
    pushRoute(pathname, { ...queryObject, page });
  };

  React.useEffect(() => {
    const newState: IListProductsParams = { ...formData };

    const { search: querySearch, category_id, price_max, price_min, sort_by, sort_desc, page } = getQueryByProducts(
      queryObject,
    );

    if (newState.search !== querySearch) {
      newState.search = querySearch;
    }
    if (newState.category_id !== category_id) {
      newState.category_id = category_id;
    }
    if (newState.price_max !== price_max) {
      newState.price_max = price_max;
    }
    if (newState.price_min !== price_min) {
      newState.price_min = price_min;
    }
    if (newState.page !== page) {
      newState.page = page;
    }
    if (newState.sort_by !== sort_by) {
      newState.sort_by = sort_by;
    }
    if (newState.sort_desc !== sort_desc) {
      newState.sort_desc = sort_desc;
    }
    setFormData(newState);
  }, [search]);

  React.useEffect(() => {
    (async function () {
      if (loading) return;
      setLoading(true);
      try {
        const response: TResponseListProducts = await productsAPI.list({
          ...formData,
          limit: cardsLimit,
        });
        setProductsPrices({
          min: response.data.prices.min,
          max: response.data.prices.max,
        });
        setProductsList(response.data.products.data);
        setMetaPagination(response.data.products.meta);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    })();
  }, [formData, cardsLimit]);

  return (
    <Grid className={classes.root} container alignItems="flex-start" justify="space-between" spacing={2}>
      <Grid item xs={12} lg={3} className={classes.sidebar}>
        <OProductsFilter
          formData={formData}
          productsPrices={productsPrices}
          categories={allCategories}
          categoriesLoading={allCategoriesLoading}
          loading={loading}
          changeFormData={changeFormData}
        />
      </Grid>
      <Grid item xs={12} lg={9} className={classes.wrapContent}>
        <OFilterPanel
          ref={refFilter}
          className={classes.panel}
          onResetFilter={onResetFilter}
          changeFormData={changeFormData}
          formData={formData}
          loading={loading}
          sortByItemsList={sortByItemsList}
          sortTypesItemsList={sortTypesItemsList}
        />
        <Grid className={classes.cardsList} container alignItems="stretch" spacing={2}>
          {(productsList as IProduct[]).map((product: IProduct) => (
            <Grid key={product.id} item sm={6} md={4}>
              <CardComponent product={product} handleAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
        {productsList.length > 0 && (metaPagination?.previous_page_url || metaPagination?.next_page_url) && (
          <Pagination
            className={classes.pagination}
            count={metaPagination?.last_page || 1}
            page={formData.page || 1}
            onChange={handlePaginationChange}
            disabled={loading}
            variant="outlined"
            shape="rounded"
          />
        )}
      </Grid>
    </Grid>
  );
};

export { OProductsBlock };
