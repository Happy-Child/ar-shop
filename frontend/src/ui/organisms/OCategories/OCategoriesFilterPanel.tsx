import React, { ReactNode } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapInput: {},
    wrapFields: {},
  }),
);

const OCategoriesFilterPanel: React.FC<ReactNode> = () => {
  const classes = useStyles();
  return (
    <Grid container alignItems="center" justify="space-between" spacing={0}>
      <Grid className={classes.wrapInput} item xs={2} sm={4} md={6}>
        inptedgfhfrtghftrfghjgtfh
      </Grid>
    </Grid>
  );
};

export default OCategoriesFilterPanel;
