import { getUserDistrict } from '../../user/selectors';
// Selectors

export const getCandidate = (state, id) => state[CANDIDATE_NAMESPACE][id];

export const getCandidates = (state, viewMapper) =>
  getFilteredCandidates(state, viewMapper, Object.keys(state[CANDIDATE_NAMESPACE]));

export const getFilteredCandidates = (state, viewMapper, candidateIds) => {
  const district = getUserDistrict(state);
  // reduce all candidates to just the list of matches
  return candidateIds.reduce((filteredCandidates, id) => {
    const candidate = getCandidate(state, id);
    if (candidate && matchDistrictToElections(district, candidate.electionIds)) {
      // only add candidate to the view model if they match the user's district
      filteredCandidates.push(viewMapper(candidate));
    }
    return filteredCandidates;
  }, []);
};

const matchDistrictToElections = (district, elections) => {
  // try to extract a number from the electionId
  const districtNumberRegex = /([0-9])+/g;
  return elections.reduce((isMatch, election) => {
    // matches is null if no match is found
    // else it is an array containing each match found
    // assuming each electionId contains one number, we only look at the first
    const matches = election.match(districtNumberRegex);
    // we have a match if:
    // 1. We had a match to a previous electionId for this candidate
    // 2. District is null, undefined, or 0
    // 3. The electionId is a national election
    // 4. The electionId is a district that matches the user's district
    return isMatch || !district || matches === null || matches[0] === district;
  }, false);
};

// Action Creators

export const loadCandidates = () => ({
  type: CandidateActionType.Request,
});

export const loadCandidatesSuccess = candidateData => ({
  type: CandidateActionType.RequestSuccess,
  payload: candidateData,
});

export const CandidateActionType = {
  RequestSuccess: 'civicApp/candidates/requestSuccess',
  Request: 'civicApp/candidates/request',
};

// Reducer

export const CANDIDATE_NAMESPACE = 'candidates';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CandidateActionType.RequestSuccess:
      return {
        ...state,
        ...action.payload.candidates,
      };
    default:
      return state;
  }
};

const initialState = {};

export default reducer;
