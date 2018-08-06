import { calculateGapForSingle, calculateMatch } from './selectors';

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
    expect(calculateMatch(userPositions, candidatePositions)).toEqual(68.75);
  })
});

describe('calculateGapForSingle', () => {
  it('handles agreement', () => {
    expect(calculateGapForSingle(1, 1)).toEqual([0, 4]);
    expect(calculateGapForSingle(-1, -1)).toEqual([0, 4]);
  });

  it('handles agreement with strong agreement', () => {
    expect(calculateGapForSingle(2, 1)).toEqual([0, 4]);
    expect(calculateGapForSingle(-2, -1)).toEqual([0, 4]);
  });

  it('handles neutral candidate', () => {
    expect(calculateGapForSingle(1, 0)).toEqual([1, 4]);
    expect(calculateGapForSingle(-1, 0)).toEqual([1, 4]);
    expect(calculateGapForSingle(2, 0)).toEqual([2, 4]);
    expect(calculateGapForSingle(-2, 0)).toEqual([2, 4]);
  });

  it('returns no max when user is neutral', () => {
    expect(calculateGapForSingle(0, 1)).toEqual([0, 0]);
    expect(calculateGapForSingle(0, -1)).toEqual([0, 0]);
  });

  it('handles disagreement', () => {
    expect(calculateGapForSingle(1, -1)).toEqual([3, 4]);
    expect(calculateGapForSingle(-1, 1)).toEqual([3, 4]);
  });

  it('handles strong disagreement', () => {
    expect(calculateGapForSingle(2, -1)).toEqual([4, 4]);
    expect(calculateGapForSingle(-2, 1)).toEqual([4, 4]);
  });
});
