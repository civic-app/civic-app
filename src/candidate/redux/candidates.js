import { getUserDistrict } from '../../user/selectors';
// Selectors

export const getCandidate = (state, id) => state[CANDIDATE_NAMESPACE][id];

export const getAllCandidates = state => Object.keys(state[CANDIDATE_NAMESPACE]);

export const getCandidates = (state, viewMapper) =>
  getFilteredCandidates(state, viewMapper, Object.keys(state[CANDIDATE_NAMESPACE]));

export const getSelectCandidates = (state, viewMapper, candidateIds) =>
  candidateIds.map(id => viewMapper(getCandidate(state, id)));

export const getFilteredCandidates = (state, viewMapper, candidateIds) => {
  const district = getUserDistrict(state);
  // parse num out of district once so we can later match by passing the number
  // to matchDistrictToElections
  const parsedNum = typeof district === 'string' ? district.match(/([0-9])+/g) : null;
  const districtNum = (parsedNum && parsedNum.length > 0 && parsedNum[0]) || null;

  // reduce all candidates to just the list of matches
  return candidateIds.reduce((filteredCandidates, id) => {
    const candidate = getCandidate(state, id);
    // It seems each candidate only has one electionId is there some reason
    // they are being stored in an array maybe better to pass the zero index here?
    if (candidate && matchDistrictToElections(districtNum, candidate.electionIds[0])) {
      // only add candidate to the view model if they match the user's district
      filteredCandidates.push(viewMapper(candidate));
    }
    return filteredCandidates;
  }, []);
};

/**
 * matchDistrictToElections()
 * @param {string} districtNum - the parsed number of a user district
 * @param {string} election - the zero index of electionIds array
 * @return {boolean} - returns true if election string has no numbers (i.e.
 * is a state-wide race) or matches on districtNum
 * @example matchDistrictToElections("11", "Senator")
 * // returns true
 * @example matchDistrictToElections("11", "California District 11")
 * // returns true
 * @example matchDistrictToElections("11", "California District 10")
 * // returns false
 */

const matchDistrictToElections = (districtNum, election) => {
  // return false if election is null / undefined
  if (!election) return false;
  // return true if districtNum is null
  if (!districtNum) return true;
  const numberToMatch = new RegExp(districtNum);
  const hasNumber = new RegExp(/([0-9])+/);
  return numberToMatch.test(election) || !hasNumber.test(election);
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
