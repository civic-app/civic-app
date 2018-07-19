// selectors
export const getIsSmallScreen = state => state[UI_NAMESPACE].isSmallScreen;

// actions
export const setSmallScreen = () => ({
  type: SET_SMALL_SCREEN,
});

// action types
export const SET_SMALL_SCREEN = 'civic-app/ui/setSmallScreen';

// reducer
export const UI_NAMESPACE = 'ui';

const initialState = {
  isSmallScreen: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SMALL_SCREEN:
      return {
        ...state,
        isSmallScreen: true,
      };
    default:
      return state;
  }
};

export default reducer;
