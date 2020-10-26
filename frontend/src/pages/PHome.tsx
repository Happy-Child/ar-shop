import React, { ReactNode } from 'react';
import TDefault from '../ui/templates/TDefault';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ALink from '../ui/atoms/ALink';
import Button from '@material-ui/core/Button';
import { categoriesAPI } from '../services/api';
import ISuccessResponse from '../../../backend/contracts/interfaces/ISuccessResponse';
import { ICategoryAll } from '../lib/store/categories/interfases';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '2rem 0',
    },
    title: {
      [theme.breakpoints.down('md')]: {
        fontSize: '36px',
      },
    },
    btn: {
      marginTop: '1rem',
    },
  }),
);

const PHome: React.FC<ReactNode> = () => {
  const classes = useStyles();

  React.useEffect(() => {
    categoriesAPI.all().then((res) => {
      console.log(res.data);
    });

    categoriesAPI.list({ page: 2 }).then((res) => {
      console.log(res.data);
    });

    categoriesAPI.show({ id: 3 }).then((res) => {
      console.log(res.data);
    });
  }, []);

  return (
    <TDefault>
      <Container className={classes.container}>
        <Typography variant="h2" className={classes.title}>
          Welcome!
        </Typography>

        <ALink to={'/categories'} className={classes.btn}>
          <Button color="primary" variant="contained">
            View categories
          </Button>
        </ALink>
      </Container>
    </TDefault>
  );
};

export default PHome;
