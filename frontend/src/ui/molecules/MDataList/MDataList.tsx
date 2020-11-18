import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { MDataListItem, IDataListItem } from './MDataListItem';

interface IDataListProps {
  list: IDataListItem[];
  className?: string;
  children?: any;
}

const useStyles = makeStyles(() =>
  createStyles({
    list: {
      maxWidth: '600px',
      width: '100%',
    },
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

const MDataList: React.FC<IDataListProps> = ({ list, children, className = '' }: IDataListProps) => {
  const classes = useStyles();
  return (
    <ul className={`${classes.list} ${className}`}>
      {children ? { children } : list.map((item: IDataListItem) => <MDataListItem key={item.key} item={item} />)}
    </ul>
  );
};

export { MDataList };
