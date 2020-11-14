import React, { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import TDefault from '../../ui/templates/TDefault';
import MPageTitle from '../../ui/molecules/MPageTitle';
import { ICategory } from '../../lib/store/categories/interfases';
import { categoriesAPI } from '../../services/api';
import Skeleton from '@material-ui/lab/Skeleton';
import { TResponseShowCategory } from '../../services/api/categories/types';
import { IBreadcrumbEl } from '../../ui/molecules/MBreadcrumbs';

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

const PCategory: React.FC<ReactNode> = () => {
  const { id: categoryId } = useParams<{ id: string }>();
  const [breadcrumbs, setBreadcrumbs] = React.useState<Array<IBreadcrumbEl>>(startBreadcrumbs);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [category, setCategory] = React.useState<ICategory | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response: TResponseShowCategory = await categoriesAPI.show({ id: Number(categoryId) });
        setCategory(response.data);
        setLoading(false);
        setBreadcrumbs((prevState) => {
          const newState = [...prevState];
          newState.pop();
          newState.push({
            to: `/categories/${response.data.id}`,
            text: response.data.name,
          });
          return newState;
        });
      } catch (e) {
        console.log(e);
      }
    })();
  }, [categoryId]);

  return (
    <TDefault breadcrumbs={breadcrumbs}>
      <>
        {(category && <MPageTitle variant="h3">{category?.name}</MPageTitle>) || (
          <Skeleton width="50%" height="100px" />
        )}
      </>
    </TDefault>
  );
};

export default PCategory;
