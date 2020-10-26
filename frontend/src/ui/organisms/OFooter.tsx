import React, { ReactNode } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import greyColor from '@material-ui/core/colors/grey';
import Typography from '@material-ui/core/Typography';

import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import MLogo from '../molecules/MLogo';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      padding: 0,
      backgroundColor: greyColor[300],

      [theme.breakpoints.down('xs')]: {
        textAlign: 'center',
        padding: '8px 0',
      },
    },
    copyrightWrapper: {
      textAlign: 'right',

      [theme.breakpoints.down('xs')]: {
        textAlign: 'center',
      },
    },
  }),
);

const OFooter: React.FC<ReactNode> = () => {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <Container>
        <Toolbar className={classes.root}>
          <Grid container alignItems="center" justify="space-between" spacing={0}>
            <Grid item xs={12} sm={6}>
              <MLogo />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.copyrightWrapper}>
              <Typography>Creator Egor Lazuka</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </footer>
  );
};

export default OFooter;
