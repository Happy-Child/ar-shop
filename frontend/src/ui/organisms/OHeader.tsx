import React, { ReactNode } from 'react';
import { Location } from 'history';

import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useToggle } from '../../hooks/useToggle';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import MLogo from '../molecules/MLogo';
import { ShoppingBasket, Menu as MenuIcon, MenuOpen } from '@material-ui/icons';

import OMenuDesktop from './OMenuDesktop';
import ALink from '../atoms/ALink';
import { useDispatch, useSelector } from 'react-redux';
import { actionFetchALlCategories } from '../../lib/store/categories/actions';
import { ICategoryAll } from '../../lib/store/categories/interfases';
import { IAppState } from '../../lib/store/store';

export interface IMenuLink {
  to: string;
  text: string;
  children?: null | IMenuLink[] | [];
}

const menuLinks: Array<IMenuLink> = [
  {
    to: '/products',
    text: 'Products',
    children: null,
  },
  {
    to: '/categories',
    text: 'Categories',
    children: null,
  },
];

const useStyles = makeStyles((theme) =>
  createStyles({
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
    wrapBasket: {
      [theme.breakpoints.down('xs')]: {
        marginLeft: 'auto',
      },
    },
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
    menuBtn: {
      marginLeft: '1rem',
      position: 'relative',
    },
    mobMenu: {
      right: '0 !important',
      top: '100% !important',
      left: 'auto !important',
      transform: 'none !important',
    },
  }),
);

const OHeader: React.FC<ReactNode> = () => {
  const dispatch = useDispatch();
  const allCategories = useSelector<IAppState, ICategoryAll[]>((state) => state.categories.allCategories);
  const fetchedAllCategories = useSelector<IAppState, boolean>((state) => state.categories.fetched);
  const [resultMenuLinks, setResultMenuLinks] = React.useState(menuLinks);

  React.useEffect(() => {
    if (!fetchedAllCategories) {
      dispatch(actionFetchALlCategories());
    }
  }, [dispatch, fetchedAllCategories]);

  React.useEffect(() => {
    if (!fetchedAllCategories || !allCategories.length) return;

    const result = menuLinks.map((link) => {
      if (link.to === '/categories') {
        return {
          to: '/categories',
          text: 'Categories',
          children: allCategories.map((category: ICategoryAll) => ({
            to: `/categories/${category.id}`,
            text: category.name,
            children: null,
          })),
        };
      }
      return link;
    });

    setResultMenuLinks(result);
  }, [allCategories, fetchedAllCategories]);

  const location: Location = useLocation();
  const mobileUp = useMediaQuery(useTheme().breakpoints.up('sm'));
  const classes = useStyles();
  const productCount = 12;
  const popperRef = React.useRef<HTMLButtonElement>(null);
  const [menuOpened, setMenuOpened] = useToggle(false);

  return (
    <AppBar position="static">
      <Container>
        <Toolbar className={classes.toolbar}>
          <Grid container alignItems="center" justify="space-between" spacing={0}>
            <Grid item xs={7} sm={4} md={3}>
              <MLogo />
            </Grid>

            {mobileUp && (
              <Grid className={classes.wrapperMenu} item sm={4} md={6}>
                <OMenuDesktop menuLinks={resultMenuLinks} />
              </Grid>
            )}

            <Grid
              container
              className={classes.wrapBasket}
              alignItems="center"
              justify="flex-end"
              item
              xs={2}
              sm={4}
              md={3}
            >
              <button className={classes.basketButton}>
                <span className={classes.basketIcon}>
                  <ShoppingBasket />
                  {productCount && <Typography className={classes.productCount}>{productCount}</Typography>}
                </span>

                {mobileUp && <Typography>Cart</Typography>}
              </button>
            </Grid>

            {!mobileUp && (
              <Grid className={classes.menuBtn} item>
                <button onClick={() => setMenuOpened.toggle()} ref={popperRef}>
                  {menuOpened ? <MenuOpen /> : <MenuIcon />}
                </button>

                <Popper
                  className={classes.mobMenu}
                  open={menuOpened}
                  anchorEl={popperRef.current}
                  transition
                  disablePortal
                >
                  {({ TransitionProps }) => (
                    <Grow {...TransitionProps}>
                      <Paper>
                        <ClickAwayListener onClickAway={() => setMenuOpened.setLeft()}>
                          <MenuList autoFocusItem={menuOpened} id="menu-list-grow">
                            {menuLinks?.map((link: IMenuLink) => (
                              <ALink key={link.to} to={link.to}>
                                <MenuItem
                                  onClick={() => setMenuOpened.setLeft}
                                  selected={link.to === location.pathname}
                                >
                                  {link.text}
                                </MenuItem>
                              </ALink>
                            ))}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default OHeader;
