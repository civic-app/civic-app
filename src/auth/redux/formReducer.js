export const FORM_NAMESPACE = 'form';

export const formTypes = {
  INITIAL: 'initial',
  LOGIN: 'login',
  SIGN_UP: 'signUp',
};

// Actions
export const AuthFormActionType = {
  SwitchFormType: 'civicApp/auth/switchFormType',
  UpdateEmail: 'civicApp/auth/updateEmail',
  UpdatePassword: 'civicApp/auth/updatePassword',
  UpdateDuplicatePassword: 'civicApp/auth/updateDuplicatePassword',
  UpdateErrorMessage: 'civicApp/auth/updateErrorMessage',
};

// Action Creators
export const switchFormType = formType => ({
  type: AuthFormActionType.SwitchFormType,
  payload: formType,
});

export const updateEmail = email => ({
  type: AuthFormActionType.UpdateEmail,
  payload: email,
});

export const updatePassword = password => ({
  type: AuthFormActionType.UpdatePassword,
  payload: password,
});

export const updateDuplicatePassword = password => ({
  type: AuthFormActionType.UpdateDuplicatePassword,
  payload: password,
});

// TODO: errors and maybe loading
const formReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case AuthFormActionType.SwitchFormType:
      return {
        ...state,
        formType: action.payload,
      };
    case AuthFormActionType.UpdateEmail:
      return {
        ...state,
        email: action.payload,
      };
    case AuthFormActionType.UpdatePassword:
      return {
        ...state,
        password: action.payload,
      };
    case AuthFormActionType.UpdateDuplicatePassword:
      return {
        ...state,
        duplicatePassword: action.payload,
      };
    default:
      return state;
  }
};

const initialState = {
  formType: formTypes.INITIAL,
  email: '',
  password: '',
  duplicatePassword: '',
  errorMessage: '',
};

export default formReducer;
