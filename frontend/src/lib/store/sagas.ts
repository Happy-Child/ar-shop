import { all, fork } from 'redux-saga/effects';
import { categoriesSagas } from './categories/sagas';
import { usersSagas } from './auth/sagas';

export function* rootSaga() {
  yield all([fork(categoriesSagas), fork(usersSagas)]);
}
