import { takeEvery, call, put } from 'redux-saga/effects';
import { actionLoadingAllCategories, EActionsTypes } from './actions';
import { actionSetAllCategories } from './actions';
import { categoriesAPI } from '../../../services/api';
import { TSuccessResponse } from '../../../services/api/types';
import { ICategoryAll } from './interfases';

interface IFetchCategoriesResponse extends TSuccessResponse {
  data: Array<ICategoryAll> | [];
}

function* fetchCategories() {
  try {
    yield put(actionLoadingAllCategories(true));
    const response: IFetchCategoriesResponse = yield call(categoriesAPI.all);
    yield put(actionSetAllCategories(response.data));
  } catch (e) {
    yield put(actionSetAllCategories([]));
  } finally {
    yield put(actionLoadingAllCategories(false));
  }
}

export function* categoriesSagas() {
  yield takeEvery(EActionsTypes.GET_ALL, fetchCategories);
}
