import React, { ReactNode } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ALink from '../atoms/ALink';
import { ShoppingBasket } from '@material-ui/icons';

interface IMenuLink {
  to: string;
  text: string;
}

const menuLinks: Array<IMenuLink> = [
  {
    to: '/products',
    text: 'Products',
  },
  {
    to: '/categories',
    text: 'Categories',
  },
];

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,

      [theme.breakpoints.down('md')]: {
        fontSize: '16px',
      },
    },
    toolbar: {
      padding: 0,
    },
    wrapperMenu: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    menu: {
      display: 'flex',
      alignItems: 'center',
    },
    menuItem: {
      marginRight: '1rem',

      [theme.breakpoints.down('md')]: {
        fontSize: '14px',
      },

      '&:last-child': {
        marginRight: 0,
      },
    },

    basketButton: {
      display: 'flex',
      alignItems: 'center',
    },
    basketIcon: {
      marginRight: '0.5rem',
      position: 'relative',
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

const OHeader: React.FC<ReactNode> = () => {
  const classes = useStyles();
  const productCount = 12;

  return (
    <AppBar position="static">
      <Container>
        <Toolbar className={classes.toolbar}>
          <Grid container alignItems="center" justify="space-between" spacing={0}>
            <Grid item sm={4} md={3}>
              <ALink to={'/'}>
                <Typography variant="h6" className={classes.title}>
                  Adonis & React Shop
                </Typography>
              </ALink>
            </Grid>

            <Grid className={classes.wrapperMenu} item sm={4} md={6}>
              <div className={classes.menu}>
                {menuLinks?.map((link: IMenuLink) => (
                  <ALink key={link.to} to={link.to} className={classes.menuItem}>
                    <Typography>{link.text}</Typography>
                  </ALink>
                ))}
              </div>
            </Grid>

            <Grid container alignItems="center" justify="flex-end" item sm={4} md={3}>
              <button className={classes.basketButton}>
                <span className={classes.basketIcon}>
                  <ShoppingBasket />
                  {productCount && <Typography className={classes.productCount}>{productCount}</Typography>}
                </span>

                <Typography>Cart</Typography>
              </button>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default OHeader;
