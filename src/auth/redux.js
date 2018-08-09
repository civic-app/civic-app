export const formTypes = {
  INITIAL: 'initial',
  LOGIN: 'login',
  SIGN_UP: 'signUp',
};

// Selectors
export const getLoggedInUser = state => state[AUTH_NAMESPACE].user;

export const getIsLoggedIn = state => !!getLoggedInUser(state);

export const getFormType = state => state[AUTH_NAMESPACE].formType;

export const getLoggedInUserId = state =>
  // TODO: remove id after adding login to app
  (getLoggedInUser(state) && getLoggedInUser(state).id) || 'Ra6l4NfjcLcc8XdP4gX1aWdhRRd2';

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

export const switchFormType = formType => ({
  type: AuthActionType.SwitchFormType,
  payload: formType,
});

export const AuthActionType = {
  LoginRequest: 'civicApp/auth/loginRequest',
  LoginSuccess: 'civicApp/auth/loginSuccess',
  LogOutRequest: 'civicApp/auth/logOutRequest',
  LogOutSuccess: 'civicApp/auth/logOutSuccess',
  RegisterRequest: 'civicApp/auth/registerRequest',
  RegisterSuccess: 'civicApp/auth/registerSuccess',
  SwitchFormType: 'civicApp/auth/switchFormType',
};

// Reducer
export const AUTH_NAMESPACE = 'auth';

// TODO: errors and maybe loading
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionType.LoginSuccess:
      return {
        user: action.payload,
      };
    case AuthActionType.LogOutSuccess:
      return {
        user: undefined,
      };
    case AuthActionType.SwitchFormType:
      return {
        ...state,
        formType: action.payload,
      };
    default:
      return state;
  }
};

const initialState = {
  user: undefined,
  formType: formTypes.INITIAL,
};

export default reducer;
