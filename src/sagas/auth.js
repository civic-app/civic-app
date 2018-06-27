import { call, takeEvery, put } from 'redux-saga/effects';
import {
  subscribeToAuthStateChanges,
  logIn,
  logOut,
  register,
} from '../auth/api';
import { AuthActionType, logOutSuccess, loginSuccess } from './redux';

const authSaga = function*() {
  yield call(subscribeToAuthStateChanges, loginSuccess, logOutSuccess); // doesn't need a yield but makes testing easier
  yield takeEvery(AuthActionType.LoginRequest, loginSaga);
  yield takeEvery(AuthActionType.LogOutRequest, logOutSaga);
  yield takeEvery(AuthActionType.RegisterRequest, registerSaga);
};

export const loginSaga = function*(action) {
  try {
    const user = yield call(logIn, action.payload);
    yield put(loginSuccess(user));
  } catch (err) {
    // handle error
  }
};

export const logOutSaga = function*() {
  try {
    yield call(logOut);
    yield put(logOutSuccess());
  } catch (err) {
    // handle error
  }
};

export const registerSaga = function*(action) {
  try {
    yield call(register, action.payload);
    yield call(loginSaga, action);
  } catch (err) {
    // handle error
  }
};

export default authSaga;
