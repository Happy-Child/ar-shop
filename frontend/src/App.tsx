import React, { ReactNode, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { routes, IRoute } from './routes';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import MPageLoading from './ui/molecules/MPageLoading';
import OHeader from './ui/organisms/OHeader';
import OFooter from './ui/organisms/OFooter';
const PNotFound = React.lazy(() => import('./pages/PNotFound'));

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'stretch',
      flexDirection: 'column',
    },
  }),
);

const App: React.FC<ReactNode> = () => {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={`t-common ${classes.root}`}>
        <OHeader />

        <Switch>
          <Suspense fallback={<MPageLoading />}>
            {routes?.map((route: IRoute) => (
              <Route key={route.path} path={route.path} exact={route.exact} component={route.component} />
            ))}
            {/*<Route component={PNotFound} />*/}
          </Suspense>
        </Switch>

        <OFooter />
      </div>
    </BrowserRouter>
  );
};

export default App;
