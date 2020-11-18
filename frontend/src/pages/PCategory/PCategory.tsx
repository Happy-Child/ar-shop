import React, { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import TDefault from '../../ui/templates/TDefault';
import MPageTitle from '../../ui/molecules/MPageTitle';
import { ICategory } from '../../lib/store/categories/interfases';
import { categoriesAPI } from '../../services/api';
import { TResponseShowCategory } from '../../services/api/categories/types';
import { IBreadcrumbEl } from '../../ui/molecules/MBreadcrumbs';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { MDataList } from '../../ui/molecules/MDataList/MDataList';
import { IDataListItem } from '../../ui/molecules/MDataList/MDataListItem';
import moment from 'moment';

const useStyles = makeStyles(() =>
  createStyles({
    content: {
      padding: '0 0 3rem 0',
    },
    wrapImage: {
      flexShrink: 0,
      width: '100%',
      maxWidth: '300px',
      minHeight: '300px',
      borderRadius: '1000px',
      backgroundColor: '#cfcfcf',
      overflow: 'hidden',
      position: 'relative',
      display: 'block',
      marginBottom: '2rem',
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
  }),
);

const startBreadcrumbs = [
  {
    to: '/',
    text: 'Home',
  },
  {
    to: '/categories',
    text: 'Categories',
  },
  {
    to: '',
    text: 'Noname',
  },
];

const createdAtFormat = 'DD.MM.YYYY';

const PCategory: React.FC<ReactNode> = () => {
  const classes = useStyles();

  const { id: categoryId } = useParams<{ id: string }>();
  const [breadcrumbs, setBreadcrumbs] = React.useState<Array<IBreadcrumbEl>>(startBreadcrumbs);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [category, setCategory] = React.useState<ICategory | null>(null);
  const [dataList, setDataList] = React.useState<IDataListItem[] | []>([]);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response: TResponseShowCategory = await categoriesAPI.show({ id: Number(categoryId) });
        setCategory(response.data);
        setBreadcrumbs((prevState) => {
          const newState = [...prevState];
          newState.pop();
          newState.push({
            to: `/categories/${response.data.id}`,
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
  }, [categoryId]);

  React.useEffect(() => {
    if (category) {
      const result: IDataListItem[] = [
        {
          key: 'Products count',
          value: category.products_count,
        },
        {
          key: 'Creator (for admin/managers role)',
          value: category.user_id,
        },
        {
          key: 'Created at',
          value: moment(category.created_at).format(createdAtFormat),
        },
      ];
      setDataList(result);
    }
  }, [category]);

  return (
    <TDefault breadcrumbs={breadcrumbs}>
      <div className={classes.content}>
        {!loading && category ? (
          <>
            <MPageTitle variant="h3">{category.name}</MPageTitle>
            <picture className={classes.wrapImage}>
              {category?.image && <img className={classes.img} src={category.image} alt="" />}
            </picture>

            {dataList.length > 0 && <MDataList list={dataList} />}
          </>
        ) : (
          <span>loading or Empty</span>
        )}
      </div>
    </TDefault>
  );
};

export default PCategory;
