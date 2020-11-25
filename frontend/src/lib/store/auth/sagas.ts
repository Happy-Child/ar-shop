import { cookies } from '../../../plugins/cookies';
import { takeLatest, call, put } from 'redux-saga/effects';
import { actionLoadingUser, actionSetUser, EActionsTypes, LOGIN_USER_ACTION } from './actions';
import { authAPI } from '../../../services/api';
import { TErrorResponse } from '../../../services/api/types';
import { TResponseLogin, TResponseMe } from '../../../services/api/auth/types';
import { IUserToken } from './interfases';

function* loginUser({ payload }: LOGIN_USER_ACTION) {
  yield put(actionLoadingUser(true));

  const response: TErrorResponse & TResponseLogin = yield call(authAPI.login, payload);

  if (response?.error) {
    yield put(actionSetUser(null));
  } else {
    const { token, expires_at }: IUserToken = response.data.token;
    cookies.set('token', token, {
      maxAge: 3600 * 24,
      expires: new Date(expires_at),
    });
    yield put(actionSetUser(response.data.user));
  }

  yield put(actionLoadingUser(false));
}

function* fetchUserByToken() {
  const token = cookies.get('token');

  if (token) {
    yield put(actionLoadingUser(true));
    const response: TErrorResponse & TResponseMe = yield call(authAPI.me);

    if (response?.error) {
      console.log('Error fetchUserByToken');
    } else {
      yield put(actionSetUser(response.data));
    }
  }

  yield put(actionLoadingUser(false));
}

export function* usersSagas() {
  yield takeLatest(EActionsTypes.LOGIN_USER, loginUser);
  yield takeLatest(EActionsTypes.FETCH_USER_BY_TOKEN, fetchUserByToken);
}
