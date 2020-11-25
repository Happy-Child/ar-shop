import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { routes, IRoute } from './routes';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MPageLoading from './ui/molecules/MPageLoading';
import { OHeader } from './ui/organisms/OHeader/OHeader';
import OFooter from './ui/organisms/OFooter';
import { actionFetchALlCategories } from './lib/store/categories/actions';
import { actionFetchUserByToken } from './lib/store/auth/actions';
import { connect, useDispatch } from 'react-redux';
import { ICartItem } from './lib/store/cart/interfases';
import { AppState } from './lib/store/types';
import { selectorAllCart } from './lib/store/cart/selectors';
import { useEffectAfterRender } from './hooks/useEffectAfterRender';
import { toastNotification } from './plugins/toast';
import { errorsCodesValues } from './lib/errors/errorsCodesValues';

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

interface IAppProps {
  cart: ICartItem[] | [];
}

const App: React.FC<IAppProps> = ({ cart }: IAppProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffectAfterRender(() => {
    try {
      window.localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
      toastNotification('error', errorsCodesValues[e?.message]);
    }
  }, [cart]);

  React.useEffect(() => {
    dispatch(actionFetchUserByToken());
    dispatch(actionFetchALlCategories());
  }, []);

  return (
    <BrowserRouter>
      <MPageLoading />
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

        <ToastContainer />
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = (state: AppState) => ({
  cart: selectorAllCart(state),
});

export default connect(mapStateToProps)(App);
