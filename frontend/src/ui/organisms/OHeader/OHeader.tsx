import React from 'react';
import { Location } from 'history';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useToggle } from '../../../hooks/useToggle';
import { connect } from 'react-redux';
import { ICategoryAll } from '../../../lib/store/categories/interfases';
import { AppState } from '../../../lib/store/types';
import { selectorAllCategories } from '../../../lib/store/categories/selectors';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Button from '@material-ui/core/Button';
import { Menu as MenuIcon, MenuOpen } from '@material-ui/icons';
import MLogo from '../../molecules/MLogo';
import { OHeaderMenuDesktop } from './OHeaderMenuDesktop';
import ALink from '../../atoms/ALink';
import { OHeaderCart } from './OHeaderCart';
import { selectorCartCount } from '../../../lib/store/cart/selectors';

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
    wrapBasket: {
      [theme.breakpoints.down('xs')]: {
        marginLeft: 'auto',
      },
    },
    basket: {
      marginRight: '1rem',
    },
    actionButton: {
      marginRight: '1rem',

      '&:last-child': {
        marginRight: 0,
      },
    },
  }),
);

interface IOHeaderProps {
  allCategories: ICategoryAll[];
  cartCount: number;
}

const OHeaderTemplate: React.FC<IOHeaderProps> = ({ cartCount, allCategories }: IOHeaderProps) => {
  const classes = useStyles();
  const [resultMenuLinks, setResultMenuLinks] = React.useState(menuLinks);
  const location: Location = useLocation();
  const mobileUp = useMediaQuery(useTheme().breakpoints.up('sm'));
  const popperRef = React.useRef<HTMLButtonElement>(null);
  const [menuOpened, setMenuOpened] = useToggle(false);

  React.useEffect(() => {
    if (!allCategories.length) return;

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
  }, [allCategories]);

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
                <OHeaderMenuDesktop menuLinks={resultMenuLinks} />
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
              <ALink to="/cart" className={classes.basket}>
                <OHeaderCart count={cartCount} />
              </ALink>

              <ALink to="/login" className={classes.actionButton}>
                <Button variant="contained" color="default">
                  Login
                </Button>
              </ALink>

              <ALink to="/registration" className={classes.actionButton}>
                <Button variant="contained" color="default">
                  Registration
                </Button>
              </ALink>
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

const mapStateToProps = (state: AppState) => ({
  cartCount: selectorCartCount(state),
  allCategories: selectorAllCategories(state),
});

const OHeader = connect(mapStateToProps, {})(OHeaderTemplate);

export { OHeader };
