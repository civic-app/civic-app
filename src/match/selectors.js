import { getPositionsForCandidate } from '../candidate/redux/positions';
import { getUserPositions } from './redux';
import { calculateMatch } from './calculate';

export const getMatchPercent = (state, candidateId) => {
  const userPositions = getUserPositions(state);
  const candidatePositions = getPositionsForCandidate(state, candidateId);
  return userPositions && candidatePositions &&
    calculateMatch(userPositions, candidatePositions);
};
