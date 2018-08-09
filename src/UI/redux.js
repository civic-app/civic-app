// selectors
export const getIsSmallScreen = state => state[UI_NAMESPACE].isSmallScreen;

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
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
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
