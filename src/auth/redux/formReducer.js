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
  ShowErrors: 'civicApp/auth/showErrors',
};

// Action Creators
/*
 * @param formType: member of formTypes object;
 */
export const switchFormType = formType => ({
  type: AuthFormActionType.SwitchFormType,
  payload: formType,
});

/*
 * @param email: string;
 */
export const updateEmail = email => ({
  type: AuthFormActionType.UpdateEmail,
  payload: email,
});

/*
 * @param password: string;
 */
export const updatePassword = password => ({
  type: AuthFormActionType.UpdatePassword,
  payload: password,
});

/*
 * @param password: string;
 */
export const updateDuplicatePassword = password => ({
  type: AuthFormActionType.UpdateDuplicatePassword,
  payload: password,
});

/*
 * @param shouldShow: boolean;
 */
export const showErrors = shouldShow => ({
  type: AuthFormActionType.ShowErrors,
  payload: shouldShow,
});

// TODO: errors and maybe loading
const formReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case AuthFormActionType.SwitchFormType:
      return {
        ...state,
        formType: action.payload,
        showErrors: false,
      };
    case AuthFormActionType.UpdateEmail:
      return {
        ...state,
        email: action.payload,
        showErrors: false,
      };
    case AuthFormActionType.UpdatePassword:
      return {
        ...state,
        password: action.payload,
        showErrors: false,
      };
    case AuthFormActionType.UpdateDuplicatePassword:
      return {
        ...state,
        duplicatePassword: action.payload,
        showErrors: false,
      };
    case AuthFormActionType.ShowErrors:
      return {
        ...state,
        showErrors: action.payload,
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
  showErrors: false,
};

export default formReducer;
