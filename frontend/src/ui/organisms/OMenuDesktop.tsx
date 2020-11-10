import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ALink from '../atoms/ALink';
import { IMenuLink } from './OHeader';
import { Location } from 'history';
import { useLocation } from 'react-router-dom';

interface IOMenuDesktop {
  menuLinks: Array<IMenuLink>;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    menu: {
      display: 'flex',
      alignItems: 'center',
    },
    menuItem: {
      marginRight: '1rem',
      position: 'relative',
      paddingBottom: '10px',
      marginBottom: '-10px',

      [theme.breakpoints.down('md')]: {
        fontSize: '14px',
      },

      '&:last-child': {
        marginRight: 0,
      },

      '&:hover > nav': {
        transform: 'translate(-50%, 0)',
        opacity: 1,
        pointerEvents: 'auto',
      },
    },
    menuLink: {
      borderBottom: '1px solid transparent',
    },
    menuLinkActive: {
      borderBottomColor: '#fff',
    },
    menuSubNav: {
      position: 'absolute',
      top: '100%',
      left: '50%',
      transform: 'translate(-50%, 8px)',
      width: '600px',
      opacity: 0,
      pointerEvents: 'none',
      transition: '0.3s all ease',
    },
    menuSubList: {
      backgroundColor: '#fff',
      display: 'flex',
      flexWrap: 'wrap',
      borderRadius: '4px',
      padding: '14px 20px 8px',
      boxShadow: '0 2px 16px rgba(0, 0, 0, 0.1)',
    },
    menuSubItem: {
      width: '100%',
      maxWidth: '50%',
      marginBottom: '6px',
    },
    menuSubLink: {
      display: 'block',
      color: '#000',
      opacity: '0.6',
    },
    menuSubLinkActive: {
      opacity: 1,
    },
  }),
);

const OMenuDesktop: React.FC<IOMenuDesktop> = ({ menuLinks }: IOMenuDesktop) => {
  const classes = useStyles();
  const location: Location = useLocation();

  return (
    <ul className={classes.menu}>
      {menuLinks?.map((link: IMenuLink) => (
        <li key={link.to} className={classes.menuItem}>
          <ALink
            to={link.to}
            className={`${classes.menuLink} ${location.pathname === link.to && classes.menuLinkActive}`}
          >
            <Typography>{link.text}</Typography>
          </ALink>

          {link?.children && link.children.length && (
            <nav className={classes.menuSubNav}>
              <ul className={classes.menuSubList}>
                {(link.children as IMenuLink[])?.map((subLink: IMenuLink) => (
                  <li key={subLink.to} className={classes.menuSubItem}>
                    <ALink
                      to={subLink.to}
                      className={`${classes.menuSubLink} ${
                        location.pathname === subLink.to && classes.menuSubLinkActive
                      }`}
                    >
                      <Typography>{subLink.text}</Typography>
                    </ALink>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </li>
      ))}
    </ul>
  );
};

export default OMenuDesktop;
