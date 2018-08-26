import {
  call, takeEvery, takeLatest, put,
} from 'redux-saga/effects';
import {
  subscribeToAuthStateChanges, logIn, logOut, register,
} from './api';
import {
  AuthUserActionType,
  logOut as logOutAction,
  logOutSuccess,
  loginSuccess,
  authFailure,
} from './redux/userReducer';
import { signInWithFacebookAsync, signInWithGoogleAsync } from './socialauth';

/*
 * Generic wrapper for a login flow that can make an api call,
 * save the user in state on success, or save an error in state
 * on failure.
 */
const generateLoginSaga = asyncLoginFunction => function* () {
  try {
    const user = yield call(asyncLoginFunction);
    yield put(loginSuccess(user));
  } catch (err) {
    yield put(logOutAction());
    yield put(authFailure(err));
  }
};

const facebookLoginSaga = generateLoginSaga(signInWithFacebookAsync);
const googleLoginSaga = generateLoginSaga(signInWithGoogleAsync);

/*
 * Listen for auth actions in parallel with one saga. Each individual saga must
 * handle its own errors. Allow one login request at a time.
 */
function* authSaga() {
  yield call(subscribeToAuthStateChanges, loginSuccess, logOutSuccess); // doesn't need a yield but makes testing easier
  yield takeLatest(AuthUserActionType.EmailLoginRequest, emailLoginSaga);
  yield takeLatest(AuthUserActionType.FacebookLoginRequest, facebookLoginSaga);
  yield takeLatest(AuthUserActionType.GoogleLoginRequest, googleLoginSaga);
  yield takeEvery(AuthUserActionType.LogOutRequest, logOutSaga);
  yield takeEvery(AuthUserActionType.RegisterRequest, registerSaga);
}

function* emailLoginSaga(action) {
  try {
    const user = yield call(logIn, action.payload);
    yield put(loginSuccess(user));
  } catch (err) {
    yield put(logOut());
    yield put(authFailure(err));
  }
}

function* logOutSaga() {
  try {
    yield takeLatest(AuthUserActionType.LogOutRequest, logOut);
    yield put(logOutSuccess());
  } catch (err) {
    yield put(authFailure(err));
  }
}

function* registerSaga(action) {
  try {
    yield call(register, action.payload);
    yield call(loginSaga, action);
  } catch (err) {
    // handle error
  }
}

export default authSaga;
