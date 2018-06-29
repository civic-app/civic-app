import { call, takeEvery, put } from 'redux-saga/effects';
import authSaga, { loginSaga, logOutSaga, registerSaga } from './sagas';
import {
  logIn as APILogIn,
  logOut as APILogOut,
  register as APIRegister,
  subscribeToAuthStateChanges,
} from './api';
import {
  AuthActionType,
  logOutSuccess,
  loginSuccess,
  logIn,
  logOut,
  register,
} from './redux';
import { toFakeUser } from './doubles';

describe('authSaga', () => {
  let gen;

  beforeEach(() => {
    gen = authSaga();
  });

  it('should subscribe to changes to authed user in firebase', () => {
    expect(gen.next().value).toEqual(
      call(subscribeToAuthStateChanges, loginSuccess, logOutSuccess),
    );
  });

  it('should take every logIn action and trigger loginSaga', () => {
    gen.next();
    expect(gen.next().value).toEqual(
      takeEvery(AuthActionType.LoginRequest, loginSaga),
    );
  });

  it('should take every logOut action and trigger logOutSaga', () => {
    gen.next();
    gen.next();
    expect(gen.next().value).toEqual(
      takeEvery(AuthActionType.LogOutRequest, logOutSaga),
    );
  });

  it('should take every register action and trigger registerSaga', () => {
    gen.next();
    gen.next();
    gen.next();
    expect(gen.next().value).toEqual(
      takeEvery(AuthActionType.RegisterRequest, registerSaga),
    );
  });
});

describe('loginSaga', () => {
  const email = 'me@me.com';
  const password = 'foo';
  const action = logIn(email, password);
  const user = toFakeUser();
  let gen;

  beforeEach(() => {
    gen = loginSaga(action);
  });

  it('should call login', () => {
    expect(gen.next().value).toEqual(call(APILogIn, action.payload));
  });

  it('should dispatch loginSuccess', () => {
    gen.next();
    expect(gen.next(user).value).toEqual(put(loginSuccess(user)));
  });
});

describe('logOutSaga', () => {
  let gen;
  const action = logOut();

  beforeEach(() => {
    gen = logOutSaga(action);
  });

  it('should call logOut', () => {
    expect(gen.next().value).toEqual(call(APILogOut));
  });

  it('should dispatch logOutSuccess', () => {
    gen.next();
    expect(gen.next().value).toEqual(put(logOutSuccess()));
  });
});

describe('registerSaga', () => {
  const email = 'me@me.com';
  const password = 'foo';
  const action = register(email, password);
  let gen;

  beforeEach(() => {
    gen = registerSaga(action);
  });

  it('should call register', () => {
    expect(gen.next().value).toEqual(call(APIRegister, action.payload));
  });

  it('should call loginSaga', () => {
    gen.next();
    expect(gen.next().value).toEqual(call(loginSaga, action));
  });
});
