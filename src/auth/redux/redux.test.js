import authReducer, { AUTH_NAMESPACE } from '../redux';
import { loginSuccess, logOutSuccess } from './userReducer';
import { getLoggedInUser, getIsLoggedIn } from './selectors';
import { toFakeUser } from '../doubles';

const toUser = () => toFakeUser();
const toLoggedOutState = () => ({ user: undefined });
const toLoggedInState = () => ({ user: toUser() });
const toAuthSelectorState = reducerState => ({
  [AUTH_NAMESPACE]: reducerState,
});

describe('auth reducer', () => {
  it('should set user on login success', () => {
    expect(authReducer(toLoggedOutState(), loginSuccess(toUser()))).toEqual(toLoggedInState());
  });

  it('should clear user on log out success', () => {
    expect(authReducer(toLoggedInState(), logOutSuccess())).toEqual(toLoggedOutState());
  });
});

describe('selectors', () => {
  it('when user is logged in, getLoggedInUser should return user', () => {
    expect(getLoggedInUser(toAuthSelectorState(toLoggedInState()))).toEqual(toUser());
  });

  it('when user is not logged in, getLoggedInUser should return undefined', () => {
    expect(getLoggedInUser(toAuthSelectorState(toLoggedOutState()))).toEqual(undefined);
  });

  it('when user is logged in, getIsLoggedIn should return true', () => {
    expect(getIsLoggedIn(toAuthSelectorState(toLoggedInState()))).toEqual(true);
  });

  it('when user is not logged in, getIsLoggedIn should return false', () => {
    expect(getIsLoggedIn(toAuthSelectorState(toLoggedOutState()))).toEqual(false);
  });
});
