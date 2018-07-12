import { createSelector } from 'reselect';
import _ from 'lodash';

// Selectors
export const getLoggedInUser = state => state[AUTH_NAMESPACE].user;
export const getIsSurveyCompleted = state => state[AUTH_NAMESPACE].isSurveyCompleted;
export const getIsEmailVerified = state => state[AUTH_NAMESPACE].isEmailVerified;
export const getIsRegisteredToVote = state => state[AUTH_NAMESPACE].isRegisteredToVote;

export const getIsLoggedIn = createSelector(getLoggedInUser, user => !_.isNil(user));

// Action Creators
export const logIn = (email, password) => ({
  type: AuthActionType.LoginRequest,
  payload: { email, password },
});

export const loginSuccess = user => ({
  type: AuthActionType.LoginSuccess,
  payload: user,
});

export const register = (email, password) => ({
  type: AuthActionType.RegisterRequest,
  payload: { email, password },
});

export const logOut = () => ({
  type: AuthActionType.LogOutRequest,
});

export const logOutSuccess = () => ({
  type: AuthActionType.LogOutSuccess,
});

export const AuthActionType = {
  LoginRequest: 'civicApp/auth/loginRequest',
  LoginSuccess: 'civicApp/auth/loginSuccess',
  LogOutRequest: 'civicApp/auth/logOutRequest',
  LogOutSuccess: 'civicApp/auth/logOutSuccess',
  RegisterRequest: 'civicApp/auth/registerRequest',
  RegisterSuccess: 'civicApp/auth/registerSuccess',
};

// Reducer
export const AUTH_NAMESPACE = 'auth';

const initialState = {
  user: null,
  isSurveyCompleted: false,
  isEmailVerified: false,
  isRegisteredToVote: false,
};

// TODO: errors and maybe loading
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionType.LoginSuccess:
      return {
        ...state,
        user: action.payload,
      };
    case AuthActionType.LogOutSuccess:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
