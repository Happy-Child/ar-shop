import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ALink from '../atoms/ALink';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Location } from 'history';
import { useLocation } from 'react-router-dom';

export interface IBreadcrumbEl {
  to: string;
  text: string;
}

interface IMBreadcrumbsProps {
  list: Array<IBreadcrumbEl>;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      margin: '2rem 0',

      [theme.breakpoints.down('md')]: {
        margin: '1.5rem 0 1rem',
      },
    },
  }),
);

const MBreadcrumbs: React.FC<IMBreadcrumbsProps> = ({ list }: IMBreadcrumbsProps) => {
  const styles = useStyles();
  const location: Location = useLocation();

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb" className={styles.root}>
        {list.map((item: IBreadcrumbEl) => {
          if (item.to === location.pathname) {
            return <Typography key={item.to}>{item.text}</Typography>;
          }
          return (
            <ALink key={item.to} to={item.to}>
              {item.text}
            </ALink>
          );
        })}
      </Breadcrumbs>
    </Container>
  );
};

export default MBreadcrumbs;
