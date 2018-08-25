import { call, takeEvery, put } from 'redux-saga/effects';
import { subscribeToAuthStateChanges, logIn, logOut, register } from './api';
import { AuthUserActionType, logOutSuccess, loginSuccess } from './redux/userReducer';

const authSaga = function*() {
  yield call(subscribeToAuthStateChanges, loginSuccess, logOutSuccess); // doesn't need a yield but makes testing easier
  yield takeEvery(AuthUserActionType.LoginRequest, loginSaga);
  yield takeEvery(AuthUserActionType.LogOutRequest, logOutSaga);
  yield takeEvery(AuthUserActionType.RegisterRequest, registerSaga);
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
