import { Category } from './models';
import reducer, { favoritesRequestSuccess, addOrRemoveFavorite } from './redux';
import { userFetchSuccess } from '../user/redux';


describe('favorites reducer', () => {
  it('adds favorites on request success', () => {
    const canidateIds = ['foo', 'bar'];
    const eventIds = ['foobar', 'baz'];
    const payload = {
      favorites: {
        [Category.Candidates]: canidateIds,
        [Category.Events]: eventIds,
      }
    };
    const initialState = {
      [Category.Candidates]: new Set(),
      [Category.Events]: new Set(),
    };
    const expectedState = {
      [Category.Candidates]: new Set(canidateIds),
      [Category.Events]: new Set(eventIds),
    };
    expect(reducer(initialState, userFetchSuccess(payload))).toEqual(expectedState);
  });

  it('updates state when adding a favorite', () => {
    const candidateIds = new Set(['foo']);
    const newCandidate = 'baz';
    const eventIds = new Set(['bar']);
    const initialState = {
      [Category.Candidates]: candidateIds,
      [Category.Events]: eventIds,
    };
    const expectedState = {
      [Category.Candidates]: candidateIds.add(newCandidate),
      [Category.Events]: eventIds,
    };

    expect(reducer(initialState, addOrRemoveFavorite(newCandidate, Category.Candidates, true))).toEqual(expectedState);
  });

  it('updates state when removing a favorite', () => {
    const removedCandidate = 'baz';
    const candidateIds = new Set(['foo']);
    const eventIds = new Set(['bar']);
    const initialState = {
      [Category.Candidates]: candidateIds.add(removedCandidate),
      [Category.Events]: eventIds,
    };
    const expectedState = {
      [Category.Candidates]: candidateIds,
      [Category.Events]: eventIds,
    };

    expect(reducer(initialState, addOrRemoveFavorite(removedCandidate, Category.Candidates, true))).toEqual(expectedState);
  });
});
