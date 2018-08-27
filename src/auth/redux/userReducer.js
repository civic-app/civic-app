export const USER_NAMESPACE = 'user';

// Actions
export const AuthUserActionType = {
  EmailLoginRequest: 'civicApp/auth/emailLoginRequest',
  FacebookLoginRequest: 'civicApp/auth/facebookLoginRequest',
  GoogleLoginRequest: 'civicApp/auth/googleLoginRequest',
  LoginSuccess: 'civicApp/auth/emailLoginSuccess',
  LogOutRequest: 'civicApp/auth/logOutRequest',
  LogOutSuccess: 'civicApp/auth/logOutSuccess',
  RegisterRequest: 'civicApp/auth/registerRequest',
  RegisterSuccess: 'civicApp/auth/registerSuccess',
  AuthFailure: 'civicApp/auth/failure',
};

// Action Creators
export const emailLogin = () => ({ type: AuthUserActionType.EmailLoginRequest });

export const facebookLogin = () => ({ type: AuthUserActionType.FacebookLoginRequest });

export const googleLogin = () => ({ type: AuthUserActionType.GoogleLoginRequest });

export const loginSuccess = user => ({
  type: AuthUserActionType.LoginSuccess,
  payload: user,
});

export const register = (email, password) => ({
  type: AuthUserActionType.RegisterRequest,
  payload: { email, password },
});

export const logOut = () => ({ type: AuthUserActionType.LogOutRequest });

export const logOutSuccess = () => ({ type: AuthUserActionType.LogOutSuccess });

export const authFailure = error => ({
  type: AuthUserActionType.AuthFailure,
  payload: error,
});

const initialState = {
  user: {
    id: '',
    email: '',
  },
};

// TODO: errors and maybe loading
const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case AuthUserActionType.LoginSuccess:
    case AuthUserActionType.RegisterSuccess:
      return {
        ...state,
        user: { id: action.payload.uid, email: action.payload.email },
      };
    case AuthUserActionType.LogOutSuccess:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
