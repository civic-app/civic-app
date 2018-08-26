import { AUTH_NAMESPACE } from '.';
import { USER_NAMESPACE } from './userReducer';
import { FORM_NAMESPACE, formTypes } from './formReducer';
import { parseErrorResponse } from '../api';

// User
export const getLoggedInUser = state => state[AUTH_NAMESPACE][USER_NAMESPACE].user;
export const getIsLoggedIn = state => !!getLoggedInUser(state);
export const getAuthError = state => state[AUTH_NAMESPACE][USER_NAMESPACE].error;

/*
 * Parses error codes returned from Firebase
 */
export const getAuthErrorMessage = (state) => {
  const error = getAuthError(state);
  return parseErrorResponse(error);
};

// Form
export const getFormType = state => state[AUTH_NAMESPACE][FORM_NAMESPACE].formType;
export const getEmailInput = state => state[AUTH_NAMESPACE][FORM_NAMESPACE].email;
export const getPasswordInput = state => state[AUTH_NAMESPACE][FORM_NAMESPACE].password;
export const getDuplicatePasswordInput = state => state[AUTH_NAMESPACE][FORM_NAMESPACE].duplicatePassword;
export const getShouldShowErrors = state => state[AUTH_NAMESPACE][FORM_NAMESPACE].showErrors;

export const getEmailIsValid = (state) => {
  const emailInput = getEmailInput(state);
  return emailInput.length > 0 && emailInput.indexOf('@') > 0;
};

export const getPasswordIsValid = (state) => {
  const passwordInput = getPasswordInput(state);
  return passwordInput.length > 0;
};

export const getDuplicatePasswordIsValid = (state) => {
  const passwordInput = getPasswordInput(state);
  const duplicatePasswordInput = getDuplicatePasswordInput(state);
  return duplicatePasswordInput.length > 0 && passwordInput === duplicatePasswordInput;
};

export const getFormIsValid = (state) => {
  const formType = getFormType(state);
  const emailIsValid = getEmailIsValid(state);
  const passwordIsValid = getPasswordIsValid(state);
  const duplicatePasswordIsValid = getDuplicatePasswordIsValid(state);

  switch (formType) {
    case formTypes.LOGIN:
      return emailIsValid && passwordIsValid;
    case formTypes.SIGN_UP:
      return emailIsValid && passwordIsValid && duplicatePasswordIsValid;
    default:
      return true;
  }
};

export const getFormErrorMessage = (state) => {
  const formType = getFormType(state);
  const emailIsValid = getEmailIsValid(state);
  const passwordIsValid = getPasswordIsValid(state);
  const duplicatePasswordIsValid = getDuplicatePasswordIsValid(state);

  if (!emailIsValid) {
    return 'Please enter a valid email address';
  }
  if (!passwordIsValid) {
    return 'Password is required';
  }
  if (formType === formTypes.SIGN_UP && !duplicatePasswordIsValid) {
    return 'Passwords must match';
  }
  return '';
};
