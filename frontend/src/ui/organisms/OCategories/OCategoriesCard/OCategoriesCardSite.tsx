import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ICategoryList } from '../../../../lib/store/categories/interfases';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import ALink from '../../../atoms/ALink';

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      height: '100%',
      display: 'block',
    },
    cardInner: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: '14px 18px',
    },
    wrapImage: {
      flexShrink: 0,
      width: '60px',
      height: '60px',
      borderRadius: '1000px',
      backgroundColor: '#cfcfcf',
      overflow: 'hidden',
      position: 'relative',
      display: 'block',
      marginRight: '14px',
    },
    image: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100%',
    },
    content: {
      flexGrow: 1,
    },
    title: {
      marginBottom: '8px',
      fontWeight: 500,
    },
    count: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    countLabel: {},
    countValue: {},
  }),
);

export interface IOCategoriesCardSite {
  category: ICategoryList;
}

const OCategoriesCardSite: React.FC<IOCategoriesCardSite> = ({ category }: IOCategoriesCardSite) => {
  const classes = useStyles();
  return (
    <ALink to={`categories/${category.id}`} className={classes.card}>
      <Card className={classes.cardInner}>
        <picture className={classes.wrapImage}>
          {category.image_small && <img className={classes.image} src={category.image_small} alt="" />}
        </picture>
        <span className={classes.content}>
          <Typography variant="body1" className={classes.title}>
            {category.name}
          </Typography>
          <span className={classes.count}>
            <Typography className={classes.countLabel}>Product count:</Typography>
            <Typography className={classes.countValue}>{category.products_count}</Typography>
          </span>
        </span>
      </Card>
    </ALink>
  );
};

export { OCategoriesCardSite };
