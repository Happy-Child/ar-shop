import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from './root-reducer';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';
import { ICategoryAll } from './categories/interfases';
import { ICartItem } from './cart/interfases';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window && (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

sagaMiddleware.run(rootSaga);

export interface IAppState {
  categories: {
    allCategories: Array<ICategoryAll> | [];
    loading: false;
  };
  cart: ICartItem[] | [];
}

export { store };
