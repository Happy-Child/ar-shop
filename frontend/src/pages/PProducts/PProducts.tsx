import React, { ReactNode } from 'react';
import TDefault from '../../ui/templates/TDefault';
import MPageTitle from '../../ui/molecules/MPageTitle';
import { OProductsBlock } from '../../ui/organisms/PProducts/OProductsBlock';
import { OProductsCardSite } from '../../ui/organisms/PProducts/OProducts/OProductsCardSite';

const breadcrumbs = [
  {
    to: '/',
    text: 'Home',
  },
  {
    to: '/products',
    text: 'Products',
  },
];

const PProducts: React.FC<ReactNode> = () => {
  return (
    <TDefault breadcrumbs={breadcrumbs}>
      <MPageTitle variant="h3">Products</MPageTitle>
      <OProductsBlock cardComponent={OProductsCardSite} />
    </TDefault>
  );
};

export default PProducts;
