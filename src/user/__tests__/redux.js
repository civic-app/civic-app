import each from 'jest-each';
import userReducer, { initialState, UserActionType, userFetchSuccess, loadUser, USER_NAMESPACE } from '../redux';
import { getUserDistrict, getUserHasDistrict } from '../selectors';

describe('user reducer', () => {
  const mockUser = {
    responses: {
      '8bb9a280-6ea8-11e8-b566-0800200c9a66': {
        questionId: '8bb9a280-6ea8-11e8-b566-0800200c9a66',
        questionResponse: 2,
      },
      '33f3204d0e5d4a69b614b97eb18b9b9c': {
        questionId: '33f3204d0e5d4a69b614b97eb18b9b9c',
        questionResponse: 2,
      },
    },
    favorites: {
      candidates: {
        'c88d3aa0-6ea8-11e8-b566-0800200c9a66': true,
      },
    },
    district: 123,
  };
  describe('actions', () => {
    each([
      [loadUser, false, { type: UserActionType.Request, payload: false }],
      [
        userFetchSuccess,
        { responses: mockUser.responses, favorites: mockUser.favorites, district: mockUser.district },
        {
          type: UserActionType.RequestSuccess,
          payload: { responses: mockUser.responses, favorites: mockUser.favorites, district: mockUser.district },
        },
      ],
    ]).test('%p', (actionCreator, args, expectedAction) => {
      expect(actionCreator(args)).toMatchObject(expectedAction);
    });
  });

  describe('selectors', () => {
    const state = {
      [USER_NAMESPACE]: {
        district: 123,
      },
    };
    each([
      [getUserDistrict, state, 123],
      [getUserHasDistrict, state, true],
      [getUserHasDistrict, { [USER_NAMESPACE]: { district: null } }, false],
    ]).test('selector: %p, state: %p', (selector, state, expectedValue) => {
      expect(selector(state)).toBe(expectedValue);
    });
  });

  describe('the reducer', () => {
    each([
      [initialState, {}, initialState],
      [initialState, userFetchSuccess({ district: 123 }), { district: 123 }],
    ]).test('state: %p, action: %p', (state, action, expectedState) => {
      expect(userReducer(state, action)).toMatchObject(expectedState);
    });
  });
});
