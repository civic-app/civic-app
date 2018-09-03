import { call, takeLatest, put, select } from 'redux-saga/effects';
import authSaga, { emailLoginSaga, facebookLoginSaga, googleLoginSaga, logOutSaga, registerSaga } from './sagas';
import { logInWithEmailAndPassword, logOut, registerWithEmailAndPassword, subscribeToAuthStateChanges } from './api';
import { AuthActionType, authFailure, logOut as logOutAction, logOutSuccess, loginSuccess } from './redux';
import { getEmailInput, getPasswordInput } from './selectors';
import { signInWithFacebookAsync, signInWithGoogleAsync } from './socialauth';
import { toFakeUser } from './doubles';

let gen;

describe('authSaga', () => {
  beforeEach(() => {
    gen = authSaga();
  });

  it('should subscribe to changes to authed user in firebase', () => {
    expect(gen.next().value).toEqual(call(subscribeToAuthStateChanges, loginSuccess, logOutSuccess));
  });

  it('should take the latest emailLoginRequest action and trigger emailLoginSaga', () => {
    gen.next();
    expect(gen.next().value).toEqual(takeLatest(AuthActionType.EmailLoginRequest, emailLoginSaga));
  });

  it('should take the latest facebookLoginRequest and trigger facebookLoginSaga', () => {
    Array.from({ length: 2 }).forEach(() => {
      gen.next();
    });
    expect(gen.next().value).toEqual(takeLatest(AuthActionType.FacebookLoginRequest, facebookLoginSaga));
  });

  it('should take the latest googleLoginRequest and trigger googleLoginSaga', () => {
    Array.from({ length: 3 }).forEach(() => {
      gen.next();
    });
    expect(gen.next().value).toEqual(takeLatest(AuthActionType.GoogleLoginRequest, googleLoginSaga));
  });

  it('should take the latest registerRequest action and trigger registerSaga', () => {
    Array.from({ length: 4 }).forEach(() => {
      gen.next();
    });
    expect(gen.next().value).toEqual(takeLatest(AuthActionType.RegisterRequest, registerSaga));
  });

  it('should take the latest logOutRequest action and trigger logOutSaga', () => {
    Array.from({ length: 5 }).forEach(() => {
      gen.next();
    });
    expect(gen.next().value).toEqual(takeLatest(AuthActionType.LogOutRequest, logOutSaga));
  });
});

describe('emailLoginSaga', () => {
  beforeEach(() => {
    gen = emailLoginSaga();
  });

  it('should read the email from state', () => {
    expect(gen.next().value).toEqual(select(getEmailInput));
  });

  it('should read the password from state', () => {
    gen.next();
    expect(gen.next().value).toEqual(select(getPasswordInput));
  });

  it('should call logInWithEmailAndPassword with values from state', () => {
    const email = 'me@me.com';
    const password = 'foo';
    gen.next();
    gen.next(email);
    expect(gen.next(password).value).toEqual(call(logInWithEmailAndPassword, email, password));
  });

  it('should call loginSuccess with the returned user', () => {
    const user = toFakeUser();
    Array.from({ length: 3 }).forEach(() => {
      gen.next();
    });
    expect(gen.next(user).value).toEqual(put(loginSuccess(user)));
  });

  it('dispatches the logout action when the api call errors', () => {
    Array.from({ length: 3 }).forEach(() => {
      gen.next();
    });
    expect(gen.throw().value).toEqual(put(logOutAction()));
  });

  it('dispatches the authFailure action with the error as payload when the api call errors', () => {
    const error = 'error';
    Array.from({ length: 3 }).forEach(() => {
      gen.next();
    });
    gen.throw(error);
    expect(gen.next().value).toEqual(put(authFailure(error)));
  });
});

describe('facebookLoginSaga', () => {
  beforeEach(() => {
    gen = facebookLoginSaga();
  });

  it('should call signInWithFacebookAsync', () => {
    expect(gen.next().value).toEqual(call(signInWithFacebookAsync));
  });

  it('should call loginSuccess with the returned user', () => {
    const user = toFakeUser();
    gen.next();
    expect(gen.next(user).value).toEqual(put(loginSuccess(user)));
  });

  it('dispatches the logout action when the api call errors', () => {
    gen.next();
    expect(gen.throw().value).toEqual(put(logOutAction()));
  });

  it('dispatches the authFailure action with the error as payload when the api call errors', () => {
    const error = 'error';
    gen.next();
    gen.throw(error);
    expect(gen.next().value).toEqual(put(authFailure(error)));
  });
});

describe('googleLoginSaga', () => {
  beforeEach(() => {
    gen = googleLoginSaga();
  });

  it('should call signInWithGoogleAsync', () => {
    expect(gen.next().value).toEqual(call(signInWithGoogleAsync));
  });

  it('should call loginSuccess with the returned user', () => {
    const user = toFakeUser();
    gen.next();
    expect(gen.next(user).value).toEqual(put(loginSuccess(user)));
  });

  it('dispatches the logout action when the api call errors', () => {
    gen.next();
    expect(gen.throw().value).toEqual(put(logOutAction()));
  });

  it('dispatches the authFailure action with the error as payload when the api call errors', () => {
    const error = 'error';
    gen.next();
    gen.throw(error);
    expect(gen.next().value).toEqual(put(authFailure(error)));
  });
});

describe('registerSaga', () => {
  beforeEach(() => {
    gen = registerSaga();
  });

  it('should read the email from state', () => {
    expect(gen.next().value).toEqual(select(getEmailInput));
  });

  it('should read the password from state', () => {
    gen.next();
    expect(gen.next().value).toEqual(select(getPasswordInput));
  });

  it('should call registerWithEmailAndPassword with values from state', () => {
    const email = 'me@me.com';
    const password = 'foo';
    gen.next();
    gen.next(email);
    expect(gen.next(password).value).toEqual(call(registerWithEmailAndPassword, email, password));
  });

  it('should call loginSuccess with the returned user', () => {
    const user = toFakeUser();
    Array.from({ length: 3 }).forEach(() => {
      gen.next();
    });
    expect(gen.next(user).value).toEqual(put(loginSuccess(user)));
  });

  it('dispatches the logout action when the api call errors', () => {
    Array.from({ length: 3 }).forEach(() => {
      gen.next();
    });
    expect(gen.throw().value).toEqual(put(logOutAction()));
  });

  it('dispatches the authFailure action with the error as payload when the api call errors', () => {
    const error = 'error';
    Array.from({ length: 3 }).forEach(() => {
      gen.next();
    });
    gen.throw(error);
    expect(gen.next().value).toEqual(put(authFailure(error)));
  });
});

describe('logOutSaga', () => {
  beforeEach(() => {
    gen = logOutSaga();
  });

  it('should call logOut', () => {
    expect(gen.next().value).toEqual(call(logOut));
  });

  it('should dispatch logOutSuccess', () => {
    gen.next();
    expect(gen.next().value).toEqual(put(logOutSuccess()));
  });

  it('dispatches the authFailure action with the error as payload when the api call errors', () => {
    const error = 'error';
    gen.next();
    expect(gen.throw(error).value).toEqual(put(authFailure(error)));
  });
});
