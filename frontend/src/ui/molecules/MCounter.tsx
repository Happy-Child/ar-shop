import React, { ChangeEvent } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ALink from '../atoms/ALink';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Location } from 'history';
import { useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export interface IBreadcrumbEl {
  to: string;
  text: string;
}

interface IMCounterProps {
  count: number | string;
  changeCount?: (type: string) => void;
  handleInputCount?: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  handleBlurCount?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    counter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    counterLess: {
      minWidth: '35px',
    },
    counterMore: {
      minWidth: '35px',
    },
    counterNumber: {
      margin: '0 8px',
      width: '30px',
    },
  }),
);

const MCounter: React.FC<IMCounterProps> = ({
  count,
  changeCount = () => {},
  handleInputCount = () => {},
  handleBlurCount = () => {},
  className = '',
}: IMCounterProps) => {
  const classes = useStyles();

  return (
    <div className={`${classes.counter} ${className}`}>
      <Button
        onClick={changeCount.bind(null, 'less')}
        className={classes.counterLess}
        size="small"
        variant="contained"
        color="primary"
      >
        -
      </Button>

      <TextField
        className={classes.counterNumber}
        value={count}
        type="number"
        onChange={handleInputCount}
        onBlur={handleBlurCount}
      />

      <Button
        onClick={changeCount.bind(null, 'more')}
        className={classes.counterMore}
        size="small"
        variant="contained"
        color="primary"
      >
        +
      </Button>
    </div>
  );
};

export { MCounter };
