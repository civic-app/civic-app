import { AUTH_NAMESPACE } from '../redux';
import { USER_NAMESPACE } from './userReducer';
import { FORM_NAMESPACE } from './formReducer';

// User
export const getLoggedInUser = state => state[AUTH_NAMESPACE][USER_NAMESPACE].user;
export const getIsLoggedIn = state => !!getLoggedInUser(state);

// Form
export const getFormType = state => state[AUTH_NAMESPACE][FORM_NAMESPACE].formType;
export const getEmailInput = state => state[AUTH_NAMESPACE][FORM_NAMESPACE].email;
export const getPasswordInput = state => state[AUTH_NAMESPACE][FORM_NAMESPACE].password;
export const getDuplicatePasswordInput = state => state[AUTH_NAMESPACE][FORM_NAMESPACE].duplicatePassword;
export const getFormErrorMessage = state => state[AUTH_NAMESPACE][FORM_NAMESPACE].errorMessage;
