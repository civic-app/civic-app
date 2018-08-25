export const USER_NAMESPACE = 'user';

// Actions
export const AuthUserActionType = {
  LoginRequest: 'civicApp/auth/loginRequest',
  LoginSuccess: 'civicApp/auth/loginSuccess',
  LogOutRequest: 'civicApp/auth/logOutRequest',
  LogOutSuccess: 'civicApp/auth/logOutSuccess',
  RegisterRequest: 'civicApp/auth/registerRequest',
  RegisterSuccess: 'civicApp/auth/registerSuccess',
  AuthFailure: 'civicApp/auth/failure',
};

// Action Creators
export const logIn = (email, password) => ({
  type: AuthUserActionType.LoginRequest,
  payload: { email, password },
});

export const loginSuccess = user => ({
  type: AuthUserActionType.LoginSuccess,
  payload: user,
});

export const register = (email, password) => ({
  type: AuthUserActionType.RegisterRequest,
  payload: { email, password },
});

export const logOut = () => ({
  type: AuthUserActionType.LogOutRequest,
});

export const logOutSuccess = () => ({
  type: AuthUserActionType.LogOutSuccess,
});

export const authFailure = error => ({
  type: AuthUserActionType.AuthFailure,
  payload: error,
});

// TODO: errors and maybe loading
const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case AuthUserActionType.LoginRequest:
    case AuthUserActionType.RegisterRequest:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case AuthUserActionType.LoginSuccess:
    case AuthUserActionType.RegisterSuccess:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case AuthUserActionType.AuthFailure:
      return {
        ...state,
        error: action.payload,
      };
    case AuthUserActionType.LogOutSuccess:
      return initialState;
    default:
      return state;
  }
};

const initialState = {
  user: undefined,
  loading: false,
  error: '',
};

export default userReducer;
