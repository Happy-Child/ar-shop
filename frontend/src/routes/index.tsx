import React, { ReactNode } from 'react';
const PHome = React.lazy(() => import('../pages/PHome/PHome'));
const PCategories = React.lazy(() => import('../pages/PCategories/PCategories'));
const PCategory = React.lazy(() => import('../pages/PCategory/PCategory'));
const PProducts = React.lazy(() => import('../pages/PProducts/PProducts'));

export interface IRoute {
  path: string;
  exact?: boolean;
  component: React.FC<ReactNode>;
}

const routes: Array<IRoute> = [
  {
    path: '/',
    exact: true,
    component: PHome,
  },
  {
    path: '/categories',
    exact: true,
    component: PCategories,
  },
  {
    path: '/categories/:id',
    exact: true,
    component: PCategory,
  },
  {
    path: '/products',
    exact: true,
    component: PProducts,
  },
];

export { routes };
