import isEmpty from 'lodash/isEmpty';
import { getPositionsForCandidate } from '../candidate/redux/positions';
import { getUserPositions } from './redux';
import { calculateMatch } from './calculate';

export const getMatchData = (state, candidateId) => {
  const userPositions = getUserPositions(state);
  const candidatePositions = getPositionsForCandidate(state, candidateId);
  return userPositions && candidatePositions &&
    calculateMatch(userPositions, candidatePositions);
};

export const shouldShowMatch = matchData => matchData.certainty > 50;

export const getUserHasTakenSurvey = state => !isEmpty(getUserPositions(state));
