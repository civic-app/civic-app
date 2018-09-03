import authReducer, {
  AuthActionType,
  authFailure,
  emailLogin,
  facebookLogin,
  formTypes,
  googleLogin,
  initialState,
  loginSuccess,
  logOut,
  logOutSuccess,
  register,
  showErrors,
  switchFormType,
  updateDuplicatePassword,
  updateEmail,
  updatePassword,
} from '../redux';
import { toFakeUser } from '../doubles';

const toLoggedOutState = () => initialState;
const toLoggedInState = () => ({ ...initialState, user: { id: toFakeUser().uid, email: toFakeUser().email } });

describe('auth reducer', () => {
  it('returns initial state on empty invocation', () => {
    expect(authReducer()).toMatchObject(initialState);
  });

  describe('loginSuccess', () => {
    it('should set user', () => {
      expect(authReducer(toLoggedOutState(), loginSuccess(toFakeUser()))).toEqual(toLoggedInState());
    });
  });

  describe('logOutSuccess', () => {
    it('should clear user', () => {
      expect(authReducer(toLoggedInState(), logOutSuccess())).toEqual(toLoggedOutState());
    });
  });

  describe('switchFormType', () => {
    it('should change the form type', () => {
      const action = switchFormType(formTypes.LOGIN);
      expect(authReducer(initialState, action)).toMatchObject({ ...initialState, formType: formTypes.LOGIN });
    });

    it('should clear any form errors', () => {
      const initialStateWithErrors = {
        ...initialState,
        showErrors: true,
      };
      const action = switchFormType(formTypes.LOGIN);
      const newState = authReducer(initialStateWithErrors, action);
      expect(newState.showErrors).toBe(false);
    });
  });

  describe('updateEmail', () => {
    it('should update the email state', () => {
      const action = updateEmail('foo');
      expect(authReducer(initialState, action)).toMatchObject({ ...initialState, email: 'foo' });
    });

    it('should clear any form errors', () => {
      const initialStateWithErrors = {
        ...initialState,
        showErrors: true,
      };
      const action = updateEmail('foo');
      const newState = authReducer(initialStateWithErrors, action);
      expect(newState.showErrors).toBe(false);
    });
  });

  describe('updatePassword', () => {
    it('should update the password state', () => {
      const action = updatePassword('foo');
      expect(authReducer(initialState, action)).toMatchObject({ ...initialState, password: 'foo' });
    });

    it('should clear any form errors', () => {
      const initialStateWithErrors = {
        ...initialState,
        showErrors: true,
      };
      const action = updatePassword('foo');
      const newState = authReducer(initialStateWithErrors, action);
      expect(newState.showErrors).toBe(false);
    });
  });

  describe('updateDuplicatePassword', () => {
    it('should update the duplicate password state', () => {
      const action = updateDuplicatePassword('foo');
      expect(authReducer(initialState, action)).toMatchObject({ ...initialState, duplicatePassword: 'foo' });
    });

    it('should clear any form errors', () => {
      const initialStateWithErrors = {
        ...initialState,
        showErrors: true,
      };
      const action = updateDuplicatePassword('foo');
      const newState = authReducer(initialStateWithErrors, action);
      expect(newState.showErrors).toBe(false);
    });
  });

  describe('showErrors', () => {
    it('should update the showErrors state', () => {
      const action = showErrors(true);
      expect(authReducer(initialState, action)).toMatchObject({ ...initialState, showErrors: true });
    });
  });
});

describe('auth action creators', () => {
  it('email login creates the right action', () => {
    expect(emailLogin()).toMatchObject({ type: AuthActionType.EmailLoginRequest });
  });

  it('register creates the right action', () => {
    expect(register()).toMatchObject({ type: AuthActionType.RegisterRequest });
  });

  it('facebook login creates the right action', () => {
    expect(facebookLogin()).toMatchObject({ type: AuthActionType.FacebookLoginRequest });
  });

  it('google login creates the right action', () => {
    expect(googleLogin()).toMatchObject({ type: AuthActionType.GoogleLoginRequest });
  });

  it('login success creates the right action', () => {
    const user = toFakeUser();
    expect(loginSuccess(user)).toMatchObject({ type: AuthActionType.LoginSuccess, payload: user });
  });

  it('logOut creates the right action', () => {
    expect(logOut()).toMatchObject({ type: AuthActionType.LogOutRequest });
  });

  it('logOut success creates the right action', () => {
    expect(logOutSuccess()).toMatchObject({ type: AuthActionType.LogOutSuccess });
  });

  it('authFailure creates the right action', () => {
    const error = 'error';
    expect(authFailure(error)).toMatchObject({ type: AuthActionType.AuthFailure, payload: error });
  });

  it('switchFormType creates the right action', () => {
    const formType = formTypes.LOGIN;
    expect(switchFormType(formType)).toMatchObject({ type: AuthActionType.SwitchFormType, payload: formType });
  });

  it('updateEmail creates the right action', () => {
    const email = 'foo';
    expect(updateEmail(email)).toMatchObject({ type: AuthActionType.UpdateEmail, payload: email });
  });

  it('updatePassword creates the right action', () => {
    const password = 'foo';
    expect(updatePassword(password)).toMatchObject({ type: AuthActionType.UpdatePassword, payload: password });
  });

  it('updateDuplicatePassword creates the right action', () => {
    const duplicatePassword = 'foo';
    expect(updateDuplicatePassword(duplicatePassword)).toMatchObject({
      type: AuthActionType.UpdateDuplicatePassword,
      payload: duplicatePassword,
    });
  });

  it('showErrors creates the right action', () => {
    const shouldShow = true;
    expect(showErrors(shouldShow)).toMatchObject({ type: AuthActionType.ShowErrors, payload: shouldShow });
  });
});
