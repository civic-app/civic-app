import { calculateGapForSingle, calculateMatch } from './calculate';

describe('calculateMatch', () => {
  it ('calculates match', () => {
    const userPositions = {
      'a': { response: 2 },
      'b': { response: -1 },
      'c': { response: 0 },
      'd': { response: -2 },
      'e': { response: -1 },
    };
    const candidatePositions = {
      'a': { response: 1 },
      'b': { response: 0 },
      'c': { response: 1 },
      'd': { response: 1 },
      'e': { response: -1 },
    };
    expect(calculateMatch(userPositions, candidatePositions)).toEqual(
      { match: 69, certainty: 75, known: 3, totalWithUserOpinions: 4});
  })
});

describe('calculateGapForSingle', () => {
  it('handles agreement', () => {
    expect(calculateGapForSingle(1, 1)).toEqual({ gap: 0, max: 1, unknown: 0});
    expect(calculateGapForSingle(-1, -1)).toEqual({ gap: 0, max: 1, unknown: 0});
  });

  it('handles agreement with strong agreement', () => {
    expect(calculateGapForSingle(2, 1)).toEqual({ gap: 0, max: 1, unknown: 0});
    expect(calculateGapForSingle(-2, -1)).toEqual({ gap: 0, max: 1, unknown: 0});
  });

  it('handles neutral candidate', () => {
    expect(calculateGapForSingle(1, 0)).toEqual({ gap: .25, max: 1, unknown: 1});
    expect(calculateGapForSingle(-1, 0)).toEqual({ gap: .25, max: 1, unknown: 1});
    expect(calculateGapForSingle(2, 0)).toEqual({ gap: .5, max: 1, unknown: 1});
    expect(calculateGapForSingle(-2, 0)).toEqual({ gap: .5, max: 1, unknown: 1});
  });

  it('returns no max when user is neutral', () => {
    expect(calculateGapForSingle(0, 1)).toEqual({ gap: 0, max: 0, unknown: 0});
    expect(calculateGapForSingle(0, -1)).toEqual({ gap: 0, max: 0, unknown: 0});
  });

  it('handles disagreement', () => {
    expect(calculateGapForSingle(1, -1)).toEqual({ gap: .75, max: 1, unknown: 0});
    expect(calculateGapForSingle(-1, 1)).toEqual({ gap: .75, max: 1, unknown: 0});
  });

  it('handles strong disagreement', () => {
    expect(calculateGapForSingle(2, -1)).toEqual({ gap: 1, max: 1, unknown: 0});
    expect(calculateGapForSingle(-2, 1)).toEqual({ gap: 1, max: 1, unknown: 0});
  });
});
