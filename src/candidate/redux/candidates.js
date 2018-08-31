// Selectors

export const getCandidate = (state, id) => state[CANDIDATE_NAMESPACE][id];
export const getCandidates = (state, viewMapper) => (
  Object.keys(state[CANDIDATE_NAMESPACE]).map(id => viewMapper(getCandidate(state, id)))
);

// Action Creators

export const loadCandidates = () => ({
  type: CandidateActionType.Request,
});

export const loadCandidatesSuccess = candidate => ({
  type: CandidateActionType.RequestSuccess,
  payload: candidate,
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
        ...action.payload,
      };
    default:
      return state;
  }
};

const initialState = {};

export default reducer;
