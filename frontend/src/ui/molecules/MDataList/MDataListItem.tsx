import React from 'react';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';

export interface IDataListItem {
  key: string;
  value: string | number;
}

interface IDataListItemProps {
  item: IDataListItem;
  className?: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    listItem: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '8px',
      paddingBottom: '8px',
      borderBottom: '1px solid #eaeaea',

      '&:last-child': {
        marginBottom: 0,
      },
    },
    listItemKey: {
      fontWeight: 500,
      flexShrink: 0,
      marginRight: '6px',
    },
    listItemValue: {
      textAlign: 'right',
    },
  }),
);

const MDataListItem: React.FC<IDataListItemProps> = ({ item, className = '' }: IDataListItemProps) => {
  const classes = useStyles();
  return (
    <li className={`${classes.listItem} ${className}`}>
      <Typography className={classes.listItemKey}>{item.key}:</Typography>
      <Typography className={classes.listItemValue}>{item.value}</Typography>
    </li>
  );
};

export { MDataListItem };
