import React from 'react';
import OHeader from '../organisms/OHeader';
import OFooter from '../organisms/OFooter';
import MBreadcrumbs, { IBreadcrumbEl } from '../molecules/MBreadcrumbs';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'stretch',
      flexDirection: 'column',
    },
    main: {
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
    <div className={`t-common ${classes.root}`}>
      <OHeader />
      <main className={classes.main}>
        {breadcrumbs && <MBreadcrumbs list={breadcrumbs} />}
        {children}
      </main>
      <OFooter />
    </div>
  );
};

export default TDefault;
