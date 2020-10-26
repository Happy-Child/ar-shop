import React, { ReactNode } from 'react';
import ALink from '../atoms/ALink';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      flexGrow: 1,

      [theme.breakpoints.down('md')]: {
        fontSize: '16px',
      },
    },
  }),
);

const MLogo: React.FC<ReactNode> = () => {
  const classes = useStyles();
  return (
    <ALink to={'/'}>
      <Typography variant="h6" className={classes.title}>
        Adonis & React Shop
      </Typography>
    </ALink>
  );
};

export default MLogo;
