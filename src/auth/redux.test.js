import authReducer, {
  AUTH_NAMESPACE,
  getLoggedInUser,
  loginSuccess,
  logOutSuccess,
  getIsLoggedIn,
  initialState,
} from './redux';
import { toFakeUser } from './doubles';

const toUser = () => toFakeUser();
const toLoggedOutState = () => initialState;
const toLoggedInState = () => ({
  ...initialState,
  user: toUser(),
});
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
