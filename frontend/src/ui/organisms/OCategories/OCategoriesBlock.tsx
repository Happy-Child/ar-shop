import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ICategoryList } from '../../../lib/store/categories/interfases';
import { TResponseListCategories } from '../../../services/api/categories/types';
import { IOCategoriesCardSite } from './OCategoriesCard/OCategoriesCardSite';
import { IPanelFormSortedItem } from '../../../interfases/panelFormSortedItem';
import { categoriesAPI } from '../../../services/api';
import { IListParams } from '../../../services/api/categories';
import { IMetaPagination } from '../../../interfases/metaPagination';
import { useRoute } from '../../../hooks/useRoute';
import { useScrollToRef } from '../../../hooks/useScrollToRef';
import OFilterPanel from '../OFilterPanel';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) =>
  createStyles({
    panel: {
      marginBottom: '2rem',
    },
    cardsList: {
      marginBottom: 'auto',
    },
    pagination: {
      margin: '2rem auto 0',
      width: 'auto',
    },
  }),
);

const sortByItemsList: IPanelFormSortedItem[] = [
  {
    value: 'created_at',
    label: 'Created at',
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

const defaultFormData: IListParams = {
  search: '',
  sort_by: 'created_at',
  sort_desc: false,
  page: 1,
};

const getQueryByCategories = (queryObject: { [key: string]: string }) => {
  const { search = null, sort_by = null, page = null, sort_desc = null } = queryObject;
  const result: IListParams = {
    search: search != null ? String(search) : defaultFormData.search,
    sort_by: sort_by != null ? String(sort_by) : defaultFormData.sort_by,
    sort_desc: sort_desc != null ? Boolean(sort_desc) : defaultFormData.sort_desc,
    page: page != null ? Number(page) : 1,
  };
  return result;
};

interface IOCategoriesBlock {
  cardComponent: React.ComponentType<IOCategoriesCardSite>;
  cardsLimit?: number;
}

const OCategoriesBlock: React.FC<IOCategoriesBlock> = ({
  cardComponent: CardComponent,
  cardsLimit = 9,
}: IOCategoriesBlock) => {
  const classes = useStyles();
  const { pathname, search, queryObject, pushRoute } = useRoute();

  const startFormData = getQueryByCategories(queryObject);
  const [formData, setFormData] = React.useState<IListParams>(startFormData);
  const [categoriesList, setCategoriesList] = React.useState<ICategoryList[] | []>([]);
  const [metaPagination, setMetaPagination] = React.useState<IMetaPagination | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { refEl: refFilter, handleScrollToEl } = useScrollToRef();

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
    const newState: IListParams = { ...formData };

    const { search, sort_by, sort_desc, page } = getQueryByCategories(queryObject);

    if (newState.search !== search) {
      newState.search = search;
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
        const response: TResponseListCategories = await categoriesAPI.list({
          ...formData,
          limit: cardsLimit,
        });
        setCategoriesList(response.data.data);
        setMetaPagination(response.data.meta);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    })();
  }, [formData, cardsLimit]);

  return (
    <>
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
        {(categoriesList as ICategoryList[]).map((category: ICategoryList) => (
          <Grid key={category.id} item sm={6} md={4}>
            <CardComponent category={category} />
          </Grid>
        ))}
      </Grid>
      {categoriesList.length > 0 && (metaPagination?.previous_page_url || metaPagination?.next_page_url) && (
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
    </>
  );
};

export { OCategoriesBlock };
