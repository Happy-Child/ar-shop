import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from './root-reducer';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';
import { AppStore } from './types';

const sagaMiddleware = createSagaMiddleware();

const store: AppStore = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(sagaMiddleware),
    window && (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

sagaMiddleware.run(rootSaga);

export { store };
