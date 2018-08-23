import uiReducer, {
  getIsSmallScreen,
  initialState,
  setIsSmallScreen,
  SET_IS_SMALL_SCREEN,
  UI_NAMESPACE,
} from '../redux';

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
  });

  describe('selectors', () => {
    it('getIsSmallScreen returns isSmallScreen state', () => {
      const state = {
        [UI_NAMESPACE]: initialState,
      };
      const isSmallScreen = getIsSmallScreen(state);
      expect(isSmallScreen).toBe(state[UI_NAMESPACE].isSmallScreen);
    });
  });

  describe('actions', () => {
    it('setIsSmallScreen returns a SET_IS_SMALL_SCREEN action', () => {
      const action = setIsSmallScreen();
      expect(action.type).toBe(SET_IS_SMALL_SCREEN);
    });
  });
});
