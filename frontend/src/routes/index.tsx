import React, { ReactNode } from 'react';
const PHome = React.lazy(() => import('../pages/PHome/PHome'));
const PCategories = React.lazy(() => import('../pages/PCategories/PCategories'));
const PCategory = React.lazy(() => import('../pages/PCategory/PCategory'));
const PProducts = React.lazy(() => import('../pages/PProducts/PProducts'));
const PProduct = React.lazy(() => import('../pages/PProduct/PProduct'));
const PCart = React.lazy(() => import('../pages/PCart/PCart'));
const PLogin = React.lazy(() => import('../pages/PLogin/PLogin'));
const PRegistration = React.lazy(() => import('../pages/PRegistration/PRegistration'));

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
  {
    path: '/products/:id',
    exact: true,
    component: PProduct,
  },
  {
    path: '/cart',
    exact: true,
    component: PCart,
  },
  {
    path: '/login',
    exact: true,
    component: PLogin,
  },
  {
    path: '/registration',
    exact: true,
    component: PRegistration,
  },
];

export { routes };
