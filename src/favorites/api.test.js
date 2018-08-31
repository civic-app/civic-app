import { Category } from './models';
import { toFavorites } from './api';

it('favorites mapper', () => {
  const candidateId1 = 'bar';
  const candidateId2 = 'baz';
  const eventId = 'foo';
  const apiFavorites = {
    candidates: {
      [candidateId1]: true,
      [candidateId2]: true,
    },
    events: {
      [eventId]: true,
    }
  };
  const expectedFavorites = {
    [Category.Candidates]: [candidateId1, candidateId2],
    [Category.Events]: [eventId],
  };
  expect(toFavorites(apiFavorites)).toEqual(expectedFavorites);
});
