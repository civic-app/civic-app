import { call, put, select, takeLatest } from 'redux-saga/effects';
import { subscribeToAuthStateChanges, logInWithEmailAndPassword, logOut, registerWithEmailAndPassword } from './api';
import {
  AuthActionType,
  logOut as logOutAction,
  logOutSuccess,
  loginSuccess,
  authFailure,
} from './redux';
import { signInWithFacebookAsync, signInWithGoogleAsync } from './socialauth';
import { getEmailInput, getPasswordInput } from './selectors';

/*
 * Generic wrapper for a login flow that can make an api call,
 * save the user in state on success, or save an error in state
 * on failure.
 */
const generateLoginSaga = (asyncLoginFunction, requiresEmailAndPassword) => function* () {
  try {
    let email;
    let password;
    let user;
    if (requiresEmailAndPassword) {
      // grab email and password values from state
      email = yield select(getEmailInput);
      password = yield select(getPasswordInput);
      user = yield call(asyncLoginFunction, email, password);
    } else {
      user = yield call(asyncLoginFunction);
    }
    yield put(loginSuccess(user));
  } catch (err) {
    yield put(logOutAction());
    yield put(authFailure(err));
  }
};

const facebookLoginSaga = generateLoginSaga(signInWithFacebookAsync, false);
const googleLoginSaga = generateLoginSaga(signInWithGoogleAsync, false);
const emailLoginSaga = generateLoginSaga(logInWithEmailAndPassword, true);
const registerSaga = generateLoginSaga(registerWithEmailAndPassword, true);

function* logOutSaga() {
  try {
    yield call(logOut);
    yield put(logOutSuccess());
  } catch (err) {
    yield put(authFailure(err));
  }
}

/*
 * Listen for auth actions in parallel with one saga. Each individual saga must
 * handle its own errors. Allow one login request at a time.
 */
function* authSaga() {
  yield call(subscribeToAuthStateChanges, loginSuccess, logOutSuccess); // doesn't need a yield but makes testing easier
  yield takeLatest(AuthActionType.EmailLoginRequest, emailLoginSaga);
  yield takeLatest(AuthActionType.FacebookLoginRequest, facebookLoginSaga);
  yield takeLatest(AuthActionType.GoogleLoginRequest, googleLoginSaga);
  yield takeLatest(AuthActionType.RegisterRequest, registerSaga);
  yield takeLatest(AuthActionType.LogOutRequest, logOutSaga);
}

export default authSaga;
