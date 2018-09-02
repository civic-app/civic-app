export const AUTH_NAMESPACE = 'auth';
export const formTypes = {
  INITIAL: 'initial',
  LOGIN: 'login',
  SIGN_UP: 'signUp',
};

// Actions
export const AuthActionType = {
  EmailLoginRequest: 'civicApp/auth/emailLoginRequest',
  FacebookLoginRequest: 'civicApp/auth/facebookLoginRequest',
  GoogleLoginRequest: 'civicApp/auth/googleLoginRequest',
  LoginSuccess: 'civicApp/auth/emailLoginSuccess',
  LogOutRequest: 'civicApp/auth/logOutRequest',
  LogOutSuccess: 'civicApp/auth/logOutSuccess',
  RegisterRequest: 'civicApp/auth/registerRequest',
  RegisterSuccess: 'civicApp/auth/registerSuccess',
  AuthFailure: 'civicApp/auth/failure',
  SwitchFormType: 'civicApp/auth/switchFormType',
  UpdateEmail: 'civicApp/auth/updateEmail',
  UpdatePassword: 'civicApp/auth/updatePassword',
  UpdateDuplicatePassword: 'civicApp/auth/updateDuplicatePassword',
  ShowErrors: 'civicApp/auth/showErrors',
};

// Action Creators
export const emailLogin = () => ({ type: AuthActionType.EmailLoginRequest });

export const facebookLogin = () => ({ type: AuthActionType.FacebookLoginRequest });

export const googleLogin = () => ({ type: AuthActionType.GoogleLoginRequest });

export const loginSuccess = user => ({
  type: AuthActionType.LoginSuccess,
  payload: user,
});

export const register = (email, password) => ({
  type: AuthActionType.RegisterRequest,
  payload: { email, password },
});

export const logOut = () => ({ type: AuthActionType.LogOutRequest });

export const logOutSuccess = () => ({ type: AuthActionType.LogOutSuccess });

export const authFailure = error => ({
  type: AuthActionType.AuthFailure,
  payload: error,
});

/*
 * @param formType: member of formTypes object;
 */
export const switchFormType = formType => ({
  type: AuthActionType.SwitchFormType,
  payload: formType,
});

/*
 * @param email: string;
 */
export const updateEmail = email => ({
  type: AuthActionType.UpdateEmail,
  payload: email,
});

/*
 * @param password: string;
 */
export const updatePassword = password => ({
  type: AuthActionType.UpdatePassword,
  payload: password,
});

/*
 * @param password: string;
 */
export const updateDuplicatePassword = password => ({
  type: AuthActionType.UpdateDuplicatePassword,
  payload: password,
});

/*
 * @param shouldShow: boolean;
 */
export const showErrors = shouldShow => ({
  type: AuthActionType.ShowErrors,
  payload: shouldShow,
});

const initialState = {
  user: {
    id: '',
    email: '',
  },
  formType: formTypes.INITIAL,
  email: '',
  password: '',
  duplicatePassword: '',
  showErrors: false,
};

const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case AuthActionType.SwitchFormType:
      return {
        ...state,
        formType: action.payload,
        showErrors: false,
      };
    case AuthActionType.UpdateEmail:
      return {
        ...state,
        email: action.payload,
        showErrors: false,
      };
    case AuthActionType.UpdatePassword:
      return {
        ...state,
        password: action.payload,
        showErrors: false,
      };
    case AuthActionType.UpdateDuplicatePassword:
      return {
        ...state,
        duplicatePassword: action.payload,
        showErrors: false,
      };
    case AuthActionType.ShowErrors:
      return {
        ...state,
        showErrors: action.payload,
      };
    case AuthActionType.LoginSuccess:
    case AuthActionType.RegisterSuccess:
      return {
        ...state,
        user: { id: action.payload.uid, email: action.payload.email },
      };
    case AuthActionType.LogOutSuccess:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
