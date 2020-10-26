import React, { ReactNode } from 'react';
import TDefault from '../ui/templates/TDefault';
import Container from '@material-ui/core/Container';
import MPageTitle from '../ui/molecules/MPageTitle';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import OCategoriesFilterPanel from '../ui/organisms/OCategories/OCategoriesFilterPanel';

const useStyles = makeStyles((theme) => createStyles({}));

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
  const classes = useStyles();
  return (
    <TDefault breadcrumbs={breadcrumbs}>
      <Container>
        <MPageTitle variant="h3">Categories</MPageTitle>
        <OCategoriesFilterPanel />
      </Container>
    </TDefault>
  );
};

export default PCategories;
