import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ALink from '../atoms/ALink';
import { IMenuLink } from './OHeader';

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

      [theme.breakpoints.down('md')]: {
        fontSize: '14px',
      },

      '&:last-child': {
        marginRight: 0,
      },
    },
  }),
);

const OMenuDesktop: React.FC<IOMenuDesktop> = ({ menuLinks }: IOMenuDesktop) => {
  const classes = useStyles();

  return (
    <div className={classes.menu}>
      {menuLinks?.map((link: IMenuLink) => (
        <ALink key={link.to} to={link.to} className={classes.menuItem}>
          <Typography>{link.text}</Typography>
        </ALink>
      ))}
    </div>
  );
};

export default OMenuDesktop;
