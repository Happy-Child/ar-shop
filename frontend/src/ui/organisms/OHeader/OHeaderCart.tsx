import React from 'react';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ShoppingBasket } from '@material-ui/icons';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) =>
  createStyles({
    basketButton: {
      display: 'flex',
      alignItems: 'center',
    },
    basketIcon: {
      marginRight: '0.5rem',
      position: 'relative',

      [theme.breakpoints.down('xs')]: {
        marginRight: '0',
      },
    },
    productCount: {
      position: 'absolute',
      top: '-6px',
      right: '-6px',
      fontSize: '10px',
      backgroundColor: '#000',
      width: '18px',
      height: '18px',
      borderRadius: '10000px',
      lineHeight: '18px',
      fontWeight: 500,
    },
  }),
);

interface IOHeaderCartProps {
  count: number;
}

const OHeaderCart: React.FC<IOHeaderCartProps> = ({ count = 0 }: IOHeaderCartProps) => {
  const classes = useStyles();
  const mobileUp = useMediaQuery(useTheme().breakpoints.up('sm'));

  return (
    <button className={classes.basketButton}>
      <span className={classes.basketIcon}>
        <ShoppingBasket />
        {count > 0 && <Typography className={classes.productCount}>{count}</Typography>}
      </span>

      {mobileUp && <Typography>Cart</Typography>}
    </button>
  );
};

export { OHeaderCart };
