import isEmpty from 'lodash/isEmpty';
import { getPositionsForCandidate } from '../candidate/redux/positions';
import { getUserPositions } from './redux';
import { calculateMatch } from './calculate';

export const getMatchPercent = (state, candidateId) => getMatchData(state, candidateId).match;
export const getCertaintyPercent = (state, candidateId) => getMatchData(state, candidateId).certainty;
export const shouldShowMatchPercent = (state, candidateId) => getMatchData(state, candidateId).certainty > 50;
export const getKnownAnswers = (state, candidateId) => getMatchData(state, candidateId).known;

export const getMatchData = (state, candidateId) => {
  const userPositions = getUserPositions(state);
  const candidatePositions = getPositionsForCandidate(state, candidateId);
  return userPositions && candidatePositions &&
    calculateMatch(userPositions, candidatePositions);
};

export const getUserHasTakenSurvey = state => !isEmpty(getUserPositions(state));
