import { AuthUserActionType } from '../auth/redux/userReducer';
import { parseErrorResponse } from '../auth/api';
// selectors
export const getIsSmallScreen = state => state[UI_NAMESPACE].isSmallScreen;
export const getNetworkError = state => state[UI_NAMESPACE].error;
export const getIsLoading = state => state[UI_NAMESPACE].isLoading;
/*
 * Parses error codes returned from Firebase
 */
export const getErrorMessage = state => {
  const error = getNetworkError(state);
  return parseErrorResponse(error);
};

// actions
export const setIsSmallScreen = () => ({
  type: SET_IS_SMALL_SCREEN,
});

// action types
export const SET_IS_SMALL_SCREEN = 'civic-app/ui/setIsSmallScreen';

// reducer
export const UI_NAMESPACE = 'ui';

export const initialState = {
  isSmallScreen: false,
  isLoading: false,
  error: { code: '', message: '' },
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case AuthUserActionType.EmailLoginRequest:
    case AuthUserActionType.FacebookLoginRequest:
    case AuthUserActionType.GoogleLoginRequest:
    case AuthUserActionType.RegisterRequest:
    case AuthUserActionType.LogOutRequest:
      return {
        ...state,
        loading: true,
        error: initialState.error,
      };
    case AuthUserActionType.LoginSuccess:
    case AuthUserActionType.RegisterSuccess:
    case AuthUserActionType.LogOutSuccess:
      return {
        ...state,
        loading: false,
      };
    case AuthUserActionType.AuthFailure:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case SET_IS_SMALL_SCREEN:
      return {
        ...state,
        isSmallScreen: true,
      };
    default:
      return state;
  }
};

export default reducer;
