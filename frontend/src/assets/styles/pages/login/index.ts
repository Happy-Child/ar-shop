import { createStyles, makeStyles } from '@material-ui/core/styles';

export const usePageStyles = makeStyles((theme) =>
  createStyles({
    container: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '2rem 0',
      maxWidth: '480px',
      width: '100%',
      margin: '0 auto',
    },
    title: {
      [theme.breakpoints.down('md')]: {
        fontSize: '36px',
      },
    },
    formItem: {
      marginBottom: '1rem',

      '&:last-of-type': {
        marginBottom: '2rem',
      },
    },
  }),
);
