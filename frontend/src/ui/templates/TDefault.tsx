import React from 'react';
import MBreadcrumbs, { IBreadcrumbEl } from '../molecules/MBreadcrumbs';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'stretch',
      flexDirection: 'column',
    },
    flexGrow: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'stretch',
      flexDirection: 'column',
    },
  }),
);

interface IProps {
  breadcrumbs?: Array<IBreadcrumbEl>;
  children: any;
}

const TDefault: React.FC<IProps> = ({ breadcrumbs, children }: IProps) => {
  const classes = useStyles();

  return (
    <main className={classes.flexGrow}>
      {breadcrumbs && <MBreadcrumbs list={breadcrumbs} />}
      <Container className={classes.flexGrow}>{children}</Container>
    </main>
  );
};

export default TDefault;
