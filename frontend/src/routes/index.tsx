import React, { ReactNode } from 'react';
const PHome = React.lazy(() => import('../pages/PHome'));
const PCategories = React.lazy(() => import('../pages/PCategories'));
const PProducts = React.lazy(() => import('../pages/PProducts'));

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
    path: '/products',
    exact: true,
    component: PProducts,
  },
];

export { routes };
