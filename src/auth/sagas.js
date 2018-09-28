import { call, put, select, takeLatest } from 'redux-saga/effects';
import { subscribeToAuthStateChanges, logInWithEmailAndPassword, logOut, registerWithEmailAndPassword } from './api';
import { AuthActionType, logOut as logOutAction, logOutSuccess, loginSuccess, authFailure } from './redux';
import { signInWithFacebookAsync, signInWithGoogleAsync } from './socialauth';
import { getEmailInput, getPasswordInput } from './selectors';
import { loadUserDataSaga } from '../user/sagas';

/*
 * Generic wrapper for a login flow that can make an api call,
 * save the user in state on success, or save an error in state
 * on failure.
 */
const generateLoginSaga = (asyncLoginFunction, requiresEmailAndPassword) =>
  function*() {
    try {
      let email;
      let password;
      let userResponse;
      if (requiresEmailAndPassword) {
        // grab email and password values from state
        email = yield select(getEmailInput);
        password = yield select(getPasswordInput);
        userResponse = yield call(asyncLoginFunction, email, password);
      } else {
        userResponse = yield call(asyncLoginFunction);
      }
      // load user data from firebase before updating auth state
      // so that components after login are properly hydrated
      yield call(loadUserDataSaga, userResponse.user.uid);
      yield put(loginSuccess(userResponse.user));
    } catch (err) {
      yield put(logOutAction());
      yield put(authFailure(err));
    }
  };

export const facebookLoginSaga = generateLoginSaga(signInWithFacebookAsync, false);
export const googleLoginSaga = generateLoginSaga(signInWithGoogleAsync, false);
export const emailLoginSaga = generateLoginSaga(logInWithEmailAndPassword, true);
export const registerSaga = generateLoginSaga(registerWithEmailAndPassword, true);

export function* logOutSaga() {
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
