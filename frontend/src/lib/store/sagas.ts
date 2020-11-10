import { all, fork } from 'redux-saga/effects';
import { categoriesSagas } from './categories/sagas';

export function* rootSaga() {
  yield all([fork(categoriesSagas)]);
}
