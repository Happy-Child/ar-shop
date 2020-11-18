import React from 'react';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Variant } from '@material-ui/core/styles/createTypography';

interface IMPageTitleProps {
  children: any;
  className?: string;
  variant?: Variant;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginBottom: '1.5rem',
      [theme.breakpoints.down('md')]: {
        fontSize: '36px',
      },
    },
  }),
);

const MPageTitle: React.FC<IMPageTitleProps> = ({ className = '', children, variant = 'h2' }: IMPageTitleProps) => {
  const classes = useStyles();
  return (
    <Typography variant={variant} className={`${classes.root} ${className}`}>
      {children}
    </Typography>
  );
};

export default MPageTitle;
