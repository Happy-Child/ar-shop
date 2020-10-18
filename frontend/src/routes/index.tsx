import React, { ReactNode } from 'react';
import PHome from '../pages/PHome';
import PCategories from '../pages/PCategories';
import PProducts from '../pages/PProducts';

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
