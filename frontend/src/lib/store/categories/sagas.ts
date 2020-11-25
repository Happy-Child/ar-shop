import { takeEvery, call, put } from 'redux-saga/effects';
import { actionLoadingAllCategories, EActionsTypes } from './actions';
import { actionSetAllCategories } from './actions';
import { categoriesAPI } from '../../../services/api';
import { TResponseAllCategories } from '../../../services/api/categories/types';
import { TErrorResponse } from '../../../services/api/types';

function* fetchCategories() {
  yield put(actionLoadingAllCategories(true));

  const response: TErrorResponse & TResponseAllCategories = yield call(categoriesAPI.all);

  if (response?.error) {
    yield put(actionSetAllCategories([]));
  } else {
    yield put(actionSetAllCategories(response.data));
  }

  yield put(actionLoadingAllCategories(false));
}

export function* categoriesSagas() {
  yield takeEvery(EActionsTypes.GET_ALL, fetchCategories);
}
