import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ICategoryList } from '../../../lib/store/categories/interfases';
import { TResponseListCategories } from '../../../services/api/categories/types';
import { IOCategoriesCardSite } from './OCategoriesCard/OCategoriesCardSite';
import { ICategoriesPanelFormSortedItem } from '../../../pages/PCategories/types';
import { categoriesAPI } from '../../../services/api';
import { IListParams } from '../../../services/api/categories';
import { IMetaPagination } from '../../../interfases/metaPagination';
import { useRoute } from '../../../hooks/useRoute';
import OCategoriesFilterPanel from './OCategoriesFilterPanel';
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
      margin: '2rem auto 4rem',
      width: 'auto',
    },
  }),
);

const sortByItemsList: ICategoriesPanelFormSortedItem[] = [
  {
    value: 'created_at',
    label: 'Created at',
  },
  {
    value: 'name',
    label: 'Name',
  },
];

const sortTypesItemsList: ICategoriesPanelFormSortedItem[] = [
  {
    value: false,
    label: 'Sort Ascending',
  },
  {
    value: true,
    label: 'Descending sort',
  },
];

const getQueryByCategories = (queryObject: { [key: string]: string }) => {
  const { search = '', sort_by = 'created_at', page = 1, sort_desc = false } = queryObject;

  return {
    search,
    sort_by,
    sort_desc: Boolean(sort_desc),
    page: Number(page),
  };
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

  const changeFormData = (value: string | number | boolean, fieldName: string): void => {
    const page = fieldName === 'search' ? 1 : formData.page;
    pushRoute(pathname, { ...queryObject, [fieldName]: value, page });
  };

  const handlePaginationChange = (e: React.ChangeEvent<unknown>, page: number): void => {
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
      <OCategoriesFilterPanel
        className={classes.panel}
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
          page={formData.page}
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
