import uiReducer, {
  getApiErrorMessage,
  getIsLoading,
  getIsSmallScreen,
  getNetworkError,
  initialState,
  setIsSmallScreen,
  SET_IS_SMALL_SCREEN,
  UI_NAMESPACE,
} from '../redux';
import {
  authFailure,
  emailLogin,
  facebookLogin,
  googleLogin,
  loginSuccess,
  logOut,
  logOutSuccess,
  register,
} from '../../auth/redux';

describe('UI reducer', () => {
  describe('the reducer', () => {
    it('returns initial state on empty invocation', () => {
      const state = uiReducer();
      expect(state).toMatchObject(initialState);
    });

    it('updates isSmallScreen to true on setIsSmallScreen', () => {
      const state = uiReducer(initialState, setIsSmallScreen());
      expect(state).toMatchObject({
        ...initialState,
        isSmallScreen: true,
      });
    });

    describe('auth actions', () => {
      const errorState = { ...initialState, error: { code: 'auth/error', message: 'Your stuff failed' } };
      const loadingState = { ...initialState, loading: true };

      it('emailLogin sets the loading state to true', () => {
        const action = emailLogin();
        const newState = uiReducer(initialState, action);
        expect(newState.loading).toBe(true);
      });

      it('emailLogin resets the error state', () => {
        const action = emailLogin();
        const newState = uiReducer(errorState, action);
        expect(newState.error).toBe(initialState.error);
      });

      it('facebookLogin sets the loading state to true', () => {
        const action = facebookLogin();
        const newState = uiReducer(initialState, action);
        expect(newState.loading).toBe(true);
      });

      it('facebookLogin resets the error state', () => {
        const action = facebookLogin();
        const newState = uiReducer(errorState, action);
        expect(newState.error).toBe(initialState.error);
      });

      it('googleLogin sets the loading state to true', () => {
        const action = googleLogin();
        const newState = uiReducer(initialState, action);
        expect(newState.loading).toBe(true);
      });

      it('googleLogin resets the error state', () => {
        const action = googleLogin();
        const newState = uiReducer(errorState, action);
        expect(newState.error).toBe(initialState.error);
      });

      it('register sets the loading state to true', () => {
        const action = register();
        const newState = uiReducer(initialState, action);
        expect(newState.loading).toBe(true);
      });

      it('register resets the error state', () => {
        const action = register();
        const newState = uiReducer(errorState, action);
        expect(newState.error).toBe(initialState.error);
      });

      it('logOut sets the loading state to true', () => {
        const action = logOut();
        const newState = uiReducer(initialState, action);
        expect(newState.loading).toBe(true);
      });

      it('logOut resets the error state', () => {
        const action = logOut();
        const newState = uiReducer(errorState, action);
        expect(newState.error).toBe(initialState.error);
      });

      it('loginSuccess sets the loading state to false', () => {
        const action = loginSuccess();
        const newState = uiReducer(loadingState, action);
        expect(newState.loading).toBe(false);
      });

      it('logOutSuccess sets the loading state to false', () => {
        const action = logOutSuccess();
        const newState = uiReducer(loadingState, action);
        expect(newState.loading).toBe(false);
      });

      it('authFailure sets the error state', () => {
        const error = { code: 'auth/error', message: 'It\'s broken' };
        const action = authFailure(error);
        const newState = uiReducer(initialState, action);
        expect(newState.error).toMatchObject(error);
      });

      it('authFailure sets the loading state to false', () => {
        const error = { code: 'auth/error', message: 'It\'s broken' };
        const action = authFailure(error);
        const newState = uiReducer(loadingState, action);
        expect(newState.loading).toBe(false);
      });
    });
  });

  describe('selectors', () => {
    const state = { [UI_NAMESPACE]: initialState };
    it('getIsSmallScreen returns isSmallScreen state', () => {
      const isSmallScreen = getIsSmallScreen(state);
      expect(isSmallScreen).toBe(state[UI_NAMESPACE].isSmallScreen);
    });

    it('getIsLoading returns loading state', () => {
      expect(getIsLoading(state)).toBe(initialState.loading);
    });

    it('getNetworkError returns raw error object', () => {
      expect(getNetworkError(state)).toBe(initialState.error);
    });

    it('getApiErrorMessage returns the parsed mesasge', () => {
      const message = 'Your stuff failed';
      const errorState = { [UI_NAMESPACE]: { ...initialState, error: { code: 'auth/failure', message } } };
      expect(getApiErrorMessage(errorState)).toBe(message);
    });
  });

  describe('actions', () => {
    it('setIsSmallScreen returns a SET_IS_SMALL_SCREEN action', () => {
      const action = setIsSmallScreen();
      expect(action.type).toBe(SET_IS_SMALL_SCREEN);
    });
  });
});
