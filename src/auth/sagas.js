import { call, put, select, takeLatest } from 'redux-saga/effects';
import { subscribeToAuthStateChanges, logInWithEmailAndPassword, logOut, registerWithEmailAndPassword } from './api';
import {
  AuthUserActionType,
  logOut as logOutAction,
  logOutSuccess,
  loginSuccess,
  authFailure,
} from './redux/userReducer';
import { signInWithFacebookAsync, signInWithGoogleAsync } from './socialauth';
import { getEmailInput, getPasswordInput } from './redux/selectors';

/*
 * Generic wrapper for a login flow that can make an api call,
 * save the user in state on success, or save an error in state
 * on failure.
 */
const generateLoginSaga = (asyncLoginFunction, requiresEmailAndPassword) => function* () {
  try {
    let email;
    let password;
    if (requiresEmailAndPassword) {
      // grab email and password values from state
      email = select(getEmailInput);
      password = select(getPasswordInput);
    }
    // if requiresEmailAndPassword is false, email and password will be undefined
    // and the passed function is essentially called with no parameters
    const user = yield call(asyncLoginFunction, email, password);
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
  yield takeLatest(AuthUserActionType.EmailLoginRequest, emailLoginSaga);
  yield takeLatest(AuthUserActionType.FacebookLoginRequest, facebookLoginSaga);
  yield takeLatest(AuthUserActionType.GoogleLoginRequest, googleLoginSaga);
  yield takeLatest(AuthUserActionType.RegisterRequest, registerSaga);
  yield takeLatest(AuthUserActionType.LogOutRequest, logOutSaga);
}

export default authSaga;
