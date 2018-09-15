import { AUTH_NAMESPACE, formTypes } from '../redux';
import {
  getFormType,
  getIsLoggedIn,
  getLoggedInUser,
  getLoggedInUserId,
  getEmailInput,
  getEmailIsValid,
  getPasswordInput,
  getPasswordIsValid,
  getDuplicatePasswordInput,
  getDuplicatePasswordIsValid,
  getShouldShowErrors,
  getFormErrorMessage,
  getFormIsValid,
} from '../selectors';
import { toFakeUser } from '../doubles';

describe('selectors', () => {
  const mockState = {
    [AUTH_NAMESPACE]: {
      user: toFakeUser(),
      formType: formTypes.INITIAL,
      email: 'foo@bar.com',
      password: 'password',
      duplicatePassword: 'password',
      showErrors: false,
    },
  };

  describe('user', () => {
    const loggedInState = mockState;
    const loggedOutState = { [AUTH_NAMESPACE]: { user: null } };
    it('when user is logged in, getLoggedInUser should return user', () => {
      const expectedUser = toFakeUser();
      expect(getLoggedInUser(loggedInState)).toEqual(expectedUser);
    });

    it('when user is not logged in, getLoggedInUser should return null', () => {
      expect(getLoggedInUser(loggedOutState)).toBe(null);
    });

    it('when user is logged in, getIsLoggedIn should return true', () => {
      expect(getIsLoggedIn(loggedInState)).toBe(true);
    });

    it('when user is not logged in, getIsLoggedIn should return false', () => {
      expect(getIsLoggedIn(loggedOutState)).toBe(false);
    });

    it('when user is logged in, getLoggedInUserId should return the user id', () => {
      const expectedUser = toFakeUser();
      expect(getLoggedInUserId(loggedInState)).toBe(expectedUser.id);
    });

    it('when user is logged out, getLoggedInUserId should return null', () => {
      expect(getLoggedInUserId(loggedOutState)).toBe(null);
    });
  });

  describe('form', () => {
    describe('formType', () => {
      it('getFormType returns the form type', () => {
        expect(getFormType(mockState)).toBe(formTypes.INITIAL);
      });

      it('getFormIsValid returns true if email and password are valid and formType is Login', () => {
        const validLoginState = {
          [AUTH_NAMESPACE]: {
            ...mockState[AUTH_NAMESPACE],
            formType: formTypes.LOGIN,
          },
        };
        expect(getFormIsValid(validLoginState)).toBe(true);
      });

      it('getFormIsValid returns true if duplicate password is invalid and formType is Login', () => {
        const invalidLoginState = {
          [AUTH_NAMESPACE]: {
            ...mockState[AUTH_NAMESPACE],
            formType: formTypes.LOGIN,
            duplicatePassword: '',
          },
        };
        expect(getFormIsValid(invalidLoginState)).toBe(true);
      });

      it('getFormIsValid returns false if email is invalid and formType is Login', () => {
        const invalidLoginState = {
          [AUTH_NAMESPACE]: {
            ...mockState[AUTH_NAMESPACE],
            formType: formTypes.LOGIN,
            email: '',
          },
        };
        expect(getFormIsValid(invalidLoginState)).toBe(false);
      });

      it('getFormIsValid returns false if password is invalid and formType is Login', () => {
        const invalidLoginState = {
          [AUTH_NAMESPACE]: {
            ...mockState[AUTH_NAMESPACE],
            formType: formTypes.LOGIN,
            password: '',
          },
        };
        expect(getFormIsValid(invalidLoginState)).toBe(false);
      });

      it('getFormIsValid returns true if email, password, and duplicate password are valid and formType is SignUp', () => {
        const validSignUpState = {
          [AUTH_NAMESPACE]: {
            ...mockState[AUTH_NAMESPACE],
            formType: formTypes.SIGN_UP,
          },
        };
        expect(getFormIsValid(validSignUpState)).toBe(true);
      });

      it('getFormIsValid returns false if email is invalid and formType is SignUp', () => {
        const invalidSignUpState = {
          [AUTH_NAMESPACE]: {
            ...mockState[AUTH_NAMESPACE],
            formType: formTypes.SIGN_UP,
            email: '',
          },
        };
        expect(getFormIsValid(invalidSignUpState)).toBe(false);
      });

      it('getFormIsValid returns false if password is invalid and formType is SignUp', () => {
        const invalidSignUpState = {
          [AUTH_NAMESPACE]: {
            ...mockState[AUTH_NAMESPACE],
            formType: formTypes.SIGN_UP,
            password: '',
          },
        };
        expect(getFormIsValid(invalidSignUpState)).toBe(false);
      });

      it('getFormIsValid returns false if duplicate password is invalid and formType is SignUp', () => {
        const invalidSignUpState = {
          [AUTH_NAMESPACE]: {
            ...mockState[AUTH_NAMESPACE],
            formType: formTypes.SIGN_UP,
            duplicatePassword: '',
          },
        };
        expect(getFormIsValid(invalidSignUpState)).toBe(false);
      });
    });

    describe('emailInput', () => {
      it('getEmailInput returns the email', () => {
        expect(getEmailInput(mockState)).toBe('foo@bar.com');
      });

      it('getEmailIsValid returns true if the email has length and an @ symbol', () => {
        expect(getEmailIsValid(mockState)).toBe(true);
      });

      it('getEmailIsValid returns false if the email is empty', () => {
        const invalidEmailState = { [AUTH_NAMESPACE]: { email: '' } };
        expect(getEmailIsValid(invalidEmailState)).toBe(false);
      });

      it('getEmailIsValid returns false if email does not have an @ symbol', () => {
        const invalidEmailState = { [AUTH_NAMESPACE]: { email: 'civicapp' } };
        expect(getEmailIsValid(invalidEmailState)).toBe(false);
      });
    });

    describe('passwordInput', () => {
      it('getPasswordInput returns the password', () => {
        expect(getPasswordInput(mockState)).toBe('password');
      });

      it('getPasswordIsValid returns true if the password has length', () => {
        expect(getPasswordIsValid(mockState)).toBe(true);
      });

      it('getPasswordIsValid returns false if the password is empty', () => {
        const invalidPasswordState = { [AUTH_NAMESPACE]: { password: '' } };
        expect(getPasswordIsValid(invalidPasswordState)).toBe(false);
      });
    });
    describe('duplicatePasswordInput', () => {
      it('getDuplicatePasswordInput returns the duplicate password', () => {
        expect(getDuplicatePasswordInput(mockState)).toBe('password');
      });

      it('getDuplicatePasswordIsValid returns true if the duplicate password has length', () => {
        expect(getDuplicatePasswordIsValid(mockState)).toBe(true);
      });

      it('getDuplicatePasswordIsValid returns false if the duplicate password is empty', () => {
        const invalidDuplicatePasswordState = { [AUTH_NAMESPACE]: { duplicatePassword: '' } };
        expect(getDuplicatePasswordIsValid(invalidDuplicatePasswordState)).toBe(false);
      });
    });
    describe('errors', () => {
      it('getShouldShowErrors returns the showErrors state', () => {
        expect(getShouldShowErrors(mockState)).toBe(false);
      });

      it('getFormErrorMessage returns empty string if no errors', () => {
        expect(getFormErrorMessage(mockState)).toBe('');
      });

      it('getFormErrorMessage returns email error if invalid email', () => {
        const invalidEmailState = { [AUTH_NAMESPACE]: { email: '', password: '', duplicatePassword: '' } };
        expect(getFormErrorMessage(invalidEmailState)).toBe('Please enter a valid email address');
      });

      it('getFormErrorMessage returns password error if invalid password', () => {
        const invalidPasswordState = {
          [AUTH_NAMESPACE]: {
            email: 'foo@bar.com',
            password: '',
            duplicatePassword: '',
          },
        };
        expect(getFormErrorMessage(invalidPasswordState)).toBe('Password is required');
      });

      it('getFormErrorMessage returns empty string if formType is Login and duplicate password is invalid', () => {
        const invalidDuplicatePasswordLoginState = {
          [AUTH_NAMESPACE]: {
            email: 'foo@bar.com',
            password: 'password',
            duplicatePassword: '',
            formType: formTypes.LOGIN,
          },
        };
        expect(getFormErrorMessage(invalidDuplicatePasswordLoginState)).toBe('');
      });

      it('getFormErrorMessage returns duplicate password error if formType is Sign Up and duplicate password is invalid', () => {
        const invalidDuplicatePasswordSignUpState = {
          [AUTH_NAMESPACE]: {
            email: 'foo@bar.com',
            password: 'password',
            duplicatePassword: '',
            formType: formTypes.SIGN_UP,
          },
        };
        expect(getFormErrorMessage(invalidDuplicatePasswordSignUpState)).toBe('Passwords must match');
      });
    });
  });
});
