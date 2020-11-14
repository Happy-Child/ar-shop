import React, { ReactNode } from 'react';
import TDefault from '../../ui/templates/TDefault';
import MPageTitle from '../../ui/molecules/MPageTitle';
import { OCategoriesBlock } from '../../ui/organisms/OCategories/OCategoriesBlock';
import { OCategoriesCardSite } from '../../ui/organisms/OCategories/OCategoriesCard/OCategoriesCardSite';

const breadcrumbs = [
  {
    to: '/',
    text: 'Home',
  },
  {
    to: '/categories',
    text: 'Categories',
  },
];

const PCategories: React.FC<ReactNode> = () => {
  return (
    <TDefault breadcrumbs={breadcrumbs}>
      <MPageTitle variant="h3">Categories</MPageTitle>
      <OCategoriesBlock cardComponent={OCategoriesCardSite} />
    </TDefault>
  );
};

export default PCategories;
